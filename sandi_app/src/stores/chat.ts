/* import axios from "axios"; */
import { defineStore } from 'pinia'
import { Message } from '@/interfaces/message'

/* axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL; */

export const useChatStore = defineStore('auth', {
  state: () => ({
    messages: [] as Message[],

  }),

  getters: {
    // Esto es para saber si el usuario esta logueado
    GetMessage: (state) => state.messages,
  },

  actions: {
    async sedMessage(message: string) {
      this.messages.push({
        from: 'user',
        data: message
      })
    },
  },
})