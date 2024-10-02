<script setup>
import CustomButton from '@/components/common/CustomButton.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import CardForm from '@/components/forms/CardForm.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { updateCard } from '@/services/board/card/card.service'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  listId: { required: false },
  boardId: { required: false },
  cards: { required: false },
  getCards: { required: false }
})

const editingCard = ref(null)
const isAddModalOpen = ref(false)

function startDrag(evt, card) {
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('cardId', card._id)
  evt.dataTransfer.setData('from', props.listId)
}

async function onDrop(evt) {
  const cardId = evt.dataTransfer.getData('cardId')
  const { data, error } = await updateCard(cardId, { listId: props.listId })
  if (error) {
    toast.error(error?.message)
    return
  }
  toast.success(data?.message)
  props.getCards()
}

const handleCloseModal = () => {
  editingCard.value = null
  isAddModalOpen.value = false
}

const handleAddCardClick = () => {
  isAddModalOpen.value = true
}

const onFormSuccess = () => {
  props.getCards()
  handleCloseModal()
}

const handleEditCard = (card) => {
  editingCard.value = card
  handleAddCardClick()
}
</script>

<template>
  <div
    class="bg-white shadow-md min-w-[250px] max-w-[260px] overflow-auto p-4 rounded-md flex flex-col gap-2 text-sm cursor-pointer"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div
      v-for="card in cards"
      :key="card._id"
      :draggable="true"
      @dragstart="startDrag($event, card)"
      class="py-1 px-2 bg-gray-300 rounded-md flex justify-between items-center group"
    >
      <span>
        {{ card.title }}
      </span>
      <span @click="handleEditCard(card)" class="hidden group-hover:inline">
        <IconEdit class="w-3 h-3" />
      </span>
    </div>
    <div>
      <CustomButton @click="handleAddCardClick" type="secondary"> Add Card </CustomButton>
    </div>
  </div>
  <CustomModal
    :isAddModalOpen="isAddModalOpen"
    :handleCloseModal="handleCloseModal"
    title="Add Card To List"
  >
    <div class="mt-2">
      <CardForm
        :onFormSuccess="onFormSuccess"
        :listId="props.listId"
        :boardId="props.boardId"
        :data="editingCard"
      />
    </div>
  </CustomModal>
</template>
-
