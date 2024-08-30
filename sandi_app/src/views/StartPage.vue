<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useConvertersStore, useAuthStore } from "@/stores";

const text = ref("Bienvenidos a Sandi-App")

const authStore = useAuthStore();

const converseStore = useConvertersStore();
const { recognitionText, recordingvoice } = storeToRefs(useConvertersStore());

const logout = () => {
  authStore.logout();
}

onIonViewWillEnter(() => {
  converseStore.PermissionsRecordingVoice();
});
</script>


<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar>
        <ion-title size="large">Inicio</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <IonButton @click="logout()">Cerrar sesión</IonButton>
      <div>{{ text }}</div>
      <div>{{ recognitionText }}</div>
      <div>{{ recordingvoice }}</div>
    </ion-content>
  </ion-page>
</template>
