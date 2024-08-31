<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonButton } from '@ionic/vue';
import { useConvertersStore, useAuthStore } from "@/stores";
import { Bar } from 'vue-chartjs'

const authStore = useAuthStore();

const converseStore = useConvertersStore();

const chartData = {
  labels: ["2020", "2021", "2022", "2023"],
  datasets: [
    {
      label: "Dato 1",
      backgroundColor: "#4791FF",
      data: [30, 20, 15, 25, 30],
    },
    {
      label: "Dato 2",
      backgroundColor: "#FF2366",
      data: [5, 15, 10, 20, 25],
    },
    {
      label: "Dato 3",
      backgroundColor: "#02BC77",
      data: [8, 18, 12, 22, 28],
    },
    {
      label: "Dato 4",
      backgroundColor: "#FFD950",
      data: [12, 22, 17, 27, 35],
    },
  ],
};
const chartOptions = {
  responsive: true
}

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
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </ion-content>
  </ion-page>
</template>
