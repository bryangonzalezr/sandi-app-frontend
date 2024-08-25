import axios from 'axios'
import { defineStore } from 'pinia'

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuday: {},
    menus: {},
    selectmenu:{},
    isloading: false,
    isgenerate: false,
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
        this.isloading = true;
        this.isgenerate = true;
        const res = await axios.post(`${URL_SANDIAPI}/daymenu/generate`, { query: query })
        console.log(res.data);
        this.menuday = res.data;
        this.isloading = false;
    },

    async GenerateMenu(query, time) {
      this.isloading = true;
      this.isgenerate = true;
      const res = await axios.post(`${URL_SANDIAPI}/menu/generate`, { query: query }, { params: { timespan: time } })
      console.log(res.data);
      this.menus = res.data;
      this.isloading = false;
    },

    async SaveMenu(menu, typemenu) {
      if(typemenu === 'día') {
        console.log(menu);
        await axios.post(`${URL_SANDIAPI}/daymenu/`, menu)
      }
      else {
        console.log(menu);
        await axios.post(`${URL_SANDIAPI}/menu`, menu)
      }
    },

    async ViewMenuList() {
      const res1 = await axios.get(`${URL_SANDIAPI}/daymenu/`)
      const res2 = await axios.get(`${URL_SANDIAPI}/menu`)
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
        await axios.delete(`${URL_SANDIAPI}/daymenu/${menu_id}`)
      }
      else {
        await axios.delete(`${URL_SANDIAPI}/menu/${menu_id}`)
      }
    },

  },
})