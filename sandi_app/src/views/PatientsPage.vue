<script setup>
import { IonButton, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePatientsStore } from '@/stores';

const patientsStore = usePatientsStore();

const { patientslist } = storeToRefs(patientsStore);

onIonViewWillEnter(() => {
  patientsStore.ObtainPatients();
});

console.log(patientslist)

</script>


<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Listado de pacientes</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem v-if="patientslist.length == 0">
            <h1>No hay pacientes</h1>
          </IonItem>
          <IonItem v-if="!patientslist.length == 0">
            <IonGrid>
              <IonItem v-for="patient of patientslist" :key="patient.id">
                <IonRow>
                  <IonLabel>{{ patient.name +" " + patient.last_name }} </IonLabel>
                  <IonButton>HOLA</IonButton>
                </IonRow>
              </IonItem>
            </IonGrid>
          </IonItem>
        </IonContent>
    </IonPage>

</template>