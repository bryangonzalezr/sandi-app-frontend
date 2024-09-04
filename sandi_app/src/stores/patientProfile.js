import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const usePatientProfileStore = defineStore('patientProfile', {
  state: () => ({
    data: {
      name: '',
      last_name: '',
      email: '',
      role: '',
      sex: '',
      birthdate: '',
      age: '',
      phone_number: '',
      civil_status: '',
      objectives: '',
      physical_activity: {
        actividad: '',
        tiempo: '',
        dias_semana: '',
        status: '',
        entrenamiento: {
          duracion: '',
          tipo: '',
          horarios: '',
        }
      },
      habits: {
        alcohol: '',
        tabaco: ''
      },
      allegies: [],
      nutitional_anamnesis: {
        plan_anterior: '',
        agua: ''
      }
    },
  }),

  actions: {
    async obtainPatientProfile(id){
      if(id !== undefined){
        const res = await APIAxios.get(`/api/paciente/${id}`);
        this.data.id = res.data.data.user.id;
        this.data.name = res.data.data.user.name;
        this.data.last_name = res.data.data.user.last_name;
        this.data.email = res.data.data.user.email;
        this.data.role = res.data.data.user.role;
        this.data.sex = res.data.data.user.sex;
        this.data.birthdate = res.data.data.user.birthdate;
        this.data.age = res.data.data.user.age;
        this.data.phone_number = res.data.data.user.phone_number;
        this.data.civil_status = res.data.data.user.civil_status;
        this.data.objectives = res.data.data.user.objectives;
      }
    }
  }
})