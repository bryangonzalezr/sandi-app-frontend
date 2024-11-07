import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';
import Swal from "sweetalert2";

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    selectrecipe: {},
    recipe: {},
    listrecipes: [],
    sandi_recipe: false,
    sandi_menu: false,
    isLoading: false,
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
      const res = await APIAxios.post(`api/receta/generar`, { query: query })
      this.recipe = res.data;
    },

    async IndexRecipe(paginate) {
        this.isLoading = true
        await APIAxios.get(`api/recetas?paginate=${paginate}}`).then((data) => {
          this.listrecipes = data.data.data;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
          Swal.fire({
            title: "Ha habido un error",
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
            heightAuto: false,
          });
        })
        

        
    },

    async SaveRecipe(recipe, sandi_recipe, id_patient) {
        const saveData = {
          'label': recipe.label,
          'ingredientLines': recipe.ingredientLines,
          'ingredients': recipe.ingredients,
          'calories': recipe.calories,
          'sandi_recipe': sandi_recipe,
          'user_id': id_patient,
          'dietLabels': recipe.dietLabels,
          'healthLabels': recipe.healthLabels,
          'mealType': recipe.mealType,
          'dishType': recipe.dishType,
        }
        await APIAxios.post(`api/receta`,saveData).then(() => {
            Swal.fire({
              title: "La receta se ha guardado con exito",
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
    },

    async DeleteRecipe(id_recipe) {
        await APIAxios.delete(`api/receta/${id_recipe}`).then(() => {
          Swal.fire({
            title: "La receta se ha eliminado con exito",
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
    },

  },
})