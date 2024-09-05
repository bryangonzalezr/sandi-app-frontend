import { APIAxios } from "./baseURL";
import { defineStore } from "pinia";

export const usePatientProfileStore = defineStore('patientProfile', {
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
      habits: {
        alcohol: '',
        tabaco: ''
      },
      allergies: [],
      nutritional_anamnesis: {
        plan_anterior: '',
        agua: ''
      },
      morbid_antecedents: {
        dm2: false,
        hta: false,
        insulin_resistance: false,
        tiroides: false,
        dislipidemia: false,
        cirugias: '',
        farmacos: '',
        exams: '',
        otros: [],
      },
      family_antecedents: {
        dm2: false,
        hta: false,
        tiroides: false,
        dislipidemia: false,
        comments: '',
      },
      subjective_assessment: {
        usual_weight: '',
        gastrointestinal_symptoms: '',
        weight_variation: '',
        appetite: '',
        digestion: '',
        digestion_frequency: '',
        digestion_measures: '',
      }
    },
    profile_id: '',
  }),

  actions: {
    async updatePatientProfile(){
      console.log(this.data);
      const res = await APIAxios.put(`/api/perfil-nutricional/${this.profile_id}`, this.data);
    },

    async obtainPatientProfile(id){
      if(id !== undefined){
        const res = await APIAxios.get(`/api/paciente/${id}`);
        console.log(res.data);
        this.profile_id = res.data.data.nutritional_profile._id;
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
        this.data.physical_comentario = res.data.data.nutritional_profile.physical_comentario;
        this.data.physical_status = res.data.data.nutritional_profile.physical_status;
        this.data.habits.alcohol = res.data.data.nutritional_profile.habits.alcohol;
        this.data.habits.tabaco = res.data.data.nutritional_profile.habits.tabaco;
        this.data.allergies = res.data.data.nutritional_profile.allergies;
        this.data.nutritional_anamnesis.plan_anterior = res.data.data.nutritional_profile.nutritional_anamnesis.plan_anterior;
        this.data.nutritional_anamnesis.agua = res.data.data.nutritional_profile.nutritional_anamnesis.agua;
        this.data.morbid_antecedents.dm2 = res.data.data.nutritional_profile.morbid_antecedents.dm2;
        this.data.morbid_antecedents.hta = res.data.data.nutritional_profile.morbid_antecedents.hta;
        this.data.morbid_antecedents.insulin_resistance = res.data.data.nutritional_profile.morbid_antecedents.insulin_resistance;  
        this.data.morbid_antecedents.tiroides = res.data.data.nutritional_profile.morbid_antecedents.tiroides;
        this.data.morbid_antecedents.dislipidemia = res.data.data.nutritional_profile.morbid_antecedents.dislipidemia;
        this.data.morbid_antecedents.cirugias = res.data.data.nutritional_profile.morbid_antecedents.cirugias;
        this.data.morbid_antecedents.farmacos = res.data.data.nutritional_profile.morbid_antecedents.farmacos;
        this.data.morbid_antecedents.exams = res.data.data.nutritional_profile.morbid_antecedents.exams;
        this.data.morbid_antecedents.otros = res.data.data.nutritional_profile.morbid_antecedents.otros;
        this.data.family_antecedents.dm2 = res.data.data.nutritional_profile.family_antecedents.dm2;
        this.data.family_antecedents.hta = res.data.data.nutritional_profile.family_antecedents.hta;
        this.data.family_antecedents.tiroides = res.data.data.nutritional_profile.family_antecedents.tiroides;
        this.data.family_antecedents.dislipidemia = res.data.data.nutritional_profile.family_antecedents.dislipidemia;
        this.data.family_antecedents.comments = res.data.data.nutritional_profile.family_antecedents.comments;
        this.data.subjective_assessment.usual_weight = res.data.data.nutritional_profile.subjective_assessment.usual_weight;
        this.data.subjective_assessment.gastrointestinal_symptoms = res.data.data.nutritional_profile.subjective_assessment.gastrointestinal_symptoms;
        this.data.subjective_assessment.weight_variation = res.data.data.nutritional_profile.subjective_assessment.weight_variation;
        this.data.subjective_assessment.appetite = res.data.data.nutritional_profile.subjective_assessment.appetite;
        this.data.subjective_assessment.digestion = res.data.data.nutritional_profile.subjective_assessment.digestion;
        this.data.subjective_assessment.digestion_frequency = res.data.data.nutritional_profile.subjective_assessment.digestion_frequency;
        this.data.subjective_assessment.digestion_measures = res.data.data.nutritional_profile.subjective_assessment.digestion_measures;
      }
    }
  }
})