<script setup>
import { fetchBoardLists } from '@/services/board/board.service'
import { onMounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { fetchCardsByBoardId } from '@/services/board/card/card.service'
import CustomButton from '@/components/common/CustomButton.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import ListForm from '@/components/forms/ListForm.vue'
import ListArea from '@/components/boards/list/ListArea.vue'

const route = useRoute()

const lists = ref([])
const cards = ref([])
const board = ref({})
const isAddModalOpen = ref(false)
const editingList = ref(null)

const getBoardLists = async () => {
  const { data, error } = await fetchBoardLists(route.params.boardId)
  if (error) {
    toast.error(error)
    return
  }
  lists.value = data?.data
  board.value = data?.board
}

const getCards = async () => {
  const { data, error } = await fetchCardsByBoardId(route.params.boardId)
  if (error) {
    toast.error(error)
    return
  }
  cards.value = data?.data
}

onMounted(() => {
  getBoardLists()
  getCards()
})

watch(route, () => {
  getBoardLists()
  getCards()
})

const filterCards = (id) => {
  return cards.value.filter((card) => card.listId === id)
}

const handleCloseModal = () => {
  editingList.value = null
  isAddModalOpen.value = false
}

const handleAddCardClick = () => {
  isAddModalOpen.value = true
}

const handleEditList = (list) => {
  editingList.value = list
  handleAddCardClick()
}

const onListAddSuccess = async () => {
  getBoardLists()
  handleCloseModal()
}
</script>

<template>
  <div class="container px-2 py-4 max-w-full flex justify-between items-center mb-5">
    <div></div>
    <h2 class="font-bold text-3xl capitalize">{{ board?.title }}</h2>
    <div class="mr-5">
      <CustomButton @click="handleAddCardClick"> Add List </CustomButton>
    </div>
  </div>
  <div class="container px-4 py-4 max-w-full overflow-x-auto min-h-full flex gap-3">
    <ListArea
      :getCards="getCards"
      :boardId="route.params.boardId"
      :lists="lists"
      :handleEditList="handleEditList"
      :filterCards="filterCards"
    />
  </div>
  <CustomModal
    :isAddModalOpen="isAddModalOpen"
    :handleCloseModal="handleCloseModal"
    :title="editingList ? 'Edit List' : 'Add List'"
  >
    <div class="mt-2">
      <ListForm
        :boardId="route.params.boardId"
        :onSubmitSuccess="onListAddSuccess"
        :data="editingList"
      />
    </div>
  </CustomModal>
</template>
