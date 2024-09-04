import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const usePatientsStore = defineStore('patients',{
  state: () => ({
    patientslist: [],
    patientprogress: {} 
  }),

  getters: {
    GetPatients: (state) => state.patientslist,
    GetProgress: (state) => state.patientprogress,
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
      this.ObtainPatients();
    },

    async AssociatePatient(id) {
      const res = await APIAxios.post(`/api/paciente` , { patient_id: id});
      this.ObtainPatients();
    },

    async ShowProgress(id){
      const res = await APIAxios.get(`/api/progreso/${id}`)
      this.patientprogress = res.data
    }
      
  }
})