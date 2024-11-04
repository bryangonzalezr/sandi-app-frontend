import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useShoppingListStore = defineStore('shoppingList', {
    state: () => ({
        shoppingList: {}
      }),
    
    actions: {
        async ShowShoppingList(){}
    }
})