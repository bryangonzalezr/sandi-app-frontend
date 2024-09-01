import { defineStore  } from "pinia";

export const useConsultStore = defineStore('consulta', {
  state: () => ({
    consulta: {
      datos: {
        estatura: '',
        peso: ''
      },
      plieges: {
        biciptal: '',
        triciptal: '',
        subescap: '',
        supraespinal: '',
        supracres: '',
        muslomedio: '',
        pantorrilla: '',
        abdomen: ''
      },
      perimetros: {
        pbrelajado: '',
        pbcontraido: '',
        antebrazo: '',
        muslomedio: '',
        pantorrilla: '',
        cintura: '',
        torax: ''
      }
    },
  }),

  getters: {
    GetConsult: (state) => state.consult,
  },

  actions: {
      async saveConsult() {
        console.log(this.consulta)
      }
  },
})