import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const usePatientsStore = defineStore('patients',{
  state: () => ({
    patientslist: [],
  }),

  getters: {
    GetPatients: (state) => state.patientslist,
  },

  actions: {
    async ObtainPatients() {
      const res = await APIAxios.get(`/api/pacientes`);
      console.log(res.data.data);
      this.patientslist = res.data.data;
    },

    async RemovePatient(id) {
      const res = await APIAxios.delete(`/api/paciente/${id}`);
      console.log("Eliminar paciente con id",id);
    },

    async AssociatePatient(id) {
      const res = await APIAxios.post(`/api/paciente` , { patient_id: id});
    },

    async ShowProgress(id){
      const res = await APIAxios.get(`/api/progreso/${id}`)
      console.log(res.data)
    }
      
  }
})