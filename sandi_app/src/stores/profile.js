import axios from 'axios';
import { defineStore } from 'pinia';

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const useProfileStore = defineStore('profile', {
  state: () => ({
    data: {
      user:{
        id:'',
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
      },
      nutritional_profile: {
        description: '',
        height: '',
        weight: '',
  
        physical_activity: {
  
        },
        habits: {
  
        },
        allergies: {
  
        },
        morbid_antecedents: {
  
        },
        family_antecedents: {
  
        },
        subjective_assessment: {
  
        },
        nutritional_anamnesis: {
  
        }
      }
    },

  }),

  getters: {
    GetProfile: (state) => state.profile,
  },

  actions: {
    async obtainProfile(id){
      if(id !== undefined){
        const res = await axios.get(`${URL_SANDIAPI}/api/paciente/${id}`);
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

    createProfile(NutritionalProfile){
        this.Profile = NutritionalProfile;
    }
  },
})