<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonButton } from '@ionic/vue';
import { useConvertersStore, useAuthStore } from "@/stores";

const authStore = useAuthStore();
const converseStore = useConvertersStore();

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
    </ion-content>
  </ion-page>
</template>
