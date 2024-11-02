import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

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
  }),

  getters: {
    GetProfile: (state) => state.data,
    GetProgress: (state) => state.progress
  },

  actions: {
    async ShowProfile(id){
      if(id !== undefined){
        const res = await APIAxios.get(`/api/paciente/${id}`);
        this.data.user.id = res.data.data.user.id;
        this.data.user.name = res.data.data.user.name;
        this.data.user.last_name = res.data.data.user.last_name;
        this.data.user.email = res.data.data.user.email;
        this.data.user.role = res.data.data.user.role;
        this.data.user.sex = res.data.data.user.sex;
        this.data.user.birthdate = res.data.data.user.birthdate;
        this.data.user.age = res.data.data.user.age;
        this.data.user.phone_number = res.data.data.user.phone_number;
        this.data.user.civil_status = res.data.data.user.civil_status;
        this.data.user.objectives = res.data.data.user.objectives;
      }
    },

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

    async UpdateUserProfile(id){
      const res = await APIAxios.put(`/api/usuario/${id}`, this.data );  
      console.log(res);
    },
  },
})