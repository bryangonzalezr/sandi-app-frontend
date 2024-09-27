import { defineStore } from "pinia";
import router from "@/router";
import { APIAxios } from "./baseURL";




export const useAuthStore = defineStore('auth', {
        state: () => ({
            user: JSON.parse(localStorage.getItem("user")) || null, // Aquí se guarda los datos del usuario logueado
            rolUser: JSON.parse(localStorage.getItem("rolUser")) || null,
            roles: JSON.parse(localStorage.getItem("roles")) || null,
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
            },
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

            async SessionUser() {
                const data = await APIAxios.get("/api/check-session").catch(() => {
                  return false;
                });
          
                return data;
            },

            async ShowRoles() {
                const data = await APIAxios.get(`/api/roles`);
                return data.data;
            },

            async Login(credentials){
                try{
                    // Hace el login
                    const data = await APIAxios.post(`/api/login`, credentials);
                    localStorage.setItem("authToken", data.data.token);
                    APIAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
                    const user = data.data.user
                    const role = user.role

                    let roles = [];
                    try {
                      roles = await this.ShowRoles();
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

                    router.push( {name: 'Home'});
                }catch(err){
                    return err
                }
            },

            async Logout(){
                try{
                    this.user = null
                    localStorage.removeItem("user");
                    localStorage.removeItem("rolUser");
                    localStorage.removeItem("roles");
                    localStorage.removeItem("lastPath");
                    localStorage.getItem('authToken');
                    router.push({name: 'Login'});

                    await APIAxios.post(`/api/logout`);
                    console.log("se cerro sesión")
                }catch(error){
                    return { 'error': error.message }
                }
            },

            async ShowRegister() {
                console.log(this.register);
            },
    
            async Register() {
                try{
                    await APIAxios.post(`api/register`, this.register)
                    router.push({name: 'Login'})
                }catch(err){
                    return err
                }
            }

        },

    },
)