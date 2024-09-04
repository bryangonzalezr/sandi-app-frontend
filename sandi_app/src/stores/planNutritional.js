import { APIAxios } from "./baseURL";
import { defineStore  } from "pinia";

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plan_nutritional: {},
    requirements: {},
  }),

  getters: {
    GetPlan: (state) => state.plan_nutritional,
    GetRequirements: (state) => state.requirements,
  },

  actions: {
    async Requeriments(requirements) {
        try{
            const res = await APIAxios.post(`/api/requerimiento-nutricional` , requirements);
            this.requirements = res;
        }catch(err){
            return err
        }
    },
  },
})