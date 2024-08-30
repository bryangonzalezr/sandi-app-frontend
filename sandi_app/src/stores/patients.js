import axios from "axios";
import { defineStore } from "pinia";

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const usePatientsStore = defineStore('patients',{
  state: () => ({
    patientslist: [],
  }),

  getters: {
    GetPatients: (state) => state.patientslist,
  },

  actions: {
    async ObtainPatients() {
      const res = await axios.get(`${URL_SANDIAPI}/api/pacientes`);
      console.log(res.data.data);
      this.patientslist = res.data.data;
    }
      
  }
})