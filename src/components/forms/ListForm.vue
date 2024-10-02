<script setup>
import { addBoardList, editBoardList } from '@/services/board/board.service'
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import MultiUseInput from '../MultiUseInput.vue'
import CustomButton from '../common/CustomButton.vue'

const props = defineProps({
  onSubmitSuccess: { required: true },
  boardId: { required: true },
  data: { required: true }
})

const formData = ref({
  title: props.data ? props.data?.title : ''
})

const rules = {
  title: { required, minLengthValue: minLength(3) }
}

const $v = useVuelidate(rules, formData)

const errors = computed(() => ({
  title: $v.value.title.$invalid ? 'title is invalid' : ''
}))

const submitForm = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) return

  const payload = { title: formData.value.title, boardId: props.boardId }

  const { data, error } = props.data
    ? await editBoardList(props.data?._id, payload)
    : await addBoardList(payload)
  if (!error) {
    toast.success(data?.message)
    props.onSubmitSuccess()
    formData.value.title = ''
    return
  }
  toast.error(error?.message)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-4">
      <MultiUseInput
        v-model="formData.title"
        name="title"
        label="List Title"
        :errorMessage="errors.title"
      />
      <CustomButton> {{ data ? 'Edit' : 'Confirm' }} </CustomButton>
    </div>
  </form>
</template>
