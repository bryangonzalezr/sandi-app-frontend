import axios from "axios"
import router from "@/router";
import { defineStore } from 'pinia'
import { Message } from '@/interfaces/message'
import {useMenuStore} from './menu'
import { useConvertersStore } from './vtt'

const baseURL = import.meta.env.VITE_RTX_URL;

const menuStore = useMenuStore();
const converseStore = useConvertersStore();

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    responseAs: '',

  }),

  getters: {
    GetMessage: (state) => state.messages,
    GetResponseAs: (state) => state.responseAs,
  },

  actions: {
    async sedMessage(message: string) {
      this.messages.push({
        from: 'user',
        data: message
      })
      try{
        const res = await axios.post(`${baseURL}/chatwithrtx`, null , { params: { pregunta: message } }  )
        if(res.data.type){
          if(res.data.type === 'General Query'){
            this.responseAs = res.data.query;
          }
          else if(res.data.type === 'Daily Menu'){
            await menuStore.GenerateMenuday(res.data.query);
            await router.push({ name: "Menu" });
          }
        }
        else{
          this.responseAs = 'No estoy capacitado para responder a esa solicitud, por favor solicite una receta o ingrediente'
        }
      }catch (error) {
        this.responseAs = 'Existe un error'
      }
      if(this.responseAs != ''){
        this.messages.push({
          from: 'assistant',
          data: this.responseAs,
        })
        converseStore.VoicetoTextmob(this.responseAs)
      }
    },
  },
})