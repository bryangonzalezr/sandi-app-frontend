import axios from "axios"
import { defineStore } from 'pinia'
import { Message } from '@/interfaces/message'

const baseURL = import.meta.env.VITE_RTX_URL;

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
        const res = await axios.post(`${baseURL}/chatwithrtx`, null , { params: { pregunta: message } }  )
        console.log(res.data)
        /* if(res.data.type){
          if(res.data.type === 'General Query'){
            this.messages.push({
              from: 'assistant',
              data: res.data.query,
            })
          }
          else if(res.data.type === 'Daily Menu'){

          }
        }
        else{
          this.messages.push({
            from: 'assistant',
            data: 'No estoy capacitado para responder a esa solicitud, por favor solicite una receta o ingrediente',
          })
        } */
      }catch (error) {
        console.error(error)
      }
    },
  },
})