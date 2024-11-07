import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useShoppingListStore = defineStore('shoppingList', {
    state: () => ({
        shoppingList: {},
        shoppingLists: [],
        isLoading: false
      }),

    getters: {
        GetShoppingLists: (state) => state.shoppingLists,
        GetShoppingList: (state) => state.shoppingList,
    },
    
    actions: {
        async IndexShoppingList(){
            this.isLoading = true
            await APIAxios.get(`api/shopping-lists`).then((data) => {
                this.shoppingLists = data.data.data
                this.isLoading = false
            }).catch(() => {
                this.isLoading = false
            })
        },

        async ShowShoppingList(menuId){
            this.isLoading = true
            await APIAxios.get(`api/shopping-list/${menuId}`).then((data) => {
                this.shoppingList = data.data.data
                this.isLoading = false
            }).catch(() => {
                this.isLoading = false
            })
        }
    }
})