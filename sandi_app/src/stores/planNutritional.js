import { APIAxios } from "./baseURL";
import { defineStore  } from "pinia";

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plan_nutritional: {},
    requirements: {},
    indicadores: {},
    portions: {},
    portionsServices: {},
    pauta: {},
    plans_filed: [],
  }),

  getters: {
    GetPlansfiled: (state) => state.plans_filed.data.data,
    GetPlan: (state) => state.plan_nutritional,
    GetRequirements: (state) => state.requirements,
    GetIndicadores: (state) => state.indicadores,
    GetPortions: (state) => state.portions,
    GetPortionsServices: (state) => state.portionsServices,
    GetPauta: (state) => state.pauta,
  },

  actions: {
    async ObtainPlanfiled (date) {
        try{
            const res = await APIAxios.get(`/api/planes-nutricionales`, { params : { fecha_creacion: date}});
            this.plans_filed = res;
        }catch(err){
            return err
        }
    },

    async Requeriments(requirements) {
        try{
            const res = await APIAxios.post(`/api/requerimiento-nutricional` , requirements);
            this.requirements = res;
        }catch(err){
            return err
        }
    },

    async ObtainRequeriments(id) {
        try{
            const res = await APIAxios.get(`/api/requerimiento-nutricional/${id}`);
            this.requirements = res;
        }catch(err){
            return err
        }
    },

    async Indicadores() {
        try{
            const res = await APIAxios.get(`/api/indicadores-alimentos`);
            this.indicadores = res;
        }catch(err){
            return err
        }
    },

    async Portions(portions){
        try{
            const res = await APIAxios.post(`/api/porcion`, portions);
            this.portions = res;
        }catch(err){
            return err
        }
    },

    async ObtainPortions(id) {
        try{
            const res = await APIAxios.get(`/api/porcion/${id}`);
            this.portions = res;
        }catch(err){
            return err
        }
    },

    async PortionsServices(PortionsServices) {
        try{
            const res = await APIAxios.post(`/api/porcion-servicio`, PortionsServices);
            this.portionsServices = res;
        }catch(err){
            return err
        }
    },

    async ObtainPortionsServices(id) {
        try{
            const res = await APIAxios.get(`/api/porcion-servicio/${id}`);
            this.portionsServices = res;
        }catch(err){
            return err
        }
    },

    async Pauta(pauta){
        try{
            const res = await APIAxios.post(`/api/plan-nutricional`, pauta);
            this.pauta = res;
        }catch(err){
            return err
        }
    },

    async ObtainPauta(id) {
        try{
            const res = await APIAxios.get(`/api/plan-nutricional/${id}`);
            this.pauta = res;
        }catch(err){
            return err
        }
    },
  },
})