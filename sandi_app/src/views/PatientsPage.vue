<script setup>
import { 
  IonButton, 
  IonContent, 
  IonList, 
  IonHeader, 
  IonListHeader, 
  IonGrid, 
  IonCol, 
  IonRow, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonAlert, 
  onIonViewWillEnter } from '@ionic/vue';
import { eye, trash, add, close } from 'ionicons/icons';
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { usePatientsStore } from '@/stores';

const patientsStore = usePatientsStore();
const { patientslist } = storeToRefs(patientsStore);

const deletePatients = ref(false)
const isOpenAlert = ref(false)

const DeleteBool = () => {
  deletePatients.value = !deletePatients.value;
}

const OpenAlert = () => {
  isOpenAlert.value = true;
}

const alertButtons = [
    {
      text: 'Confirmar',
      role: 'confirmar',
      handler: () => {
        // logica de borrado
        console.log('Alert confirmed');
        isOpenAlert.value = false;
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        // no pasa nada
        isOpenAlert.value = false;
      },
    }
  ];

onIonViewWillEnter(() => {
  patientsStore.ObtainPatients();
});

console.log(patientslist)

</script>


<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Gestión de Pacientes</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonLabel>
                    <h1>Acciones</h1>
                  </IonLabel>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton :disabled="deletePatients" expand="block">
                      <IonIcon aria-hidden="true" :icon="add" slot="icon-only" ></IonIcon>
                      Agregar Paciente
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton @click="DeleteBool()" expand="block" v-if="!deletePatients">
                      <IonIcon aria-hidden="true" :icon="trash" slot="icon-only"></IonIcon>
                      Eliminar Paciente
                    </IonButton>
                    <IonButton @click="DeleteBool()" expand="block" v-if="deletePatients">
                      <IonIcon aria-hidden="true" :icon="close" slot="icon-only"></IonIcon>
                      Cancelar eliminación
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          <IonList>
            <IonListHeader>
              <IonLabel>
                Listado de pacientes
              </IonLabel>
            </IonListHeader>
            <IonItem v-if="patientslist.length == 0">
              <h1>No hay pacientes</h1>
            </IonItem>
            <template v-if="!patientslist.length == 0">
                <IonItem v-for="patient of patientslist" :key="patient.id">
                    <IonLabel>{{ patient.name +" " + patient.last_name }} </IonLabel>
                    <IonButton size="small">
                      <IonIcon aria-hidden="true" :icon="eye" slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton size="small" v-if="deletePatients" @click="OpenAlert()">
                      <IonIcon aria-hidden="true" :icon="trash" slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonAlert
                      :is-open="isOpenAlert"
                      header="Alert!"
                      :buttons="alertButtons"
                      @didDismiss="logResult($event,patient.id)"
                    ></IonAlert>
                </IonItem>
            </template>
          </IonList>
        </IonContent>
    </IonPage>

</template>