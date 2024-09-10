import { APIAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from "pinia";

export const useRegisterStore = defineStore('register', {
    state: () => ({
        register: {
            name: '',
            last_name: '',
            sex: '',
            birthdate: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone_number: '',
            civil_status: '',
            objectives: '',
            role: ''
        }
    }),

    actions: {
        async viewRegister() {
            console.log(this.register);
        },

        async RegisterUser() {
            try{
                await APIAxios.post(`api/register`, this.register)
                router.push({name: 'Login'})
            }catch(err){
                return err
            }
        }
    }
})