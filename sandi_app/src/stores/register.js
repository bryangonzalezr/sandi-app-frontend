import { APIAxios } from "./baseURL";
import router from "@/router";
import { defineStore } from "pinia";

const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

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
            const res = await APIAxios.post(`api/register`, this.register)
            .then(
                router.push({name: 'Login'})
            )
            .catch(
                console.log("Error en el registro")
            );
        }
    }
})