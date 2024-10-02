<script setup>
import IconEdit from '@/components/icons/IconEdit.vue'
import CardList from '../cards/CardList.vue'

const props = defineProps({
  getCards: { required: true },
  boardId: { required: true },
  lists: { required: true },
  handleEditList: { required: true },
  filterCards: { required: true }
})
</script>

<template>
  <div class="" v-for="list in props.lists" :key="list._id">
    <div class="flex justify-between items-center mb-2">
      <span></span>
      <h3 class="font-bold text-xl uppercase tracking-wider">
        {{ list.title }}
      </h3>
      <div>
        <button @click="props.handleEditList(list)" class="bg-gray-200 p-2 rounded-md">
          <IconEdit class="w-4 h-4" />
        </button>
      </div>
    </div>
    <CardList
      :list-id="list._id"
      :boardId="props.boardId"
      :cards="props.filterCards(list._id)"
      :getCards="props.getCards"
    />
  </div>
</template>
