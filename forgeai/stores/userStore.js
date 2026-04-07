import { defineStore } from 'pinia'
import userData from '@/data/member.json'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: userData
  }),
  getters: {
    initials: (state) => state.user.initials,
    isAdmin: (state) => state.user.accessLevel === 'Admin'
  }
})
