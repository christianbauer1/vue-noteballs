import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const storeNotes = useStoreNotes()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Hier loggt der user sich ein
                    this.user.id = user.uid
                    this.user.email = user.email
                    this.router.push('/')
                    storeNotes.init() // get all data for specific user
                } else {
                    // User loggt sich aus
                    this.user = {}
                    this.router.replace('/auth') // Browser history wird gelöscht, damit man nicht zurück gehen kann
                    storeNotes.clearNotes()
                }
            });
        },
        registerUser(credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user
                })
                .catch((error) => {
                    console.log(error.message);
                })
        },
        logoutUser() {
            signOut(auth).then(() => {
                //
            }).catch((error) => {
                console.log(error.message);
            });
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

    }
})