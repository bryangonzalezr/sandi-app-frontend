import { APIAxios } from "./baseURL";
import { defineStore  } from "pinia";
import router from "@/router";

export const useConsultStore = defineStore('consulta', {
  state: () => ({
    consulta: {
      date: '',
      patient_id: '',
      height: '',
      weight: '',
      bicipital_skinfold: '',
      tricipital_skinfold: '',
      subscapular_skinfold: '',
      supraspinal_skinfold: '',
      suprailiac_skinfold: '',
      thigh_skinfold: '',
      calf_skinfold: '',
      abdomen_skinfold: '',
      pb_relaj: '',
      pb_contra: '',
      forearm: '',
      thigh: '',
      calf: '',
      waist: '',
      thorax: ''
    },
  }),

  getters: {
    GetConsult: (state) => state.consult,
  },

  actions: {
      async savePatientId(id){
        
      },

      async saveConsult(id) {
        console.log(this.consulta);
        this.consulta.patient_id = id;
        const response = await APIAxios.post('api/consulta', this.consulta).then(() =>{
          router.push({name: 'PatientProgress', params: {id: id}});
          console.log('Consulta guardada');
        });
      }
  }
});