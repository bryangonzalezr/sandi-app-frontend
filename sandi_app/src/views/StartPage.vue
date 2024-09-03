<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonButton } from '@ionic/vue';
import { useConvertersStore, useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const converseStore = useConvertersStore();

/* const patientsStore = usePatientsStore(); */

const logout = () => {
  authStore.logout();
}

const ShowProgress = async (idPatient) => {
  router.push({name: 'PatientProgress', params: {id: idPatient}});
  /* console.log(patientsStore.patientslist)
  await patientsStore.ShowProgress(patientId); */
}

const CreatePlan = async (idPatient) => {
  router.push({name: 'PatientPlanCreate', params: {id: idPatient}});
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
      <IonButton @click="ShowProgress(3)">Ver progreso de paciente 3</IonButton>
      <IonButton @click="CreatePlan(3)">Crear Plan Nutricional paciente 3</IonButton>
    </ion-content>
  </ion-page>
</template>
