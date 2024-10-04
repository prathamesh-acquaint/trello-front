<script setup>
import { fetchBoardLists } from '@/services/board/board.service'
import { onMounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { fetchCardsByBoardId } from '@/services/board/card/card.service'
import CustomModal from '@/components/common/CustomModal.vue'
import ListForm from '@/components/forms/ListForm.vue'
import ListArea from '@/components/boards/list/ListArea.vue'
import BoardHeader from '@/components/boards/BoardHeader.vue'
import InviteMemberForm from '@/components/forms/InviteMemberForm.vue'

const route = useRoute()

const lists = ref([])
const cards = ref([])
const board = ref({})
const isAddModalOpen = ref(false)
const isAddMemberModelOpen = ref(false)
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

const onAddMember = () => {
  isAddMemberModelOpen.value = true
}

const onCloseAddMember = () => {
  isAddMemberModelOpen.value = false
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
  <BoardHeader :handleAddCardClick="handleAddCardClick" :board="board" :onAddMember="onAddMember" />
  <div class="container p-4 max-w-full overflow-x-auto min-h-full flex gap-3">
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
  <CustomModal
    :isAddModalOpen="isAddMemberModelOpen"
    :handleCloseModal="onCloseAddMember"
    title="Invite Team member"
  >
    <div class="mt-2">
      <!-- <ListForm
        :boardId="route.params.boardId"
        :onSubmitSuccess="onListAddSuccess"
        :data="editingList"
      /> -->
      <InviteMemberForm />
    </div>
  </CustomModal>
</template>
