import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';
import Swal from "sweetalert2";

export const useProfileStore = defineStore('profile', {
  state: () => ({
    data: {
      name: '',
      last_name: '',
      sex: '',
      birthdate: '',
      age: '',
      phone_number: '',
      civil_status: '',
      objectives: '',
      physical_comentario: '',
      physical_status: '',
      patient_type:'',
      habits: {
        alcohol: '',
        tabaco: ''
      },
      allergies: [],
      nutritional_anamnesis: {
        plan_anterior: false,
        agua: ''
      }
    },
    progress: {},
    pauta: {},
    nutritionist: null,
    healthTypes: [],
    isLoadingPlan: false
  }),

  getters: {
    GetProfile: (state) => state.data,
    GetProgress: (state) => state.progress,
    GetPauta: (state) => state.pauta,
    GetNutritionist: (state) => state.nutritionist
  },

  actions: {

    async ShowUserProfile(id){
      if(id !==undefined){
        const res = await APIAxios.get(`/api/usuario/${id}`);
        this.data.name = res.data.data.name;
        this.data.last_name = res.data.data.last_name;
        this.data.sex = res.data.data.sex;
        this.data.birthdate = res.data.data.birthdate;
        this.data.age = res.data.data.age;
        this.data.phone_number = res.data.data.phone_number;
        this.data.civil_status = res.data.data.civil_status;
        this.data.objectives = res.data.data.objectives;
        if(res.data.data.nutritionist !== null){
          this.nutritionist = res.data.data.nutritionist;
        }
        if(res.data.data.nutritional_profile !== null){
          this.data.physical_comentario= res.data.data.nutritional_profile.physical_comentario;
          this.data.physical_status = res.data.data.nutritional_profile.physical_status;
          this.data.habits.alcohol = res.data.data.nutritional_profile.habits.alcohol;
          this.data.habits.tabaco = res.data.data.nutritional_profile.habits.tabaco;
          this.data.allergies = res.data.data.nutritional_profile.allergies;
          this.data.nutritional_anamnesis.agua = res.data.data.nutritional_profile.nutritional_anamnesis.agua;
          this.data.nutritional_anamnesis.plan_anterior = res.data.data.nutritional_profile.nutritional_anamnesis.plan_anterior;
        }
      }
    },

    async ShowProgress(id){
      const res = await APIAxios.get(`/api/progreso/${id}`)
      this.progress = res.data
    },

    async ShowPauta(id){
      this.isLoadingPlan = true
      await APIAxios.get(`/api/plan-nutricional/${id}`).then((data) => {
        this.pauta = data.data.data
        this.isLoadingPlan = false
      }).catch(() => {
        this.isLoadingPlan = false
        Swal.fire({
          title: "Ha habido un error",
          icon: "error",
          timer: 1000,
          showConfirmButton: false,
          heightAuto: false,
        });
      })
    },

    async UpdateUserProfile(id){
      const res = await APIAxios.put(`/api/usuario/${id}`, this.data );  
    },
    async HealthTypes(){
      const res = await APIAxios.get('api/enum/health-types');
      this.healthTypes = res.data.data;
    }
  },
})