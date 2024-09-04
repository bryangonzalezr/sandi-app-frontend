import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const usePatientsStore = defineStore('patients',{
  state: () => ({
    patientslist: [],
    patientprogress: {},
    patient: {},
  }),

  getters: {
    GetPatients: (state) => state.patientslist,
    GetProgress: (state) => state.patientprogress,
    GetPatient: (state) => state.patient,
  },

  actions: {
    async ObtainPatients() {
      const res = await APIAxios.get(`/api/pacientes`);
      console.log(res.data.data);
      this.patientslist = res.data.data;
    },

    async ObtainPatient(id){
      const res = await APIAxios.get(`/api/paciente/${id}`);
      this.patient = res;
    },

    async RemovePatient(id) {
      const res = await APIAxios.delete(`/api/paciente/${id}`);
      console.log("Eliminar paciente con id",id);
      this.ObtainPatients();
    },

    async AssociatePatient(email) {
      const res = await APIAxios.post(`/api/paciente` , { patient_email: email});
      this.ObtainPatients();
    },

    async ShowProgress(id){
      const res = await APIAxios.get(`/api/progreso/${id}`)
      this.patientprogress = res.data
    }
      
  }
})