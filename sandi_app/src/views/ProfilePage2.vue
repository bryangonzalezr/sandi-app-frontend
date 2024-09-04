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
  IonIcon,
  onIonViewWillEnter } from '@ionic/vue';
import { chevronBack, eye, add, pencil } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProfileStore, usePatientsStore, usePatientProfileStore } from "@/stores";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

const patientProfileStore = usePatientProfileStore();
const { data } = storeToRefs(patientProfileStore);
const profileStore = useProfileStore();

const patientsStore = usePatientsStore();

const ejercicio = ref('');
const editProfile = ref(false);
const checkProgress = ref(false);

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

const CreatePlanNutritional = () => {
  router.push({name: 'PatientPlanCreate', params: {id: props.id}});
}

const goToProgress = () => {
  router.push({ name: "PatientProgress", params: { id: props.id }});
}

const returnToPatients = () =>{
  router.push({ name: "Patients"})
};

const CreateConsult = (idPatient) => {
  router.push({name: 'ConsultPage', params: {id:idPatient}});
}

const verifyProgress = async () => {
  await patientsStore.ShowProgress(props.id);
  if(patientsStore.GetProgress.data.length > 0){
    checkProgress.value = true;
  }
}

onIonViewWillEnter(() => {
  if(props.id !== undefined){
    patientProfileStore.obtainPatientProfile(props.id);
    verifyProgress()
  }
});

</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton @click="returnToPatients()" :icon="chevronBack"></IonBackButton>
        </IonButtons>
        <IonTitle>Paciente {{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
    <div class="grid grid-cols-2 gap-1 border-b">
      <IonButton @click="goToProgress()" v-if="checkProgress">
        <IonIcon aria-hidden="true" :icon="eye" slot="icon-only"></IonIcon>
        Progreso
      </IonButton>
      <IonButton @click="CreateConsult($route.params.id)">
        <IonIcon aria-hidden="true" :icon="add" slot="icon-only"></IonIcon>
        Consulta
      </IonButton>
      <IonButton @click="CreatePlanNutritional()">
        <IonIcon aria-hidden="true" :icon="add" slot="icon-only"></IonIcon>
        Plan nutricional
      </IonButton>
    </div>
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
              <IonSelectOption value="Nada">Nada</IonSelectOption>
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
              <IonSelectOption value="0">No</IonSelectOption>
              <IonSelectOption value="1">Si</IonSelectOption>
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
            <IonInput v-model="data.physical_status" label="Estado físico" label-placement="stacked" placeholder="No ingresado"></IonInput>
          </template>
<!--             <template v-if="ejercicio == 'Si'">
                <IonInput label="¿Hace cuanto tiempo realizas actividad fisica?" label-placement="stacked" placeholder="Ingresa el tiempo"></IonInput>
                <IonSelect label="Frecuencia de actividad fisica" label-placement="stacked" v-model="data.nivel_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="moderada">1-2 veces a la semana</IonSelectOption>
                  <IonSelectOption value="pesada">3-5 veces a la semana</IonSelectOption>
                </IonSelect>
                <IonInput label="Duracion del entrenamiento" label-placement="stacked" placeholder="Ingresa una duracion"></IonInput>
                <IonSelect label="Tipo de entrenamiento" label-placement="stacked" v-model="data.tipo_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="leve">Cardio</IonSelectOption>
                  <IonSelectOption value="moderada">Pesas</IonSelectOption>
                </IonSelect>
          <IonInput v-model="data.intolerancias" label="Intolerancia o alergias" label-placement="stacked" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
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
          <!--           <IonButton @click="appendAlergies(data.intolerancias)">Agregar</IonButton>
          <div v-for="allergy in listAlergies"><IonChip><IonLabel>{{allergy}}</IonLabel><IonIcon :icon="closeCircle"></IonIcon></IonChip></div> -->
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard color="warning">
      <IonCardHeader>Antecedentes Morbidos</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox v-bind:checked="data.morbid_antecedents.dm2" :disabled="!editProfile">Diabetes tipo 2</IonCheckbox>
          <IonCheckbox v-bind:checked="data.morbid_antecedents.insulin_resistance" :disabled="!editProfile">Insulino resistencia</IonCheckbox>
          <IonCheckbox v-bind:checked="data.morbid_antecedents.hta" :disabled="!editProfile" >Hipertension arterial</IonCheckbox>
          <IonCheckbox v-bind:checked="data.morbid_antecedents.tiroides" :disabled="!editProfile" >Tiroides</IonCheckbox>
          <IonCheckbox v-bind:checked="data.morbid_antecedents.dislipidemia" :disabled="!editProfile" >Dislpidemia</IonCheckbox>
          <div></div>
          <IonSelect v-model="data.morbid_antecedents.otros" label="Otros antecedentes" label-placement="stacked" placeholder="Ingrese antecedentes" :multiple="true">
            <IonSelectOption value="HiperMetabolismo Leve">HiperMetabolismo Leve</IonSelectOption>
            <IonSelectOption value="HiperMetabolismo Moderado">HiperMetabolismo Moderado</IonSelectOption>
            <IonSelectOption value="HiperMetabolismo">HiperMetabolismo</IonSelectOption>
            <IonSelectOption value="Edema Severo">Edema Severo</IonSelectOption>
            <IonSelectOption value="Ascitis">Ascitis</IonSelectOption>
            <IonSelectOption value="Desnutrición Leve">Desnutrición Leve</IonSelectOption>
            <IonSelectOption value="Desnutrición Moderada">Desnutrición Moderada</IonSelectOption>
            <IonSelectOption value="Desnutrición Severa">Desnutrición Severa</IonSelectOption>
            <IonSelectOption value="Desnutrición Sin Estrés">Desnutrición Sin Estrés</IonSelectOption>
            <IonSelectOption value="Tumor">Tumor</IonSelectOption>
            <IonSelectOption value="Leucemia / Linfoma">Leucemia / Linfoma</IonSelectOption>
            <IonSelectOption value="Infeccion">Infeccion</IonSelectOption>
            <IonSelectOption value="Sepsis / Abscesos">Sepsis / Abscesos</IonSelectOption>
            <IonSelectOption value="Quemadura 20%">Quemadura 20%</IonSelectOption>
            <IonSelectOption value="Quemadura 20-40%">Quemadura 20-40%</IonSelectOption>
            <IonSelectOption value="Quemadura 40-100%">Quemadura 40-100%</IonSelectOption>
            <IonSelectOption value="Enfermedad Pancreática">Enfermedad Pancreática</IonSelectOption>
            <IonSelectOption value="Enfermedad Inflamatoria Intestinal">Enfermedad Inflamatoria Intestinal</IonSelectOption>
            <IonSelectOption value="Cirugia Menor">Cirugia Menor</IonSelectOption>
            <IonSelectOption value="Cirugia Mayor">Cirugia Mayor</IonSelectOption>
            <IonSelectOption value="Cirugia General">Cirugia General</IonSelectOption>
            <IonSelectOption value="Politraumatismo">Politraumatismo</IonSelectOption>
            <IonSelectOption value="Politraumatismo y Sepsis">Politraumatismo y Sepsis</IonSelectOption>
            <IonSelectOption value="Transplante">Transplante</IonSelectOption>
            <IonSelectOption value="Ventilación Mecanica">Ventilación Mecanica</IonSelectOption>
          </IonSelect>
          <IonInput v-model="data.morbid_antecedents.cirugias" label="Cirugias" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
          <IonInput v-model="data.morbid_antecedents.farmacos" label="Farmacos" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
          <IonInput v-model="data.morbid_antecedents.exams" label="Examenes de laboratorio" label-placement="stacked" placeholder="Ingrese antecedentes"></IonInput>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Antecedentes Familiares</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox v-bind:checked="data.family_antecedents.dm2">Diabetes tipo 2</IonCheckbox>
          <IonCheckbox v-bind:checked="data.family_antecedents.hta">Hipertension arterial</IonCheckbox>
          <IonCheckbox v-bind:checked="data.family_antecedents.tiroides">Tiroides</IonCheckbox>
          <IonCheckbox v-bind:checked="data.family_antecedents.dislipidemia">Dislpidemia</IonCheckbox>
          <IonInput v-model="data.family_antecedents.comments" label="Comentarios extra" label-placement="stacked" placeholder="Ingresa comentarios"></IonInput>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Valoracion subjetiva y digestion</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonInput v-model="data.subjective_assessment.usual_weight" label="Peso habitual" label-placement="stacked" placeholder="Ingrese peso habitual" type="number"></IonInput>
          <IonInput v-model="data.subjective_assessment.gastrointestinal_symptoms" label="Sintomas Gastrointestinales" label-placement="stacked" placeholder="Ingrese sintomas"></IonInput>
          <IonInput v-model="data.subjective_assessment.weight_variation" label="Variacion del peso" label-placement="stacked" placeholder="Ingrese variacion peso"></IonInput>
          <IonInput v-model="data.subjective_assessment.appetite" label="Apetito" label-placement="stacked" placeholder="Descripcion apetito"></IonInput>
          <IonInput v-model="data.subjective_assessment.digestion" label="Digestion" label-placement="stacked" placeholder="Descripcion digestion"></IonInput>
          <IonInput v-model="data.subjective_assessment.digestion_frequency" label="Frecuencia digestion" label-placement="stacked" placeholder="Frecuencia digestion"></IonInput>
          <IonInput v-model="data.subjective_assessment.digestion_measures" label="Medidas para la digestion" label-placement="stacked" placeholder="Medidas digestion"></IonInput>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard>
        <IonItem v-if="!editProfile">
        <IonButton @click="editProfileToggle()" size="small">Editar<IonIcon slot="start" :icon="pencil"></IonIcon></IonButton>
      </IonItem>
      <IonItem v-if="editProfile">
        <ion-button @click="patientProfileStore.updatePatientProfile()">Guardar</ion-button>
        <IonButton color="danger" @click="cancelEdit()">Cancelar</IonButton>
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
