<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonChip , IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox, IonIcon, IonLabel, onIonViewWillEnter } from '@ionic/vue';
import { storeToRefs } from "pinia";
import { useProfileStore , useAuthStore, usePatientsStore } from "@/stores";
import { useRouter } from "vue-router";
import { pencil, eye, closeCircle } from 'ionicons/icons';
import { ref } from 'vue';

const patientsStore = usePatientsStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { data } = storeToRefs(profileStore);

const router = useRouter();

const ejercicio = ref('');
const editProfile = ref(false);

const checkProgress = ref(false);
const listAlergies = ref([]);
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

const goToProgress = () => {
  router.push({name: 'ProgressDetail', params: {id: user.value.nutritional_profile.patient_id}});
}

const verifyProgress = async () => {
  await patientsStore.ShowProgress(user.value.nutritional_profile.patient_id);
  if(patientsStore.GetProgress.data.length > 0){
    checkProgress.value = true;
  }
}

const appendAlergies = (allergy) => {
  listAlergies.value.push(allergy);
  console.log(listAlergies);
}

const deleteAlergies = (allergy) => {}

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

const saveData = () => {
  newProfile.value.imc = newProfile.value.peso / (newProfile.value.estatura * newProfile.value.estatura)
  profileStore.CreateProfile(newProfile.value);
  console.log(Profile);
};

onIonViewWillEnter(() => {
  console.log(user.value.id);
  if(user.value.id !== undefined){
    profileStore.obtainUserProfile(user.value.id);
  }
  verifyProgress()
});

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Perfil Nutricional</IonTitle>
      </IonToolbar>
    </IonHeader>  
    <IonContent class="ion-padding">
      <IonItem v-if="checkProgress">
        <IonButton @click="goToProgress()" >
          <IonIcon aria-hidden="true" :icon="eye" slot="icon-only"></IonIcon>
          Progreso
      </IonButton>
      </IonItem>
      <IonCard color="success">
      <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
        <h1>Antecedentes Personales</h1>
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
          <template v-if="!editProfile">
            <IonInput v-model="data.civil_status" label="Estado civil" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <template v-if="editProfile">
            <IonSelect v-model="data.civil_status" label="Estado civil" label-placement="stacked">
              <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
              <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
              <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
              <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
              <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
            </IonSelect>
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
          <template v-if="editProfile">
            <IonSelect v-model="data.habits.alcohol" label="Consumo de alcohol" label-placement="stacked" placeholder="Frecuencia">
              <IonSelectOption value="Nada">Nada</IonSelectOption>
              <IonSelectOption value="Poco">Poco</IonSelectOption>
              <IonSelectOption value="Moderado">Moderado</IonSelectOption>
              <IonSelectOption value="Alto">Alto</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.habits.alcohol" label="Consumo de alcohol" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
          </template>
          <template v-if="editProfile">
            <IonSelect v-model="data.habits.tabaco" label="Consumo de tabaco" label-placement="stacked" placeholder="Frecuencia">
              <IonSelectOption value="Nada">No</IonSelectOption>
              <IonSelectOption value="Poco">Poco</IonSelectOption>
              <IonSelectOption value="Moderado">Moderado</IonSelectOption>
              <IonSelectOption value="Alto">Alto</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.habits.tabaco" label="Consumo de tabaco" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
          </template>
          <template v-if="editProfile">
            <IonSelect v-model="data.nutritional_anamnesis.plan_anterior" label="¿Has seguido planes con anterioridad?" label-placement="stacked" placeholder="Selecciona una opcion">
              <IonSelectOption value="0">No</IonSelectOption>
              <IonSelectOption value="1">Si</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.nutritional_anamnesis.plan_anterior" label="¿Has seguido planes con anterioridad?" label-placement="stacked" placeholder="No ingresado"></IonInput>
          </template>
          <template v-if="editProfile">
            <IonSelect v-model="data.nutritional_anamnesis.agua" label="Consumo de agua" label-placement="stacked" placeholder="Selecciona consumo">
              <IonSelectOption value="0">Si</IonSelectOption>
              <IonSelectOption value="1">No</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.nutritional_anamnesis.agua" label="Consumo de agua" label-placement="stacked" placeholder="No ingresado"></IonInput>
          </template>
            <IonInput v-model="data.physical_comentario" label="Descripción de la actividad física" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonSelect v-model="data.physical_status" label="Estado físico" label-placement="stacked">
              <IonSelectOption value="Leve">Leve</IonSelectOption>
              <IonSelectOption value="Moderada">Moderada</IonSelectOption>
              <IonSelectOption value="Pesada">Pesada</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.physical_status" label="Estado físico" label-placement="stacked" placeholder="No ingresado"</IonInput>
          </template>
<!--             <template v-if="ejercicio == 'Si'">
                <IonInput label="¿Hace cuanto tiempo realizas actividad fisica?" label-placement="stacked" placeholder="Ingresa el tiempo"></IonInput>
                <IonSelect label="Frecuencia de actividad fisica" label-placement="stacked" v-model="newProfile.nivel_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="moderada">1-2 veces a la semana</IonSelectOption>
                  <IonSelectOption value="pesada">3-5 veces a la semana</IonSelectOption>
                </IonSelect>
                <IonInput label="Duracion del entrenamiento" label-placement="stacked" placeholder="Ingresa una duracion"></IonInput>
                <IonSelect label="Tipo de entrenamiento" label-placement="stacked" v-model="newProfile.tipo_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="leve">Cardio</IonSelectOption>
                  <IonSelectOption value="moderada">Pesas</IonSelectOption>
                </IonSelect>
          <IonInput v-model="newProfile.intolerancias" label="Intolerancia o alergias" label-placement="stacked" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
          </template> -->
          <template v-if="editProfile">
            <IonSelect v-model="data.allergies" label="Restricciones alimenticias o alergias" label-placement="stacked" :multiple="true">
              <IonSelectOption value="alcohol-free">Alcohol</IonSelectOption>
              <IonSelectOption value="crustacean-free">Crustaceos</IonSelectOption>
              <IonSelectOption value="dairy-free">Lacteos</IonSelectOption>
              <IonSelectOption value="egg-free">Huevos</IonSelectOption>
              <IonSelectOption value="fish-free">Pescado</IonSelectOption>
              <IonSelectOption value="gluten-free">Gluten</IonSelectOption>
              <IonSelectOption value="keto-friendly">Keto Amigable</IonSelectOption>
              <IonSelectOption value="kidney-friendly">Apto Para Riñones</IonSelectOption>
              <IonSelectOption value="kosher">Kosher</IonSelectOption>
              <IonSelectOption value="lupine-free">Lupino</IonSelectOption>
              <IonSelectOption value="mediterranean">Mediterraneo</IonSelectOption>
              <IonSelectOption value="mollusk-free">Molusco</IonSelectOption>
              <IonSelectOption value="mustard-free">Mostaza</IonSelectOption>
              <IonSelectOption value="no-oil-added">Aceite</IonSelectOption>
              <IonSelectOption value="paleo">Dieta Paleo</IonSelectOption>
              <IonSelectOption value="peanut-free">Mani</IonSelectOption>
              <IonSelectOption value="pescatarian">Pescatariano</IonSelectOption>
              <IonSelectOption value="pork-free">Cerdo</IonSelectOption>
              <IonSelectOption value="red-meat-free">Carne Roja</IonSelectOption>
              <IonSelectOption value="sesame-free">Sesamo</IonSelectOption>
              <IonSelectOption value="shellfish-free">Marisco</IonSelectOption>
              <IonSelectOption value="soy-free">Soya</IonSelectOption>
              <IonSelectOption value="sugar-conscious">Azucar Consciente</IonSelectOption>
              <IonSelectOption value="tree-nut-free">Frutos secos</IonSelectOption>
              <IonSelectOption value="vegan">Vegano</IonSelectOption>
              <IonSelectOption value="vegetarian">Vegetariano</IonSelectOption>
              <IonSelectOption value="wheat-free">Trigo</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="data.allergies" label="Restricciones alimenticias o alergias" label-placement="stacked" placeholder="No ingresado"></IonInput>
          </template>
          <!--           <IonButton @click="appendAlergies(newProfile.intolerancias)">Agregar</IonButton>
          <div v-for="allergy in listAlergies"><IonChip><IonLabel>{{allergy}}</IonLabel><IonIcon :icon="closeCircle"></IonIcon></IonChip></div> -->
        </IonGrid>
      </IonItem>
      <IonItem v-if="!editProfile">
        <IonButton @click="editProfileToggle()" size="small">Editar<IonIcon slot="start" :icon="pencil"></IonIcon></IonButton>
      </IonItem>
      <IonItem v-if="editProfile">
        <ion-button @click="profileStore.updateUserProfile(user.id)">Guardar</ion-button>
        <IonButton color="danger" @click="editProfileToggle()">Cancelar</IonButton>
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
