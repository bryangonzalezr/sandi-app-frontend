<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox, IonIcon } from '@ionic/vue';
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProfileStore , useAuthStore } from "@/stores";
import { pencil } from 'ionicons/icons';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { Profile } = storeToRefs(profileStore);

console.log(user.value);

const ejercicio = ref('');
const editProfile = ref(false);

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

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
    <IonHeader>
      <IonToolbar>
        <IonTitle>Perfil Nutricional</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard color="success">
      <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
        <h1>Antecedentes Personales</h1>
        <IonButton color="dark" @click="editProfileToggle()" size="small" fill="outline">Editar<IonIcon slot="start" :icon="pencil"></IonIcon></IonButton>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-3 gap-2 justify-center content-center items-center">
          <IonInput v-model="user.name" label="Nombre" label-placement="stacked" placeholder="Ingrese su nombre" :readonly="!editProfile"></IonInput>
          <IonInput v-model="user.last_name" label="Apellido" label-placement="stacked" placeholder="Ingrese su apellido" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonSelect v-model="user.sex" label="Sexo" label-placement="stacked" placeholder="Selecciona tu sexo">
              <IonSelectOption value="Masculino">Masculino</IonSelectOption>
              <IonSelectOption value="Femenino">Femenino</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="user.sex" label="Sexo" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <IonInput v-model.number="user.age" placeholder="Ingrese su edad" label="Edad" label-placement="stacked" type="number" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonInput v-model="user.birthdate" label="Fecha de nacimiento" label-placement="stacked" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="user.birthdate" label="Fecha de nacimiento" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <template>
            <IonInput v-model="user.civil_status" label="Estado civil" label-placement="stacked"></IonInput>
          </template>
          <template>

          </template>
          <IonInput v-model="user.phone_number" label="Número de telefono" label-placement="stacked" :readonly="!editProfile"></IonInput>
          <IonInput v-model="user.objectives" label="Objetivos" label-placement="stacked" placeholder="Ingresa tus objetivos" :readonly="!editProfile"></IonInput>
          
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
