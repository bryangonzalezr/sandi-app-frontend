<script setup>
import { 
  IonPage,
  IonContent, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonIcon 
} from "@ionic/vue";
import { person, lockClosed } from "ionicons/icons";
import {  } from "pinia";
import {  } from "@/stores";
import { ref } from 'vue';
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

const credentials = ref({
  email: '',
  password: ''
});

const data = ref({})

const login = async () => {
  if(credentials.value.email != '' && credentials.value.password != ''){
    data.value = await authStore.login(credentials.value)
  }
}

</script>


<template>
  <IonPage>
    <IonContent>
      <div class="grid justify-center content-center items-center h-screen w-screen">
        <IonItem>
          <IonInput v-model="credentials.email" type="text" placeholder="Ingrese su correo">
            <IonIcon slot="start" :icon="person" />
          </IonInput>
        </IonItem>
        <IonItem >
          <IonInput v-model="credentials.password" type="text" placeholder="Ingrese su contraseña">
            <IonIcon slot="start" :icon="lockClosed" />
          </IonInput>
        </IonItem>
        <IonButton size="small" @click="login()">Iniciar Sesión</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

