import { RTXAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from 'pinia'
import { useMenuStore } from './menu'
import { useConvertersStore } from './vtt'

const menuStore = useMenuStore();
const converseStore = useConvertersStore();

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    responseAs: '',

  }),

  getters: {
    GetMessage: (state) => state.messages,
    GetResponseAs: (state) => state.responseAs,
  },

  actions: {
    async sedMessage(message) {
      this.messages.push({
        from: 'user',
        data: message
      })
      try{
        const res = await RTXAxios.post(`/chatwithrtx`, null , { params: { pregunta: message } }  )
        console.log(res)
        if(res.data.type){
          if(res.data.type === 'General Query'){
            this.responseAs = res.data.query;
          }
        }
        else if(res.data.label){
          menuStore.recipe = res.data
          await router.push({name: 'Recipe'})
          this.responseAs = `La receta ${res.data.label} se ha generado satisfactoriamente. Los ingredientes son:`
          for (const ingredient in res.data.ingredient_lines) {
            this.responseAs += ` ${res.data.ingredient_lines[ingredient]}`
          }
        }
        else if(res.data.recipes){
          menuStore.menuday = res.data
          if(res.data.recipes.length > 0){
            menuStore.isgenerate = true;
            menuStore.typemenu = 'día';
            await router.push({name: 'Menu'})
            this.responseAs = "Se ha generado tu menú del día con éxito, recuerda que este plan es solo una recomendación"
          }else{
            this.responseAs = "No hay recetas disponibles para el ingrediente seleccionado"
          }
        }
        else if(res.data.timespan){
          menuStore.menus = res.data
          menuStore.isgenerate = true;
          menuStore.typemenu = 'semana';
          await router.push({name: 'Menu'})
          this.responseAs = "Se ha generado tu menú semanal con éxito, recuerda que este plan es solo una recomendación"
        }
        else if(res.data.message){
          this.responseAs = res.data.message
        }
        else{
          this.responseAs = 'No estoy capacitado para responder a esa solicitud, por favor solicite una receta o ingrediente'
        }
      }catch (error) {
        this.responseAs = 'No estoy capacitado para responder a esa solicitud, por favor solicite una receta o ingrediente'
      }
      if(this.responseAs != ''){
        this.messages.push({
          from: 'assistant',
          data: this.responseAs,
        })
        converseStore.VoicetoTextmob(this.responseAs)
      }
      this.responseAs = '';
    },
  },
})