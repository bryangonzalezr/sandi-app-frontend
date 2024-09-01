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
    },

    async RemovePatient(id) {
      const res = await axios.delete(`${URL_SANDIAPI}/api/paciente/${id}`);
      console.log("Eliminar paciente con id",id);
    },

    async AssociatePatient(id) {
      const res = await axios.post(`${URL_SANDIAPI}/api/paciente` , { patient_id: id});
    }
      
  }
})