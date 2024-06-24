import axios from "axios"
import { defineStore } from 'pinia'
import { Message } from '@/interfaces/message'

axios.defaults.baseURL = import.meta.env.VITE_RTX_URL;

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],

  }),

  getters: {
    GetMessage: (state) => state.messages,
  },

  actions: {
    async sedMessage(message: string) {
      this.messages.push({
        from: 'user',
        data: message
      })
      try{
        const res = await axios.post('/chatwithrtx', null , { params: { pregunta: message } }  )
        if(res.data.error){
          this.messages.push({
            from: 'assistant',
            data: 'No estoy capacitado para responder a esa solicitud, por favor solicite una receta o ingrediente',
          })
        }
        else{
          this.messages.push({
            from: 'assistant',
            data: `la solicitud es de tipo ${res.data.type} y se enviara como: ${res.data.query}`,
          })
        }
      }catch (error) {
        console.error(error)
      }
    },
  },
})