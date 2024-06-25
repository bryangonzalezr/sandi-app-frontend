import { defineStore } from 'pinia'
import { NutritionalProfile } from '@/interfaces/nutritionalprofile'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    Profile: {} as NutritionalProfile,

  }),

  getters: {
    GetProfile: (state) => state.Profile,
  },

  actions: {
    CreateProfile(NutritionalProfile: NutritionalProfile){
        this.Profile = NutritionalProfile;
    }
  },
})