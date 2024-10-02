<script setup>
import { createCard, updateCard } from '@/services/board/card/card.service'
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import MultiUseInput from '../MultiUseInput.vue'
import CustomButton from '../common/CustomButton.vue'

const props = defineProps({
  onFormSuccess: { required: true },
  data: { required: true },
  listId: { required: true },
  boardId: { required: true }
})

const formData = ref({
  cardTitle: props.data ? props.data?.title : ''
})

const rules = {
  cardTitle: { required, minLengthValue: minLength(3) }
}

const $v = useVuelidate(rules, formData)

const errors = computed(() => ({
  cardTitle: $v.value.cardTitle.$invalid ? 'cardTitle is invalid' : ''
}))

const submitForm = async () => {
  $v.value.$touch()
  if ($v.value.$invalid) return
  const payload = {
    listId: props.listId,
    boardId: props.boardId,
    cardTitle: formData.value.cardTitle
  }
  const { data, error } = props.data
    ? await updateCard(props.data?._id, { title: formData.value.cardTitle })
    : await createCard(payload)
  if (!error) {
    toast.success(data?.message)
    props.onFormSuccess()
    return
  }
  toast.error(error?.message)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-4">
      <MultiUseInput
        v-model="formData.cardTitle"
        name="cardTitle"
        label="Card Title"
        :errorMessage="errors.cardTitle"
      />
      <CustomButton> {{ data ? 'Edit' : 'Confirm' }} </CustomButton>
    </div>
  </form>
</template>
