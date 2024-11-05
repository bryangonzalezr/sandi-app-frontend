<script setup>
// Importar Componentes IONIC
import { 
  IonContent, 
  IonPage, 
  IonGrid, 
  IonItem, 
  IonInput, 
  IonTitle, 
  IonSelect, 
  IonSelectOption, 
  IonButton,
  IonSpinner
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useAuthStore } from '@/stores';

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const authStore = useAuthStore();
const { register } = storeToRefs(authStore);

// Definir variables referenciales o reactivas
const isloading = ref(false);


// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a AuthLogin.vue */
const goToLogin = () => {
  router.push({ name: 'Login'})
}

/* Realiza el registro con las credenciales ingresadas en los inputs */
const Register = async () => {
  isloading.value = true;
  await registerStore.Register().then(() => {
    isloading.value = false;
  })
};

</script>

<template>
  <IonPage>
    <div class="flex flex-col h-screen w-screen p-5 justify-center items-center">
      <template v-if="!isloading">
        <div class="grid grid-col self-center bg-light-red rounded-lg px-3">
          <IonTitle class="pt-5 text-center">¡Bienvenido!</IonTitle>
          <h1 class="text-xs text-center mx-10 pb-3">Completa los siguientes datos para crear tu usuario</h1>
          <div class="grid grid-col grid-cols-2 gap-2">
            <IonInput v-model="register.name" label="Nombre" label-placement="stacked" type="text" placeholder="Nombre"></IonInput>
            <IonInput v-model="register.last_name" label="Apellido" label-placement="stacked" type="text" placeholder="Apellido"></IonInput>
          </div>
          <div class="grid grid-col grid-cols-2 gap-2">
            <IonSelect v-model="register.sex" label="Sexo" label-placement="stacked" placeholder="Sexo">
              <IonSelectOption value="Masculino">Masculino</IonSelectOption>
              <IonSelectOption value="Femenino">Femenino</IonSelectOption>
            </IonSelect>
            <IonSelect v-model="register.civil_status" label="Estado civil" label-placement="stacked" placeholder="Estado civil">
              <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
              <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
              <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
              <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
              <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
            </IonSelect>
          </div>
          <div class="grid grid-col grid-cols-2 gap-2">
            <IonInput v-model="register.email" label="Correo" label-placement="stacked" type="text" placeholder="Correo"></IonInput>
            <IonInput v-model="register.phone_number" label="Número de telefono" label-placement="stacked" type="text" placeholder="Número"></IonInput>
          </div>
          <IonInput v-model="register.birthdate" label="Fecha de nacimiento" label-placement="stacked" type="date"></IonInput>
          <IonInput v-model="register.password" label="Contraseña" label-placement="stacked" type="text" placeholder="Contraseña"></IonInput>
          <IonInput v-model="register.password_confirmation" label="Confirmar contraseña" label-placement="stacked" type="text" placeholder="Confirmar contraseña"></IonInput>
          <IonInput v-model="register.objectives" label="Objetivos" label-placement="stacked"  placeholder="Ingresa tus objetivos"></IonInput>
          <IonButton @click="Register()" class="px-20 pt-5">Registrar</IonButton>
          <h1 class="my-3 text-sm text-center ">¿Ya tienes una cuenta? <a class="text-sm text-dark-red" href="/login">Ingresa aquí</a></h1>
        </div>
      </template>
      <template v-else>
        <IonSpinner color="success"></IonSpinner>
      </template>
    </div>
  </IonPage>
</template>

<style scoped>
  ion-button{
    --background: var(--dark-red);
  }
</style>

