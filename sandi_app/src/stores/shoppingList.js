import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useShoppingListStore = defineStore('shoppingList', {
    state: () => ({
        shoppingList: {},
        shoppingLists: [],
      }),
    
    actions: {
        async IndexShoppingList(){
            await APIAxios.get(`/shopping-lists`).then((data) => {
                this.shoppingLists = data.data
            })
        },

        async ShowShoppingListByMenu(menuId){
            await APIAxios.get(`/shopping-list/${menuId}`).then((data) => {
                this.shoppingList = data.data
            })
        }
    }
})