import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';
import { useRecipeStore } from './recipe';
import router from "@/router";
import Swal from "sweetalert2";

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuday: {},
    menus: [],
    selectmenu:{},
    typemenu: '',
    isloading: false
  }),

  getters: {
    GetMenuday: (state) => state.menuday,
    GetMenus: (state) => state.menus,
    GetSelectMenu: (state) => state.selectmenu,
    GetLoading: (state) => state.isloading,
    GetGenerate: (state) => state.isgenerate,
    Gettype: (state) => state.typemenu,
    GetMenuList: (state) => state.menulist,
  },

  actions: {
    SelectedMenu(menu) {
      this.selectmenu = menu;
    },

    async GenerateMenuday(query) {
        const res = await APIAxios.post(`api/menu-diario/generar`, { query: query })
        this.menuday = res.data;
    },

    async GenerateMenu(query, time) {
      const res = await APIAxios.post(`api/menu/generar`, { query: query }, { params: { timespan: time } })
      this.menus = res.data;
    },

    async SaveMenu(menu){
      const recipeStore = useRecipeStore();
      await APIAxios.post(`/api/menu`, menu).then(() => {
        recipeStore.sandi_menu = false
        router.push({name: 'ChatBot'})
        Swal.fire({
          title: "El menú se ha guardado con exito",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
        });
      }).catch((error) => {
        recipeStore.sandi_menu = false
        Swal.fire({
          title: "Ha habido un error",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
        });
      })
      
  },
  
  async SaveMenuDay(menuDay){
      await APIAxios.post(`/api/menu-diario`, menuDay).then(() => {
        router.push({name: 'ChatBot'})
        Swal.fire({
          title: "El menú se ha guardado con exito",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
        });
      }).catch(() => {
        Swal.fire({
          title: "Ha habido un error",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
        });
      })
      
  },

      async IndexMenus(paginate = 0, id_patient = '', type = '', sandi = ''){
        this.isloading = true
        await APIAxios.get(`/api/all-menus`, {
          params:{
            patient: id_patient,
            type:type,
            sandi: sandi,
            paginate: paginate
          }
        }).then((data) => {
          this.menus = data.data.data
          this.isloading = false
        }).catch(() => {
          this.isloading = false
          Swal.fire({
            title: "Ha habido un error",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        });

        

    },

    async DeleteMenu(menu_id, typemenu) {
      if(typemenu === 'día') {
        await APIAxios.delete(`api/menu-diario/${menu_id}`).then(() => {
          Swal.fire({
            title: "El menú se ha eliminado con exito",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        }).catch((error) => {
          Swal.fire({
            title: "Ha habido un error",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        })
      }
      else {
        await APIAxios.delete(`api/menu/${menu_id}`).then(() => {
          Swal.fire({
            title: "El menú se ha eliminado con exito",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        }).catch((error) => {
          Swal.fire({
            title: "Ha habido un error",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        })
      }
    },

  },
})