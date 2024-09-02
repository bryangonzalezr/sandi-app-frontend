import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia'

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
      const res = await APIAxios.post(`/receta/api/`, { query: query })
      console.log(res.data);
      this.recipe = res.data;
    },

    async ViewListRecipes() {
        const res = await APIAxios.get(`/recetas`)
        console.log(res.data);
        this.listrecipes = res.data;
    },

    async SaveRecipe(recipe) {
        console.log(recipe);
        await APIAxios.post(`$/receta`,recipe)
    },

    async DeleteRecipe(id_recipe) {
        console.log(id_recipe);
        await APIAxios.delete(`/receta/${id_recipe}`)
    },

  },
})