import { RTXAxios, APIAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from 'pinia'
import { useMenuStore } from './menu';
import { useRecipeStore } from './recipe';
import { useConvertersStore } from './vtt'

const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const converseStore = useConvertersStore();

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    responseAs: '',
    message: '',

  }),

  getters: {
    GetMessages: (state) => state.messages,
    GetResponseAs: (state) => state.responseAs,
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

    async SendMessage(message, id_patient) {
      this.messages.push({
        from: 'user',
        data: message
      })
      try{
        this.chargeMessage = true
        const res = await RTXAxios.post(`/pregunta/pregunta_usuario`,{ pregunta: { pregunta: message, id_usuario: id_patient} })
        console.log(res)
        if(res.data.type === 'solicitud_receta'){
            recipeStore.recipe = res.data
            console.log("receta en chat",recipeStore.recipe)
            this.responseAs = res.data.instrucciones
            router.push({ name: 'Recipe'})
        }else if(res.data.type === 'solicitud_menu'){
          if(res.data.time == 1){
            menuStore.menuday = {
              recetas: res.data.recetas,
              total_calorias: res.data.total_calorias,
              time: res.data.time
            }
            if(res.data.recipes.length > 0){
              menuStore.typemenu = 'día';
              await router.push({name: 'Menu'})
              this.responseAs = "Se ha generado tu menú del día con éxito, recuerda que este plan es solo una recomendación"
            }else{
              this.responseAs = "No hay recetas disponibles para el ingrediente seleccionado"
            }
          }else if(res.data.time <= 7){
            menuStore.menus = {
              recetas: res.data.recetas,
              total_calorias: res.data.total_calorias,
              time: res.data.time
            }
            menuStore.typemenu = 'semana';
            await router.push({name: 'Menu'})
            this.responseAs = "Se ha generado tu menú semanal con éxito, recuerda que este plan es solo una recomendación"
          }else{
            menuStore.menus = {
              recetas: res.data.recetas,
              total_calorias: res.data.total_calorias,
              time: res.data.time
            }
            menuStore.typemenu = 'semana';
            await router.push({name: 'Menu'})
            this.responseAs = "Se ha generado tu menú mensual con éxito, recuerda que este plan es solo una recomendación"
          }
        }else if(res.data.type === 'pregunta_cocina'){
          this.responseAs = res.data.response
        }
        else{
          this.responseAs = "No estoy capacitado para responder a esa solicitud"
        }
      }catch (error) {
        this.responseAs = 'Tengo problemas con la conexión'
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