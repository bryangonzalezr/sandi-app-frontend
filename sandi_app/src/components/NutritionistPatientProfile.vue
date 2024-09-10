<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons, 
  IonItem, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonGrid, 
  IonCard, 
  IonCardHeader, 
  IonCheckbox,
  IonIcon,
  IonTextarea,
  onIonViewWillEnter } from '@ionic/vue';
import { chevronBack, eye, add, create, pencil, chevronDownOutline } from 'ionicons/icons';
import { ref } from 'vue';
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePatientsStore, usePatientProfileStore } from "@/stores";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

const patientProfileStore = usePatientProfileStore();
const { data } = storeToRefs(patientProfileStore);

const patientsStore = usePatientsStore();

const editProfile = ref(false);
const checkProgress = ref(false);
const checkCreatePlan = ref(false);
const checkUpdatePlan = ref(false);
const patient = ref({})

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

const updateProfile = async () => {
  try {
    await patientProfileStore.updatePatientProfile()
    editProfileToggle();
    Swal.fire({
      title: "Exito",
      text: "Se han guardado los cambios",
      icon: "success",
      confirmButtonText: "Aceptar",
      heightAuto: false,
    });
  }catch (e) {
    return e
  }
}

const verifyPatient = async () => {
  await patientsStore.ShowProgress(props.id);
  await patientsStore.ObtainPatient(props.id);
  patient.value = patientsStore.GetPatient.data.data;
  if(patientsStore.GetProgress.data.length > 0){
    checkProgress.value = true;
  }
  if(patient.value.nutritional_plan.length == 0){
    checkCreatePlan.value = true;
  }
  if(patient.value.nutritional_plan.length > 0){
    checkCreatePlan.value = false;
    checkUpdatePlan.value = true;
  }
}

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
  router.push({name: 'NutritionistConsult', params: {id:idPatient}});
}

onIonViewWillEnter(() => {
  if(props.id !== undefined){
    patientProfileStore.obtainPatientProfile(props.id);
    verifyPatient()
  }
});

</script>

<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="returnToPatients()">
            <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
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
      <IonButton @click="CreatePlanNutritional()" v-if="checkCreatePlan">
        <IonIcon aria-hidden="true" :icon="add" slot="icon-only"></IonIcon>
        Plan nutricional
      </IonButton>
      <IonButton @click="CreatePlanNutritional()" v-if="checkUpdatePlan">
        <IonIcon aria-hidden="true" :icon="create" slot="icon-only"></IonIcon>
        Plan nutricional
      </IonButton>
    </div>
    <IonCard color="success">
      <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
        <h1>Antecedentes Personales</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-3 gap-2 justify-center content-center items-center">
          <IonInput v-model="data.user.name" label="Nombre" label-placement="stacked" disabled></IonInput>
          <IonInput v-model="data.user.last_name" label="Apellido" label-placement="stacked" disabled></IonInput>
          <IonSelect v-model="data.user.sex" label="Sexo" label-placement="stacked" disabled :toggle-icon="''">
            <IonSelectOption value="Masculino">Masculino</IonSelectOption>
            <IonSelectOption value="Femenino">Femenino</IonSelectOption>
          </IonSelect>
          <IonInput v-model.number="data.user.age" label="Edad" label-placement="stacked" type="number" disabled></IonInput>
          <IonInput v-model="data.user.birthdate" label="Fecha de nacimiento" label-placement="stacked" type="date" disabled></IonInput>
            <IonSelect v-model="data.user.civil_status" label="Estado civil" label-placement="stacked" disabled :toggle-icon="''">
              <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
              <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
              <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
              <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
              <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
            </IonSelect>
          <IonInput v-model="data.user.phone_number" label="Número de contacto" label-placement="stacked" disabled></IonInput>
          <IonTextarea v-model="data.user.objectives" label="Objetivos" label-placement="stacked" disabled></IonTextarea>
          
        </IonGrid>
      </IonItem>
      <IonCardHeader>
        <h1>Hábitos y anamnensis alimentaria</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
            <IonSelect v-model="data.nutritional_profile.habits.alcohol" label="Consumo de alcohol" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin frecuencia' :'Ingrese la frecuencia de consumo'"  :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
              <IonSelectOption value="Nada">Nada</IonSelectOption>
              <IonSelectOption value="Poco">Poco</IonSelectOption>
              <IonSelectOption value="Moderado">Moderado</IonSelectOption>
              <IonSelectOption value="Alto">Alto</IonSelectOption>
            </IonSelect>
            <IonSelect v-model="data.nutritional_profile.habits.tabaco" label="Consumo de tabaco" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin frecuencia' :'Ingrese la frecuencia de consumo'"  :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
              <IonSelectOption value="Nada">Nada</IonSelectOption>
              <IonSelectOption value="Poco">Poco</IonSelectOption>
              <IonSelectOption value="Moderado">Moderado</IonSelectOption>
              <IonSelectOption value="Alto">Alto</IonSelectOption>
            </IonSelect>
            <IonSelect v-model="data.nutritional_profile.nutritional_anamnesis.plan_anterior" label="¿Has seguido planes con anterioridad?" label-placement="stacked" :placeholder="!editProfile ? 'Sin respuesta ingresada' :'Seleccione una opción'"  :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
              <IonSelectOption value="false">No</IonSelectOption>
              <IonSelectOption value="true">Si</IonSelectOption>
            </IonSelect>
            <IonSelect v-model="data.nutritional_profile.nutritional_anamnesis.agua" label="¿Consume agua?" label-placement="stacked" :placeholder="!editProfile ? 'Sin respuesta ingresada' :'Seleccione una opción'"  :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
              <IonSelectOption value="0">No</IonSelectOption>
              <IonSelectOption value="1">Si</IonSelectOption>
            </IonSelect>
            <IonTextarea v-model="data.nutritional_profile.physical_comentario" label="Descripción de la actividad física" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin comentarios en actividad física' :'Describa actividad física'"  :disabled="!editProfile"></IonTextarea>
            <IonSelect v-model="data.nutritional_profile.physical_status" label="Estado físico" label-placement="stacked" :placeholder="!editProfile ? 'Paciente con estado no específicado' :'Seleccione estado de actividad física'"  :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
              <IonSelectOption value="Leve">Leve</IonSelectOption>
              <IonSelectOption value="Moderada">Moderada</IonSelectOption>
              <IonSelectOption value="Pesada">Pesada</IonSelectOption>
            </IonSelect>
            <IonSelect v-model="data.nutritional_profile.allergies" label="Restricciones alimenticias o alergias" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin restricciones registradas' :'Selecciones una o más opciones'"  :multiple="true" :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
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
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard color="warning">
      <IonCardHeader>Antecedentes Morbidos</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox :checked="data.nutritional_profile.morbid_antecedents.dm2" :disabled="!editProfile">Diabetes tipo 2</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.morbid_antecedents.insulin_resistance" :disabled="!editProfile">Insulino resistencia</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.morbid_antecedents.hta" :disabled="!editProfile" >Hipertension arterial</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.morbid_antecedents.tiroides" :disabled="!editProfile" >Tiroides</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.morbid_antecedents.dislipidemia" :disabled="!editProfile" >Dislpidemia</IonCheckbox>
          <div></div>
          <IonSelect v-model="data.nutritional_profile.morbid_antecedents.otros" label="Otros antecedentes" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin antecedentes registrados' :'Selecciones una o más opciones'" :multiple="true" :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
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
          <IonInput v-model="data.nutritional_profile.morbid_antecedents.cirugias" label="Cirugias" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin antecedentes registrados' :'Ingrese cirugias'"  :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.morbid_antecedents.farmacos" label="Farmacos" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin medicamentos registradas' :'Ingrese medicamentos consumo diario'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.morbid_antecedents.exams" label="Examenes de laboratorio" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin examemes' :'Ingrese resultados'"  :disabled="!editProfile"></IonInput>
          <IonSelect v-model="data.nutritional_profile.patient_type" label="Tipo de Paciente" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin tipo seleccionado' :'Selecciones el tipo de paciente'" :multiple="true" :disabled="!editProfile" :toggle-icon="!editProfile ? '' : chevronDownOutline">
            <IonSelectOption value="Ambulatorio">Ambulatorio</IonSelectOption>
            <IonSelectOption value="Enfermo">Enfermo</IonSelectOption>
          </IonSelect>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Antecedentes Familiares</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonCheckbox :checked="data.nutritional_profile.family_antecedents.dm2" :disabled="!editProfile">Diabetes tipo 2</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.family_antecedents.hta" :disabled="!editProfile">Hipertension arterial</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.family_antecedents.tiroides" :disabled="!editProfile">Tiroides</IonCheckbox>
          <IonCheckbox :checked="data.nutritional_profile.family_antecedents.dislipidemia" :disabled="!editProfile">Dislpidemia</IonCheckbox>
          <IonTextarea v-model="data.nutritional_profile.family_antecedents.comments" label="Comentarios extra" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin comentarios' :'Ingrese comentarios'" :disabled="!editProfile"></IonTextarea>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Valoracion subjetiva y digestion</IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
          <IonInput v-model="data.nutritional_profile.subjective_assessment.usual_weight" label="Peso habitual" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin peso habitual ingresado' :'Ingrese peso habitual'" type="number" :disabled="!editProfile" class="disabled:text-black"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.gastrointestinal_symptoms" label="Sintomas Gastrointestinales" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin sintomas' :'Ingrese sintomas'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.weight_variation" label="Variación del peso" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin variación de peso' :'Ingrese variación de peso'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.appetite" label="Apetito" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin descrición de apetito' :'Describa el apetito del paciente'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.digestion" label="Digestion" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin descrición de su digestión' :'Describa la digestión del paciente'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.digestion_frequency" label="Frecuencia digestion" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin frecuencia ingresada' :'Ingrese la frecuencia'" :disabled="!editProfile"></IonInput>
          <IonInput v-model="data.nutritional_profile.subjective_assessment.digestion_measures" label="Medidas para la digestion" label-placement="stacked" :placeholder="!editProfile ? 'Paciente sin medidas para la digestión' :'Ingrese medidas'" :disabled="!editProfile"></IonInput>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard>
        <IonItem v-if="!editProfile">
        <IonButton @click="editProfileToggle()" size="small">Editar<IonIcon slot="start" :icon="pencil"></IonIcon></IonButton>
      </IonItem>
      <IonItem v-if="editProfile">
        <IonButton @click="updateProfile()">Guardar</IonButton>
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
IonGrid {
  --IonGrid-padding: 5px;
}

.input-disabled.sc-IonInput-md-h,
.select-disabled,
.textarea-disabled,
.checkbox-disabled::part(label){
  opacity: 1;
}

</style>
