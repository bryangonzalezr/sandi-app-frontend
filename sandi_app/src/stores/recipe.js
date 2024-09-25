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
      console.log('this.selectrecipe',this.selectrecipe)
    },

    async GenerateRecipe(query) {
      const res = await APIAxios.post(`api/receta/generar`, { query: query })
      console.log(res.data);
      this.recipe = res.data;
    },

    async IndexRecipe() {
        const res = await APIAxios.get(`api/recetas`)
        console.log(res.data);
        this.listrecipes = res.data;
    },

    async SaveRecipe(recipe) {
        const saveData = {
          label: recipe.receta,
          ingredients: recipe.ingredientes,
          instructions: recipe.instrucciones
        }
        await APIAxios.post(`api/receta`,saveData)
    },

    async DeleteRecipe(id_recipe) {
        console.log(id_recipe);
        await APIAxios.delete(`api/receta/${id_recipe}`)
    },

  },
})