<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary' // primary, secondary, outline
  },
  onClick: {
    type: Function,
    default: () => {}
  }
})

const buttonClasses = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-pink-500 text-white hover:bg-pink-400'
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-400'
    case 'outline':
      return 'bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
    default:
      return 'bg-pink-500 text-white hover:bg-pink-400'
  }
})
</script>

<template>
  <button
    :class="[
      'w-full inline-block rounded-md font-medium text-sm px-4 py-2 transition-all duration-100',
      buttonClasses
    ]"
    @click="onClick"
  >
    <slot>Click Me</slot>
  </button>
</template>
