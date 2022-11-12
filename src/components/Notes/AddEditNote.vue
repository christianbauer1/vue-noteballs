<template>
    <div>
        <div class="card p-4 mb-4" :class="`has-background-${bgColor}-dark`">
            <label v-if="label" class="label has-text-white">{{ label }}</label>
            <div class="field">
                <div class="control">
                    <!-- Die textarea wirft einen error im production beim v-model 2-way binding. grund: keine ahnung. Lösung: 1-way binding und events (siehe unten) -->
                    <!-- <textarea v-model="modelValue" @input="$emit('update:modelValue', modelValue)" ref="textAreaRef"
                        class="textarea" :placeholder="placeholder" v-autofocus maxlength="100" /> -->
                    <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                        ref="textAreaRef" class="textarea" :placeholder="placeholder" v-autofocus maxlength="100" />
                </div>
            </div>

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <slot name="buttons" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type something'
    },
    label: {
        type: String,
    }
})

const emit = defineEmits(['update:modelValue'])

const textAreaRef = ref(null)

const focusTextarea = () => {
    textAreaRef.value.focus()
}

defineExpose({
    focusTextarea
})
</script>