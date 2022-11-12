<template>
    <div class="edit-note">
        <AddEditNote label="Edit note" placeholder="Edit note" bgColor="link" ref="addEditNoteRef"
            v-model="noteContent">
            <template #buttons>
                <button @click="$router.back()" class="button is-link is-light mr-2">Cancel</button>
                <button :disabled="!noteContent" @click="handleSaveClicked" class="button is-link has-background-link">
                    Save changes
                </button>
            </template>
        </AddEditNote>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStoreNotes } from '@/stores/storeNotes'
import AddEditNote from '@/components/Notes/AddEditNote.vue'

const storeNotes = useStoreNotes()
const route = useRoute()
const router = useRouter()
const noteContent = ref('')

noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}
</script>