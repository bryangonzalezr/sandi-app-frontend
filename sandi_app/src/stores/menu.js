import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuday: {},
    menus: {},
    selectmenu:{},
    daymenus: [],
    weekmenus: [],
    monthmenus: [],
    typemenu: '',
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
      await APIAxios.post(`/api/menu`, menu)
      Swal.fire({
          title: "El menú se ha guardado con exito",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
      });
  },
  
  async SaveMenuDay(menuDay){
      await APIAxios.post(`/api/menu-diario`, menuDay)
      Swal.fire({
          title: "El menú se ha guardado con exito",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
      });
  },

      async IndexMenus(page,id_patient = '', type = '', sandi = ''){
        const res = await APIAxios.get(`/api/all-menus?page=${page}&patient=${id_patient}&type=${type}&sandi=${sandi}`)
        this.menus = res.data.data
        this.links = res.data.links
        this.meta = res.data.meta
    },

    async DeleteMenu(menu_id, typemenu) {
      if(typemenu === 'día') {
        await APIAxios.delete(`api/menu-diario/${menu_id}`)
      }
      else {
        await APIAxios.delete(`api/menu/${menu_id}`)
      }
    },

  },
})