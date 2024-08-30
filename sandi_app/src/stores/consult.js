import { defineStore  } from "pinia";

export const useProfileStore = defineStore('consult', {
    state: () => ({
        Consult: {},
    }),

    getters: {
        GetConsult: (state) => state.Consult,
    },

    actions: {
        
    },
})