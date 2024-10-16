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

    async SaveMenu(menu, typemenu) {
      if(typemenu === 'día') {
        await APIAxios.post(`api/menu-diario/`, menu)
      }
      else {
        await APIAxios.post(`api/menu`, menu)
      }
    },

    async IndexMenu() {
      const res1 = await APIAxios.get(`api/menus-diarios/`)
      const res2 = await APIAxios.get(`api/menus/`)
      this.daymenus = res1.data;
      if(res2.data.find(menu => menu.timespan == 7)) {
        this.weekmenus = res2.data.filter(menu => menu.timespan == 7)
      }
      if(res2.data.find(menu => menu.timespan >= 30)) {
        this.monthmenus = res2.data.filter(menu => menu.timespan >= 30)
      }
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