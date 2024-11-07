<script setup>
// Importar Componentes IONIC
import { 
  IonPage,
  IonContent, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonInputPasswordToggle,
} from "@ionic/vue";
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { person, lockClosed, alertCircle } from "ionicons/icons";
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref } from 'vue';
// Importar Stores
import { useAuthStore } from "@/stores";
import Swal from "sweetalert2";

// Definir contantes relacionadas al Vue-Router
// Deifinir constantes relacionadas a los Stores
const authStore = useAuthStore();

// Definir variables referenciales o reactivas
const credentials = ref({
  email: '',
  password: ''
});
const errorCredentials = ref({});
const inputRef = ref(null);

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
const SetValue = (value) => {
  credentials.value[value] = event.target.value;
  delete errorCredentials.value[value];
}

/* Realiza login con las credenciales ingresadas en los inputs */
const Login = async () => {
  try{
    await authStore.Login(credentials.value)
    credentials.value = {
      email: '',
      password: ''
    }
  }catch(error){
    if(error.response.data.errors){
      errorCredentials.value = error.response.data.errors;
    }else{
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "#e65a03",
        confirmButtonText: "Aceptar",
        heightAuto: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          credentials.value = {
            email: '',
            password: ''
          }
        }
      });
    }
  }
}
</script>


<template>
  <IonPage>
    <IonContent>
      <div class="flex flex-col justify-center content-center items-center h-screen w-screen overflow-hidden">
          <img
            class="w-4/5 "
            src="@/theme/images/Logo_color_inicio.svg"
          />
          <div class="flex flex-col mt-5 text-xl text-bold items-center">
            <h1>¡Alimenta tu vida con</h1>
            <h1>Sandi-App!</h1>
          </div>
        <div class="flex flex-col gap-2 my-10">
          <div class="flex flex-col">
            <IonInput
              class="border-2 rounded-lg border-light-gray global-input"
              ref="inputRef"
              v-model="credentials.email" 
              type="text" 
              placeholder="Ingrese su correo"
              @ionInput="SetValue('email')"
            >
              <IonIcon class="ps-2" slot="start" :icon="person" />
            </IonInput>
            <p v-if="errorCredentials.email" class="text-xs text-dark-red flex gap-1 items-center">
              <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
              {{ errorCredentials.email[0] }}
            </p>
          </div>
          <div class="flex flex-col">
            <IonInput
              class="border-2 rounded-lg border-light-gray global-input"
              ref="inputRef"
              v-model="credentials.password" 
              type="password" 
              placeholder="Ingrese su contraseña"
              @ionInput="SetValue('password')"
            >
              <IonIcon class="ps-2" slot="start" :icon="lockClosed" />
              <IonInputPasswordToggle class="eyeIcon" slot="end"></IonInputPasswordToggle>
            </IonInput>
            <p v-if="errorCredentials.password" class="text-xs text-dark-red flex gap-1 items-center">
              <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
              {{ errorCredentials.password[0] }}
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <IonButton size="small" @click="Login()">Iniciar Sesión</IonButton>
          <a class="text-sm text-dark-red" href="/recuperar-contrasena">¿Has olvidado tu contraseña?</a>
        </div>
        <h1 class="mt-3 text-sm flex gap-x-1">¿No tienes una cuenta?<a class="text-sm text-dark-red" href="/registro">Registrate aquí</a></h1>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-button{
  --background: var(--dark-red);
}

ion-input-password-toggle{
  --background: var(--dark-red);
}

ion-input .input-password-toggle-icon {
  color: var(--dark-red); /* Cambia este color al que desees */
}

.eyeIcon{
  --ion-color-primary: var(--dark-red)
}

</style>
