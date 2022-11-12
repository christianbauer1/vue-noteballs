<template>
    <div class="modal is-active p-2">
        <div class="modal-background"></div>
        <div ref="modalRef" class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete Note?</p>
                <button @click="closeModal" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete this note?
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button @click="closeModal" class="button">Cancel</button>
                <button @click="storeNotes.deleteNote(noteId)" class="button is-danger">Delete</button>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { onClickOutside } from '@vueuse/core'

const modalRef = ref(null)
const storeNotes = useStoreNotes()

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    noteId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
    emit('update:modelValue', false)
}

onClickOutside(modalRef, closeModal)

const handleKeyboard = event => {
    if (event.key === 'Escape') closeModal()
}

onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
})
onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
})
</script>