<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { required, email, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import MultiUseInput from '@/components/MultiUseInput.vue'
import { toast } from 'vue3-toastify'
import { LoginUser } from '@/services/auth'
import { setLocalStorage } from '@/utils'

const formData = ref({
  password: '',
  email: ''
})

const rules = {
  password: { required, minLengthValue: minLength(6) },
  email: { required, email }
}

const $v = useVuelidate(rules, formData)
const router = useRouter()

const errors = computed(() => ({
  email: $v.value.email.$touch && $v.value.email.$invalid ? 'Email is required or invalid' : '',
  password: $v.value.password.$invalid ? 'Password is invalid' : ''
}))

async function submitForm() {
  $v.value.$touch()
  if ($v.value.$invalid) return
  const { data, error } = await LoginUser(formData.value)
  if (data) {
    setLocalStorage('token', data?.token, false)
    setLocalStorage('userData', { name: data?.name, email: data?.email })
    await router.replace('/')
    toast.success('Login Successfull')
    return
  }
  toast.error(error)
}
</script>

<template>
  <main>
    <div class="font-sans text-gray-900 antialiased">
      <div
        class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]"
      >
        <div>
          <h2 class="font-bold text-3xl">
            LOREM <span class="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
          </h2>
        </div>

        <div
          class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
          <form @submit.prevent="submitForm">
            <div class="py-8 text-center w-full">
              <span class="text-2xl font-semibold">Log In</span>
            </div>
            <div class="space-y-4">
              <MultiUseInput
                v-model="formData.email"
                name="email"
                label="Email"
                type="email"
                :errorMessage="errors.email"
              />

              <MultiUseInput
                v-model="formData.password"
                name="password"
                label="Password"
                type="password"
                :errorMessage="errors.password"
              />

              <div class="flex items-center justify-end">
                <RouterLink
                  to="/register"
                  class="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Don't have an account?
                </RouterLink>

                <button
                  class="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
