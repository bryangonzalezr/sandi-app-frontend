<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonButton } from '@ionic/vue';
import { useConvertersStore, useAuthStore } from "@/stores";

const authStore = useAuthStore();
const converseStore = useConvertersStore();

const Logout = async () => {
  await authStore.Logout();
}

onIonViewWillEnter(() => {
  converseStore.PermissionsRecordingVoice();
});
</script>


<template>
  <IonPage>
    <IonHeader :translucent="true" >
      <IonToolbar>
        <IonTitle size="large">Inicio</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonButton @click="Logout()">Cerrar sesión</IonButton>
    </IonContent>
  </IonPage>
</template>
