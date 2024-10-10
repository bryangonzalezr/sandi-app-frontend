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
        console.log(res);
        this.listrecipes = res.data.data;
    },

    async SaveRecipe(recipe, sandi_recipe, id_patient) {
      console.log('receta', recipe)
        const saveData = {
          'label': recipe.receta,
          'ingredientLines': recipe.ingredientes,
          'calories': recipe.calorias,
          'sandi_recipe': sandi_recipe,
          'user_id': id_patient,
          'dietLabels': recipe.dietas,
          'healthLabels': recipe.salud,
          'cautions': recipe.precauciones,
          'mealType': recipe.tipo_comida,
          'dishType': recipe.tipo_plato,
        }
        try{
          await APIAxios.post(`api/receta`,saveData)
        }catch(error) {
          console.log(error);
        }
    },

    async DeleteRecipe(id_recipe) {
        console.log(id_recipe);
        await APIAxios.delete(`api/receta/${id_recipe}`)
    },

  },
})