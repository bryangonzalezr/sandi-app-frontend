import axios from 'axios'
import { defineStore } from 'pinia'

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    selectrecipe: {},
    recipe: {},
    listrecipes: [],
  }),

  getters: {
    GetSelectRecipe: (state) => state.selectrecipe,
    GetRecipe: (state) => state.recipe,
    GetRecipeList: (state) => state.listrecipes,
  },

  actions: {
    SelectedRecipe(recipe) {
      this.selectrecipe = recipe;
    },

    async GenerateRecipe(query) {
      const res = await axios.post(`${URL_SANDIAPI}/receta/api/`, { query: query })
      console.log(res.data);
      this.recipe = res.data;
    },

    async ViewListRecipes() {
        const res = await axios.get(`${URL_SANDIAPI}/recetas`)
        console.log(res.data);
        this.listrecipes = res.data;
    },

    async SaveRecipe(recipe) {
        console.log(recipe);
        await axios.post(`${URL_SANDIAPI}/receta`,recipe)
    },

    async DeleteRecipe(id_recipe) {
        console.log(id_recipe);
        await axios.delete(`${URL_SANDIAPI}/receta/${id_recipe}`)
    },

  },
})