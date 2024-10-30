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
    texttospeech: true,

  }),

  getters: {
    GetMessages: (state) => state.messages,
    GetResponseAs: (state) => state.responseAs,
  },

  actions: {
    changeTexttospeech(){
      this.texttospeech =!this.texttospeech
    },

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

    async SendMessage(message) {
      this.messages.push({
        from: 'user',
        data: message
      })
      try{
        this.chargeMessage = true
        const authToken = localStorage.getItem('authToken')
        const res = await RTXAxios.post(`/pregunta/pregunta_usuario`,{ pregunta: message, token: authToken.toString()})
        console.log(res.data)
        if(res.data.type === 'solicitud_receta'){
            recipeStore.recipe = res.data
            this.responseAs = res.data.instructions
            router.push({ name: 'Recipe'})
        }else if(res.data.type === 'solicitud_menu'){
          menuStore.isloading = true;
          if(res.data.time == 1){
            menuStore.menuday = {
              name: 'Menu Asistente',
              recipes: res.data.menus,
              total_calorias: res.data.total_calories,
              time: res.data.time,
              user_id: res.data.user_id,
              sandi_recipe: true
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
              name: 'Menu Semanal Asistente',
              menus: res.data.menus,
              total_calorias: res.data.total_calories,
              time: res.data.time,
              user_id: res.data.user_id,
              sandi_recipe: true
            }
            menuStore.typemenu = 'semana';
            await router.push({name: 'Menu'})
            this.responseAs = "Se ha generado tu menú semanal con éxito, recuerda que este plan es solo una recomendación"
          }else{
            menuStore.menus = {
              name: 'Menu Mensual Asistente',
              menus: res.data.menus,
              total_calorias: res.data.total_calorias,
              time: res.data.time,
              user_id: res.data.user_id,
              sandi_recipe: true
            }
            menuStore.typemenu = 'mes';
            await router.push({name: 'Menu'})
            this.responseAs = "Se ha generado tu menú mensual con éxito, recuerda que este plan es solo una recomendación"
          }
          menuStore.isgenerate = true;
          menuStore.isloading = false;
        }else if(res.data.type === 'pregunta_cocina'){
          this.responseAs = res.data.response
        }
        else{
          this.responseAs = "No estoy capacitado para responder a esa solicitud"
        }
      }catch (error) {
        console.log(error)
        this.responseAs = 'Tengo problemas con la conexión'
      }
      if(this.responseAs != ''){
        this.messages.push({
          from: 'assistant',
          data: this.responseAs,
        })
        if(this.texttospeech){
          converseStore.VoicetoTextmob(this.responseAs)
        }
      }
      this.responseAs = '';
    },
  },
})