import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useShoppingListStore = defineStore('shoppingList', {
    state: () => ({
        shoppingList: {},
        shoppingLists: [],
      }),

    getters: {
        GetShoppingLists: (state) => state.shoppingLists,
        GetShoppingList: (state) => state.shoppingList,
    },
    
    actions: {
        async IndexShoppingList(){
            await APIAxios.get(`api/shopping-lists`).then((data) => {
                this.shoppingLists = data.data.data
            })
        },

        async ShowShoppingList(menuId){
            await APIAxios.get(`api/shopping-list/${menuId}`).then((data) => {
                this.shoppingList = data.data.data
            })
        }
    }
})