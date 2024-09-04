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
  onIonViewWillEnter, 
  IonInput} from '@ionic/vue';
import { eye, trash, add, close } from 'ionicons/icons';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { usePatientsStore } from '@/stores';

const router = useRouter();

const patientRegister = ref();

const patientsStore = usePatientsStore();
const { patientslist } = storeToRefs(patientsStore);

const deletePatients = ref(false)
const isOpenAlert = ref(false)
const selectedPatiet = ref(null)
const headerAlert = ref('')

const ViewPatient = (idPatient) => {
  // Lógica para ir a vista de información y gestión del paciente
  router.push({name: 'PatientProfile', params: {id: idPatient}});
}

// Función para boton "Eliminar paciente" para evitar errores de parte del usuario
const DeleteBool = () => {
  deletePatients.value = !deletePatients.value;
}

// Función para abrir alerta de confirmación al presionar el botón de icono tash
const OpenAlert = (Patient) => {
  selectedPatiet.value = Patient;
  headerAlert.value = `¿Estas seguro de eliminar a ${Patient.name} ${Patient.last_name}?`
  isOpenAlert.value = true;
}

// Botones de IonAlert
const alertButtons = [
  {
    text: 'Confirmar',
    role: 'confirmar'
  },
  {
    text: 'Cancelar',
    role: 'cancel'
  }
];

// Función de IonAlert que en base a que boton se apreta (role) se elimina(afiliación) o no un paciente 
const logResult = (ev) => {
  if(ev.detail.role == 'confirmar'){
    patientsStore.RemovePatient(selectedPatiet.value.id);
    console.log(`Se confirme la eliminación de ${selectedPatiet.value.id}`);
    isOpenAlert.value = false;
    selectedPatiet.value = null;
    headerAlert.value = ''
  }else{
    // No pasa nada
    isOpenAlert.value = false;
    selectedPatiet.value = null;
    headerAlert.value = ''
  }
};

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
                    <IonInput v-model="patientRegister" type="email" label="Paciente email" label-placement="stacked" placeholder="Ingresa email de paciente"></IonInput>
                    <IonButton @click="patientsStore.AssociatePatient(patientRegister)" :disabled="deletePatients" expand="block">
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
                    <IonButton size="small" @click="ViewPatient(patient.id)">
                      <IonIcon aria-hidden="true" :icon="eye" slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton size="small" v-if="deletePatients" @click="OpenAlert(patient)">
                      <IonIcon aria-hidden="true" :icon="trash" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonItem>
            </template>
          </IonList>
          <IonAlert
            :is-open="isOpenAlert"
            :header="headerAlert"
            :buttons="alertButtons"
            @didDismiss="logResult($event)"
          ></IonAlert>
        </IonContent>
    </IonPage>

</template>