<script setup>
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/vue";
import {  } from "ionicons/icons";
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
      <IonInput v-model="credentials.email" type="text" placeholder="Ingrese su correo"/>
      <IonInput v-model="credentials.password" type="text" placeholder="Ingrese su contraseña"/>
      <IonButton @click="login()">Iniciar Sesión</IonButton>

      <div>
        {{ data }}
      </div>
    </IonContent>
  </IonPage>
</template>