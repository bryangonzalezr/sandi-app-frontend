import { APIAxios } from "./baseURL";
import { defineStore  } from "pinia";
import router from "@/router";

export const useConsultStore = defineStore('consulta', {
  state: () => ({
    consulta: {},
  }),

  getters: {
    GetConsult: (state) => state.consult,
  },

  actions: {

      async saveConsult(id,fecha) {
        this.consulta.patient_id = id;
        this.consulta.date = fecha
        await APIAxios.post('api/consulta', this.consulta).then(() =>{
          router.push({name: 'PatientProgress', params: {id: id}});
        });
      }
  }
});