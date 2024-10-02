<template>
  <div class="input-wrapper space-y-1">
    <label :for="name" class="block font-medium text-sm text-gray-700">{{ label }}</label>
    <input
      :id="name"
      :type="type"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="markAsTouched"
      :class="[
        'w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]',
        { 'input-error': hasError }
      ]"
    />
    <span class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
  errorMessage: { type: String, default: '' }
})

defineEmits(['update:modelValue'])

const touched = ref(false)

// Expose method to mark input as touched
const markAsTouched = () => {
  touched.value = true
}

const hasError = computed(() => touched.value && props.errorMessage)
</script>

<style scoped>
.input-error {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 12px;
}
</style>
