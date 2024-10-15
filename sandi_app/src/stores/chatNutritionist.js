import { RTXAxios, APIAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from 'pinia'

export const useChatNutritionistStore = defineStore('chatNutritionist', {
    state: () => ({
      messages: [],
      message: '',
  
    }),
  
    getters: {
      GetMessages: (state) => state.messages,
    },
  
    actions: {

      async ShowMessageNutritionist(receiver_id) {
        await APIAxios.get(`/api/messages/${receiver_id}`).then((res) => {
          this.messages = res.data.message
        });
      },
  
      async SendMessageNutritionist(message, receiver_id) {
        await APIAxios.post(`/api/messages/${receiver_id}`, { 'message': message }).then((res) => {
          this.messages.push(res.data.message) 
        });
      },
  
    },
  })