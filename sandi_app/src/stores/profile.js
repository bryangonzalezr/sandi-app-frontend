import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    Profile: {},

  }),

  getters: {
    GetProfile: (state) => state.Profile,
  },

  actions: {
    CreateProfile(NutritionalProfile){
        this.Profile = NutritionalProfile;
    }
  },
})