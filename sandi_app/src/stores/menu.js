import axios from 'axios'
import { defineStore } from 'pinia'

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuday: {},
    selectrecipe: {},
    menus: {},
    recipe: {},
    isloading: false,
    isgenerate: false,
    typemenu:''
  }),

  getters: {
    GetMenuday: (state) => state.menuday,
    GetSelectRecipe: (state) => state.selectrecipe,
    GetMenus: (state) => state.menus,
    GetLoading: (state) => state.isloading,
    GetGenerate: (state) => state.isgenerate,
    GetRecipe: (state) => state.recipe,
    Gettype: (state) => state.typemenu,
  },

  actions: {
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

    SelectedRecipe(recipe) {
      this.selectrecipe = recipe;
    },

    async GenerateRecipe(query) {
      const res = await axios.post(`${URL_SANDIAPI}/receta/api/`, { query: query })
      console.log(res.data);
      this.recipe = res.data;
    },

  },
})