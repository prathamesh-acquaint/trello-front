import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenicated = ref(false)
  function authUser(value) {
    isAuthenicated.value = value
  }

  return { isAuthenicated, authUser }
})
