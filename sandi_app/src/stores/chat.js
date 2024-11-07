import { RTXAxios, APIAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from 'pinia'
import { useMenuStore } from './menu';
import { useRecipeStore } from './recipe';
import { useConvertersStore } from './vtt'
import { useAuthStore } from "./auth";

const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const authStore = useAuthStore();
const converseStore = useConvertersStore();

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    responseAs: '',
    message: '',
    currentMessage: '',
    texttospeech: true,
    isloading: false,
  }),

  getters: {
    GetMessages: (state) => state.messages,
    GetResponseAs: (state) => state.responseAs,
  },

  actions: {
    changeTexttospeech(){
      this.texttospeech =!this.texttospeech
    },

    async SendMessage(message, id_patient) {
      this.messages.push({
        from: 'user',
        data: message
      })
      this.currentMessage = ''
      try{
        this.chargeMessage = true
        const authToken = localStorage.getItem('authToken')
        const res = await RTXAxios.post(`/pregunta/pregunta_usuario`,{ pregunta: message, token: authToken.toString()})
        if(res.data.type === 'solicitud_receta'){
            recipeStore.SelectedRecipe(res.data)
            recipeStore.sandi_menu = false
            recipeStore.sandi_recipe = true
            this.responseAs = res.data.instructions
            router.push({ name: 'RecipeDetail'})
        }else if(res.data.type_query === 'solicitud_menu'){
          recipeStore.sandi_menu = true
          recipeStore.sandi_recipe = false
          this.isloading = true;
          if(res.data.time == 1){
            menuStore.selectmenu = {
              name: 'Menu Asistente',
              recipes: res.data.menus,
              total_calories: res.data.total_calories,
              time: res.data.time,
              user_id: authStore.user.id,
              sandi_recipe: true
            }
            
            if(res.data.menus.length > 0){
              menuStore.typemenu = 'día';
              await router.push({name: 'MenuSandiDetail', params: { type: res.data.type}})
              this.responseAs = "Se ha generado tu menú del día con éxito, recuerda que este plan es solo una recomendación"
            }else{
              this.responseAs = "No hay recetas disponibles para el ingrediente seleccionado"
            }
          }else if(res.data.time <= 7){
            menuStore.selectmenu = {
              name: 'Menu Semanal Asistente',
              menus: res.data.menus,
              total_calories: res.data.total_calories,
              time: res.data.time,
              user_id: authStore.user.id,
              sandi_recipe: true
            }
            menuStore.typemenu = 'semana';
            await router.push({name: 'MenuSandiDetail', params: { type: res.data.type}})
            this.responseAs = "Se ha generado tu menú semanal con éxito, recuerda que este plan es solo una recomendación"
          }else{
            menuStore.selectmenu = {
              name: 'Menu Mensual Asistente',
              menus: res.data.menus,
              total_calories: res.data.total_calorias,
              time: res.data.time,
              user_id: authStore.user.id,
              sandi_recipe: true
            }
            menuStore.typemenu = 'mes';
            await router.push({name: 'MenuSandiDetail', params: { type: res.data.type}})
            this.responseAs = "Se ha generado tu menú mensual con éxito, recuerda que este plan es solo una recomendación"
          }
          menuStore.isgenerate = true;
          this.isloading = false;
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
        if(this.texttospeech){
          converseStore.VoicetoTextmob(this.responseAs)
        }
      }
      this.responseAs = '';
    },
  },
})