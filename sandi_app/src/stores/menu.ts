import axios from 'axios'
import { defineStore } from 'pinia'
import { Menuday } from '@/interfaces/menuday'
import { Recipe } from "@/interfaces/recipe";
import { Menus } from '@/interfaces/menus'

const URL_RTX = import.meta.env.VITE_SANDIAPI_URL;

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuday: {} as Menuday,
    selectrecipe: {} as Recipe,
    menus: {} as Menus,
    isloading: false,
  }),

  getters: {
    GetMenuday: (state) => state.menuday,
    GetSelectRecipe: (state) => state.selectrecipe,
    GetMenus: (state) => state.menus,
    GetLoading: (state) => state.isloading,
  },

  actions: {
    async GenerateMenuday(query: string) {
        this.isloading = true;
        const res = await axios.post(`${URL_RTX}/daymenu/generate`, { query: query })
        console.log(res.data);
        this.menuday = res.data;
        this.isloading = false;
    },

    async GenerateMenu(query: string, time: number) {
      this.isloading = true;
      const res = await axios.post(`${URL_RTX}/menu/generate`, { query: query }, { params: { timespan: time } })
      console.log(res.data);
      this.menus = res.data;
      this.isloading = false;
  },

    SelectedRecipe(recipe: Recipe) {
      this.selectrecipe = recipe;
    }
  },
})