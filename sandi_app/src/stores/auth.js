import { defineStore } from "pinia";
import router from "@/router";
import { APIAxios } from "./baseURL";
import Swal from "sweetalert2";

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
                await APIAxios.post(`/api/login`, credentials).then(async (data) => {
                    const user = data.data.user
                    const role = user.role
                    if(role == 'nutricionista'){
                        Swal.fire({
                            title: "ACCESO RESTRINGIDO",
                            text: "Tu cuenta solo puede iniciar sesión desde la aplicación web. Por favor, ingresa desde nuestra página para continuar.",
                            icon: "error",
                            confirmButtonColor: "#e65a03",
                            confirmButtonText: "Aceptar",
                            heightAuto: false,
                          });
                    }else{
                        localStorage.setItem("authToken", data.data.token);
                        APIAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
                        let roles = [];
                        try {
                          roles = await this.ShowRoles();
                        } catch (err) {
                            console.error(err);
                        }
                        this.user = user;
                        this.rolUser = role;
                        this.roles = roles.data;
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("rolUser", JSON.stringify(role))
                        localStorage.setItem("roles", JSON.stringify(roles))
                        if(user.password_reset){
                            router.push( {name: 'ProfileChangePass'});
                        }else{
                            router.push( {name: 'Home'});
                        }
                    }
                })
                
                
            },

            async Logout(){
                try{
                    this.user = null
                    localStorage.removeItem("user");
                    localStorage.removeItem("rolUser");
                    localStorage.removeItem("roles");
                    localStorage.removeItem("lastPath");
                    localStorage.removeItem('authToken');
                    router.push({name: 'Login'});
                    await APIAxios.post(`/api/logout`);
                }catch(error){
                    return { 'error': error.message }
                }
            },
    
            async Register() {
                this.register.role = 'usuario_basico'
                await APIAxios.post(`api/register`, this.register)
                router.push({name: 'Login'})
            },

            async ForgotPassword(email) {
                await APIAxios.post(`/api/forgot-password`,  {'email': email}).then(() => {
                    Swal.fire({
                        title: "¡Listo!",
                        text: "Te hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.",
                        icon: "success",
                        confirmButtonColor: "#e65a03",
                        confirmButtonText: "Aceptar",
                        heightAuto: false,
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        router.push({name: 'Login'})
                      }
                    });
                })
            },

            async ChangePassword(form){
                form.email = this.user.email
                await APIAxios.post(`/api/reset-password`, form).then((res) => {
                    Swal.fire({
                        title: "Se ha cambiado tu contraseña",
                        text: "Recuerda que al iniciar sesión debes usar la contraseña nueva.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                        heightAuto: false,
                    })
                    router.push({name: 'Home'})
                })
            }

        },

    },
)