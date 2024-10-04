<script setup>
import CustomButton from '../common/CustomButton.vue'

const props = defineProps({
  handleAddCardClick: { required: true },
  onAddMember: { required: true },
  board: { required: true }
})
</script>

<template>
  <div class="container p-4 max-w-full h-[70px] mb-5 bg-black/40 flex justify-between items-center">
    <div class="flex gap-3 w-full">
      <h2 class="font-bold text-xl capitalize text-white">{{ props.board?.title }}</h2>
      <div class="p-1 bg-gray-500 text-white rounded-md font-semibold text-sm">Private</div>
    </div>
    <div class="w-full"></div>
    <div class="flex gap-2 w-full">
      <CustomButton @click="props.handleAddCardClick"> Add List </CustomButton>
      <CustomButton type="secondary" @click="props.onAddMember"> Invite Member </CustomButton>
    </div>
  </div>
</template>
