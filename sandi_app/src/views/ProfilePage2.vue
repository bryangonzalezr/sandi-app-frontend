<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons, 
  IonBackButton, 
  IonItem, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonGrid, 
  IonRow, 
  IonCard, 
  IonCardHeader, 
  IonCheckbox,
  onIonViewWillEnter } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePatientProfileStore } from "@/stores";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

const patientProfileStore = usePatientProfileStore();
const { data } = storeToRefs(patientProfileStore);

const ejercicio = ref('');
const editProfile = ref(false);

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

const returnToPatients = () =>{
  router.push({ name: "Patients"})
};

const CreateConsult = (idPatient) => {
  router.push({name: 'ConsultPage', params: {id:idPatient}});
}

onIonViewWillEnter(() => {
  if(props.id !== undefined){
    patientProfileStore.obtainPatientProfile(props.id);
  }
});

const newProfile = ref({ 
  nombre: '', 
  fechaNacimiento: '',
  edad: 0,
  sexo: '', 
  peso: 0, 
  intolerancias: '', 
  tabaco: '',
  alcohol: '',
  estatura: 0,
  imc: 0,
  tipo_actividad: '',
  nivel_actividad: '',
  agua: '',
  seguimiento_planes: '',
  });

const saveData = () => {
  newProfile.value.imc = newProfile.value.peso / (newProfile.value.estatura * newProfile.value.estatura)
  profileStore.CreateProfile(newProfile.value);
  console.log(Profile);
};

</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton @click="returnToPatients()" :icon="chevronBack">Hola</IonBackButton>
        </IonButtons>
        <IonTitle>Paciente {{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
    <IonButton @click="CreateConsult($route.params.id)" class="mx-5">Agregar Consulta Paciente {{ $route.params.id }}</IonButton>
    <IonCard color="success">
      <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
        <h1>Antecedentes Personales</h1>
        <IonButton color="dark" @click="editProfileToggle()" size="small" fill="outline">Editar</IonButton>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-3 gap-2 justify-center content-center items-center">
          <IonInput v-model="data.name" label="Nombre" label-placement="stacked" placeholder="Ingrese su nombre" :readonly="!editProfile"></IonInput>
          <IonInput v-model="data.last_name" label="Apellido" label-placement="stacked" placeholder="Ingrese su apellido" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonSelect v-model="data.sex" label="Sexo" label-placement="stacked" placeholder="Selecciona tu sexo">
              <IonSelectOption value="Masculino">Masculino</IonSelectOption>
              <IonSelectOption value="Femenino">Femenino</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.sex" label="Sexo" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <IonInput v-model.number="data.age" placeholder="Ingrese su edad" label="Edad" label-placement="stacked" type="number" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonInput v-model="data.birthdate" label="Fecha de nacimiento" label-placement="stacked" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.birthdate" label="Fecha de nacimiento" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <template>
            <IonInput v-model="data.civil_status" label="Estado civil" label-placement="stacked"></IonInput>
          </template>
          <template>

          </template>
          <IonInput v-model="data.phone_number" label="Número de telefono" label-placement="stacked" :readonly="!editProfile"></IonInput>
          <IonInput v-model="data.objectives" label="Objetivos" label-placement="stacked" placeholder="Ingresa tus objetivos" :readonly="!editProfile"></IonInput>
          
        </IonGrid>
      </IonItem>
      <IonCardHeader>
        <h1>Hábitos y anamnensis alimentaria</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonSelect v-model="newProfile.alcohol" label="Consumo de alcohol" label-placement="stacked" placeholder="Frecuencia">
            <IonSelectOption value="No">No</IonSelectOption>
            <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
            <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
            <IonSelectOption value="Ambos">Ambos</IonSelectOption>
          </IonSelect>
          <IonSelect v-model="newProfile.tabaco" label="Consumo de tabaco" label-placement="stacked" placeholder="Frecuencia">
            <IonSelectOption value="No">No</IonSelectOption>
            <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
            <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
            <IonSelectOption value="Ambos">Ambos</IonSelectOption>
          </IonSelect>
          <IonSelect v-model="newProfile.seguimiento_planes" label="¿Has seguido planes con anterioridad?" label-placement="stacked"placeholder="Selecciona una opcion">
            <IonSelectOption value="nunca">Nunca</IonSelectOption>
            <IonSelectOption value="si">Si</IonSelectOption>
          </IonSelect>
          <IonSelect v-model="newProfile.agua" label="Consumo de agua" label-placement="stacked" placeholder="Selecciona consumo">
            <IonSelectOption value="baja">Bajo consumo</IonSelectOption>
            <IonSelectOption value="media">Medio consumo</IonSelectOption>
          </IonSelect>
          <IonSelect v-model="ejercicio" label="¿Realizas actividades físicas?" label-placement="stacked" placeholder="Selecciona opción">
            <IonSelectOption value="Si">Si</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
          <IonRow>
            <template v-if="ejercicio == 'Si'">
              <IonRow>
                <label>¿Hace cuanto tiempo realizas actividad fisica?</label>
                <IonInput placeholder="Ingresa el tiempo"></IonInput>
              </IonRow>
              <IonRow>
                <label>Frecuencia de actividad fisica</label>
                <IonSelect v-model="newProfile.nivel_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="moderada">1-2 veces a la semana</IonSelectOption>
                  <IonSelectOption value="pesada">3-5 veces a la semana</IonSelectOption>
                </IonSelect>
              </IonRow>
              <IonRow>
                <label>Duracion del entrenamiento</label>
                <IonInput placeholder="Ingresa una duracion"></IonInput>
              </IonRow>
              <IonRow>
                <label>Tipo de entrenamiento</label>
                <IonSelect v-model="newProfile.tipo_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="leve">Cardio</IonSelectOption>
                  <IonSelectOption value="moderada">Pesas</IonSelectOption>
                </IonSelect>
              </IonRow>
          </template>
          </IonRow>
          <IonInput v-model="newProfile.intolerancias" label="Intolerancia o alergias" label-placement="stacked" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard color="warning">
      <IonCardHeader>Antecedentes Morbidos</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox>Diabetes tipo 2</IonCheckbox>
          <IonCheckbox>Insulino resistencia</IonCheckbox>
          <IonCheckbox>Hipertension arterial</IonCheckbox>
          <IonCheckbox>Tiroides</IonCheckbox>
          <IonCheckbox>Dislpidemia</IonCheckbox>
          <div></div>
          <IonInput label="Otros antecedentes" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput> 
          <IonInput label="Cirugias" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
          <IonInput label="Farmacos" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
          <IonInput label="Examenes de laboratorio" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Antecedentes Familiares</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox>Diabetes tipo 2</IonCheckbox>
          <IonCheckbox>Insulino resistencia</IonCheckbox>
          <IonCheckbox>Hipertension arterial</IonCheckbox>
          <IonCheckbox>Tiroides</IonCheckbox>
          <IonCheckbox>Dislpidemia</IonCheckbox>
          <div></div>
          <IonInput label="Otros antecedentes" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput> 
        </IonGrid>
      </IonItem>
      <IonCardHeader>Valoracion subjetiva y digestion</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonInput label="Peso habitual" label-placement="stacked" placeholder="Ingrese peso habitual" type="number"></IonInput>
          <IonInput label="Sintomas Gastrointestinales" label-placement="stacked" placeholder="Ingrese sintomas"></IonInput>
          <IonInput label="Variacion del peso" label-placement="stacked" placeholder="Ingrese variacion peso"></IonInput>
          <IonInput label="Apetito" label-placement="stacked" placeholder="Descripcion apetito"></IonInput>
          <IonInput label="Digestion" label-placement="stacked" placeholder="Descripcion digestion"></IonInput>
          <IonInput label="Frecuencia digestion" label-placement="stacked" placeholder="Frecuencia digestion"></IonInput>
          <IonInput label="Medidas para la digestion" label-placement="stacked" placeholder="Medidas digestion"></IonInput>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard>
      <IonItem>
        <ion-button expand="full" @click="saveData()">
          Guardar
        </ion-button>
      </IonItem>
    </IonCard>
    </IonContent>
  </IonPage>
</template>

<style scoped>
label {
  font-weight: bold;
  margin-right: 10px;
}
IonItem {
  margin-bottom: 10px;
}
ion-grid {
  --ion-grid-padding: 5px;
}

</style>
