import { defineStore } from 'pinia'
import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef // = undefined
let notesCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
    state: () => {
        return {
            notes: [],
            notesLoaded: false
        }
    },
    actions: {
        init() {
            // init Database Refs
            const storeAuth = useStoreAuth()

            notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')

            notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
            this.getNotes()
        },
        getNotes() {
            this.notesLoaded = false
            // Falls ich unterscheiden möchte zwischen added, modified & removed: https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots


            if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener

            getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = []
                querySnapshot.forEach((doc) => {
                    let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
                    notes.push(note)
                })

                this.notes = notes
                this.notesLoaded = true
            }, error => {
                console.log('ERROR:', error.message);
            })
        },
        clearNotes() {
            this.notes = []
            if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener
        },
        async addNote(newNote) {
            await addDoc(notesCollectionRef, {
                content: newNote,
                date: Date.now().toString()
            })
        },
        async deleteNote(idToDelete) {
            await deleteDoc(doc(notesCollectionRef, idToDelete))
        },
        async updateNote(id, content) {
            await updateDoc(doc(notesCollectionRef, id), {
                content, // = content : content
            });
        }
    },
    getters: {
        getNoteContent: (state) => {
            return (id) => state.notes.filter(n => n.id === id)[0].content
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharactersCount: (state) => {
            let count = 0
            state.notes.forEach(note => {
                count += note.content.length
            })
            return count
        }
    }
})