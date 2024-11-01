import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const useContactCardsStore = defineStore('contactcards', {
    state: () => ({
        contactcards: [],
        contactdetails:{},
    }),

    getters: {
        GetContactCards: (state) => state.contactcards,
        GetContactDetails: (state) => state.contactdetails,
    },

    actions: {
        async IndexContactCards(paginate) {
            const res = await APIAxios.get(`api/tarjetas?paginate=${paginate}`);
            this.contactcards = res.data
        },

        async ShowContactCards(id){
            const res = await APIAxios.get(`api/tarjeta/${id}`);
            this.contactdetails = res.data.data
        }
    }
})