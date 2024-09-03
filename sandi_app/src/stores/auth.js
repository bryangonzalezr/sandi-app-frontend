import { defineStore } from "pinia";
import router from "@/router";
import { APIAxios } from "./baseURL";


export const useAuthStore = defineStore('auth', {
        state: () => ({
            user: JSON.parse(localStorage.getItem("user")) || null, // Aquí se guarda los datos del usuario logueado
            rolUser: JSON.parse(localStorage.getItem("rolUser")) || null,
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

            async getRoles() {
                const data = await APIAxios.get(`/api/roles`);
                return data.data;
            },

            async login(credentials){
                try{
                    // Hace el login
                    const data = await APIAxios.post(`/api/login`, credentials);
                    APIAxios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
                    const user = data.data.user
                    const role = user.role

                    let roles = [];
                    try {
                      roles = await this.getRoles();
                    } catch (err) {
                        console.error(err);
                    }

                    this.user = user;
                    this.rolUser = role;
                    this.roles = roles.data;

                    console.log(this.user)
                    console.log(this.rolUser)
                    console.log(this.roles)

                    localStorage.setItem("user", JSON.stringify(user))
                    localStorage.setItem("rolUser", JSON.stringify(role))
                    localStorage.setItem("roles", JSON.stringify(roles))
                    
                    const lastPath = localStorage.getItem("lastPath");

                    router.push( lastPath || {name: 'Home'});
                    
                }catch(error){
                    console.error(error)
                    return { 'error': error.message }
                }
            },

            async logout(){
                try{
                    this.user = null
                    localStorage.removeItem("user");
                    localStorage.removeItem("lastPath");
                    router.push({name: 'Login'});

                    await APIAxios.post(`/api/logout`);
                    console.log("se cerro sesión")
                }catch(error){
                    console.error(error)
                    return { 'error': error.message }
                }
            },

        },

    },
)