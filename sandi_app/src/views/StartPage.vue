<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { ref } from 'vue'
import { useConvertersStore } from "@/stores";

const text = ref("Bienvenidos a Sandi-App")

const converseStore = useConvertersStore();

onIonViewWillEnter(() => {
  text.value = "Funciona bien la funcion"
  converseStore.PermissionsRecordingVoice();
  converseStore.startContinuousRecognition();
});

onIonViewWillLeave(() => {
  converseStore.stopContinuousRecognition();
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
      {{ text }}
    </ion-content>
  </ion-page>
</template>
