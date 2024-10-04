<script setup>
const props = defineProps({
  isAddModalOpen: { required: true },
  handleCloseModal: { required: true },
  title: { required: true }
})
</script>

<template>
  <div
    v-if="props.isAddModalOpen"
    class="absolute z-20 w-full h-full bg-black bg-opacity-30 flex justify-center items-center top-0 left-0"
  >
    <div class="relative bg-white rounded-lg p-4 w-[500px] h-fit">
      <div class="relative">
        <p class="font-semibold text-2xl text-center">{{ props.title }}</p>
        <span
          class="absolute top-0 right-0 px-2 py-1 cursor-pointer font-bold hover:bg-gray-300 rounded-md"
          @click="props.handleCloseModal"
          >X</span
        >
      </div>
      <slot>Modal Body</slot>
    </div>
  </div>
</template>
