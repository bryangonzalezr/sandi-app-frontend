<script setup>
import { 
    IonPage,
    IonInput,
    IonTitle,
    IonButton,
    IonSpinner
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const router = useRouter();

const isloading = ref(false);
const form = ref({})

const goToLogin = () => {
  router.push({ name: 'Login'})
}

const ForwordPass = async () => {
  isloading.value = true;
  await authStore.ForgotPassword(form.value.email).then(() => {
    isloading.value = false;
  })
};

</script>

<template>
    <IonPage>
        <div class="flex flex-col items-center p-5 gap-y-3 justify-center h-screen w-screen">
            <template v-if="!isloading">
                <img
                  class="w-4/5"
                  src="@/theme/images/Sandi_sirviendo.svg"
                />
                <div class="grid grid-col gap-y-2 self-center bg-dark-red rounded-lg p-4">
                  <IonTitle class="text-center text-white">Recuperar Contraseña</IonTitle>
                  <h1 class="text-xs text-center text-white">Ingresa tu correo para recibir una contraseña nueva</h1>
                  <div class="flex flex-col gap-2">
                      <IonInput 
                          class="border-b border-b-white text-white"
                          v-model="form.email" 
                          label="Correo" 
                          label-placement="stacked" 
                          type="text" 
                          placeholder="Correo"
                      ></IonInput>
                  </div>
                </div>
                <div class="flex flex-col">
                    <IonButton @click="ForwordPass()" class="px-20 pt-5">Enviar</IonButton>
                    <h1 class="my-3 text-sm text-center ">¿Ya tienes una cuenta? <a class="text-sm text-dark-red" @click="goToLogin">Iniciar Sesión</a></h1>
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

  ion-input{
    --highlight-color-focused: var(--light);
  }
</style>