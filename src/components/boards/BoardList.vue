<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  boards: {
    required: true
  }
})

const activeBoardId = ref('')

const router = useRouter()
const route = useRoute()
console.log(route.params.boardId, 'boardId')

const handleClcik = async (id) => {
  await router.push(`/boards/${id}`)
}

const checkActiveBoard = () => {
  activeBoardId.value = route.params.boardId
}

onMounted(() => {
  checkActiveBoard()
})

watch(route, () => {
  checkActiveBoard()
})
</script>

<template>
  <div
    class="px-1 py-2 cursor-pointer text-center border-b-2 text-white hover:bg-pink-400 transition-all duration-100"
    :class="{
      'bg-pink-400 font-bold': activeBoardId === board._id,
      'hover:bg-pink-400': activeBoardId !== board._id
    }"
    v-for="board in props.boards"
    :key="board._id"
    @click="handleClcik(board._id)"
  >
    {{ board.title }}
  </div>
</template>
