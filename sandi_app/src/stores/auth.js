import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const URL_SANDIAPI = import.meta.env.VITE_SANDIAPI_URL;

export const useAuthStore = defineStore('auth', {
        state: () => ({
            user: JSON.parse(localStorage.getItem("user")) || null, // Aquí se guarda los datos del usuario logueado
            returnUrl: null,
            roles: JSON.parse(localStorage.getItem("roles")) || null,
            isLoading: false,
        
        }),
    
        getters: {
            // Esto es para saber si el usuario esta logueado
            isAuth: (state) => state.user !== null,
            userInfo: (state) => state.user,
            permissionList: (state) => state.permission,
            ipsipInfo: (state) => state.ipsip,
        },
    
        actions: {
            async getToken() {
                await axios.get(`${URL_SANDIAPI}/sanctum/csrf-cookie`)
            },

            async login(credentials){
                try{
                    // Obtiene el token
                    await this.getToken();
                    console.log("paso el token")
                    // Hace el login
                    const data = await axios.post(`${URL_SANDIAPI}/login`, credentials);
                    console.log("paso el login")

                    return data.data
                }catch(error){
                    console.error(error)
                    return { 'error': error.message }
                }
            }

        },

    },
)