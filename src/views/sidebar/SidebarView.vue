<script setup>
import CustomButton from '@/components/common/CustomButton.vue'
import MultiUseInput from '@/components/MultiUseInput.vue'
import { computed, onMounted, ref } from 'vue'
import { required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { addBoard, fetchBoards } from '@/services/board/board.service'
import { toast } from 'vue3-toastify'
import BoardList from '@/components/boards/BoardList.vue'
import CustomModal from '@/components/common/CustomModal.vue'
import { clearLocalStorage, getLocalStorageData } from '@/utils'
import { useRouter } from 'vue-router'

const isAddModalOpen = ref(false)
const boards = ref([])

const router = useRouter()
const user = getLocalStorageData('userData')

const handleAddBoardClick = () => {
  isAddModalOpen.value = true
}

const getBoardsData = async () => {
  const { data, error } = await fetchBoards()
  if (error) {
    toast.error(error)
    return
  }
  boards.value = data
}

onMounted(() => {
  getBoardsData()
})

const formData = ref({
  title: ''
})

const rules = {
  title: { required, minLengthValue: minLength(3) }
}

const $v = useVuelidate(rules, formData)

const errors = computed(() => ({
  title: $v.value.title.$invalid ? 'Title is invalid' : ''
}))

const handleCloseModal = () => {
  isAddModalOpen.value = false
}

const submitForm = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) return
  // API call for adding Board.
  const { data, error } = await addBoard({ title: formData.value.title })
  if (error) {
    toast.error(error)
    return
  }
  toast.success(data?.message)
  isAddModalOpen.value = false
  getBoardsData()
}

const handleLogout = () => {
  clearLocalStorage()
  router.replace('/login')
}
</script>

<template>
  <aside
    class="absolute z-10 top-0 left-0 w-[250px] min-h-full bg-slate-400 p-3 shadow-xl flex flex-col justify-around"
  >
    <div class="space-y-4">
      <div class="text-center font-bold uppercase text-3xl pb-5 border-b-2">
        <p class="text-white tracking-wider">Trello</p>
      </div>
      <div class="w-full">
        <CustomButton @click="handleAddBoardClick"> Add Board </CustomButton>
        <hr class="mt-4" />
        <div class="flex flex-col">
          <BoardList :boards="boards" />
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center text-white cursor-pointer mt-auto p-1 border-t-2">
      <p>{{ user?.name ?? 'User' }}</p>
      <div>
        <CustomButton @click="handleLogout" type="secondary">Logout</CustomButton>
      </div>
      <!-- <cog-6-tooth-icon class="w-7" /> -->
    </div>
  </aside>
  <CustomModal
    :isAddModalOpen="isAddModalOpen"
    :handleCloseModal="handleCloseModal"
    title="Add Board"
  >
    <div class="mt-2">
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <MultiUseInput
            v-model="formData.title"
            name="title"
            label="Board Title"
            :errorMessage="errors.title"
          />
          <CustomButton> Confirm </CustomButton>
        </div>
      </form>
    </div>
  </CustomModal>
</template>
