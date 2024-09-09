<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonLabel, IonCard, IonCardHeader,  IonIcon, onIonViewWillEnter } from '@ionic/vue';
import { storeToRefs } from "pinia";
import { useProfileStore , useAuthStore, usePatientsStore } from "@/stores";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { pencil, eye } from 'ionicons/icons';
import { ref } from 'vue';

const patientsStore = usePatientsStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { user, rolUser } = storeToRefs(authStore);

const router = useRouter();

const editProfile = ref(false);

const checkProgress = ref(false);

const newProfile = ref({
  name: '',
  last_name: '',
  sex: '',
  birthdate: '',
  age: '',
  phone_number: '',
  civil_status: '',
  objectives: '',
  physical_comentario: '',
  physical_status: '',
  habits: {
    alcohol: '',
    tabaco: ''
  },
  allergies: [],
  nutritional_anamnesis: {
    plan_anterior: '',
    agua: ''
  },
});

const goToProgress = () => {
  router.push({name: 'ProgressDetail', params: {id: user.value.nutritional_profile.patient_id}});
}

const verifyProgress = async () => {
  await patientsStore.ShowProgress(user.value.id);
  if(patientsStore.GetProgress.data.length > 0){
    checkProgress.value = true;
  }
}

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
};

const updateProfile = async () => {
  try{
    if(rolUser.value == 'nutricionista' ){
      profileStore.updateNutritionistProfile(user.value.id)
    }else{
      profileStore.updateUserProfile(user.value.id)
    }
    editProfileToggle()
    Swal.fire({
      title: "Exito",
      text: "Se han guardado los cambios",
      icon: "success",
      confirmButtonText: "Aceptar",
      heightAuto: false,
    });
  }catch(error){
    return error
  }
}

const getDataProfile = async () => {
  if(user.value.id !== undefined){
    profileStore.obtainUserProfile(user.value.id);
  }
  newProfile.value = profileStore.GetProfile;
}

onIonViewWillEnter(() => {
  console.log(user.value.id);
  getDataProfile();
  if(rolUser.value == 'paciente'){
    verifyProgress();
  }
});

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Mi perfil</IonTitle>
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
      <template v-if="rolUser == 'paciente' || rolUser == 'superadmin'">
        <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
          <h1>Mi Nutricionista</h1>
        </IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 justify-center content-center items-center">
              <div>
                <IonLabel>Nombre</IonLabel>
                <p>{{ user.nutritionist.name }} {{ user.nutritionist.last_name }} </p>
              </div>
              <div>
                <IonLabel>Número de contacto</IonLabel>
                <p>{{ user.nutritionist.phone_number }} </p>
              </div> 
          </IonGrid>
        </IonItem>
      </template>
      <IonCardHeader class="grid grid-cols-2 justify-center items-center conten-center">
        <h1>Datos Personales</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid class="grid grid-cols-3 gap-2 justify-center content-center items-center">
          <IonInput v-model="newProfile.name" label="Nombre" label-placement="stacked" placeholder="Ingrese su nombre" :readonly="!editProfile"></IonInput>
          <IonInput v-model="newProfile.last_name" label="Apellido" label-placement="stacked" placeholder="Ingrese su apellido" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonSelect v-model="newProfile.sex" label="Sexo" label-placement="stacked" placeholder="Selecciona tu sexo">
              <IonSelectOption value="Masculino">Masculino</IonSelectOption>
              <IonSelectOption value="Femenino">Femenino</IonSelectOption>
            </IonSelect>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="newProfile.sex" label="Sexo" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <IonInput v-model.number="newProfile.age" placeholder="Ingrese su edad" label="Edad" label-placement="stacked" type="number" :readonly="!editProfile"></IonInput>
          <template v-if="editProfile">
            <IonInput v-model="newProfile.birthdate" label="Fecha de nacimiento" label-placement="stacked" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="newProfile.birthdate" label="Fecha de nacimiento" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <template v-if="!editProfile">
            <IonInput v-model="newProfile.civil_status" label="Estado civil" label-placement="stacked" :readonly="!editProfile"></IonInput>
          </template>
          <template v-if="editProfile">
            <IonSelect v-model="newProfile.civil_status" label="Estado civil" label-placement="stacked">
              <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
              <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
              <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
              <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
              <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
            </IonSelect>
          </template>
          <IonInput v-model="newProfile.phone_number" label="Número de telefono" label-placement="stacked" :readonly="!editProfile"></IonInput>
          <IonInput v-model="newProfile.objectives" label="Objetivos" label-placement="stacked" placeholder="Ingresa tus objetivos" :readonly="!editProfile"></IonInput>
        </IonGrid>
      </IonItem>
      <template v-if="rolUser != 'nutricionista'">
        <IonCardHeader>
          <h1>Hábitos y anamnensis alimentaria</h1>
        </IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-2 gap-4 justify-center content-center items-center">
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.habits.alcohol" label="Consumo de alcohol" label-placement="stacked" placeholder="Frecuencia">
                <IonSelectOption value="Nada">Nada</IonSelectOption>
                <IonSelectOption value="Poco">Poco</IonSelectOption>
                <IonSelectOption value="Moderado">Moderado</IonSelectOption>
                <IonSelectOption value="Alto">Alto</IonSelectOption>
              </IonSelect>
            </template>
            <template v-if="!editProfile">
              <IonInput v-model="newProfile.habits.alcohol" label="Consumo de alcohol" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
            </template>
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.habits.tabaco" label="Consumo de tabaco" label-placement="stacked" placeholder="Frecuencia">
                <IonSelectOption value="Nada">Nada</IonSelectOption>
                <IonSelectOption value="Poco">Poco</IonSelectOption>
                <IonSelectOption value="Moderado">Moderado</IonSelectOption>
                <IonSelectOption value="Alto">Alto</IonSelectOption>
              </IonSelect>
            </template>
            <template v-if="!editProfile">
              <IonInput v-model="newProfile.habits.tabaco" label="Consumo de tabaco" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
            </template>
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.nutritional_anamnesis.plan_anterior" label="¿Has seguido planes con anterioridad?" label-placement="stacked" placeholder="Selecciona una opcion">
                <IonSelectOption value="0">No</IonSelectOption>
                <IonSelectOption value="1">Si</IonSelectOption>
              </IonSelect>
            </template>
            <template v-if="!editProfile">
              <IonInput v-model="newProfile.nutritional_anamnesis.plan_anterior" label="¿Has seguido planes con anterioridad?" label-placement="stacked" placeholder="No ingresado"></IonInput>
            </template>
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.nutritional_anamnesis.agua" label="Consumo de agua" label-placement="stacked" placeholder="Selecciona consumo">
                <IonSelectOption value="0">No</IonSelectOption>
                <IonSelectOption value="1">Si</IonSelectOption>
              </IonSelect>
            </template>
            <template v-if="!editProfile">
              <IonInput v-model="newProfile.nutritional_anamnesis.agua" label="Consumo de agua" label-placement="stacked" placeholder="No ingresado"></IonInput>
            </template>
              <IonInput v-model="newProfile.physical_comentario" label="Descripción de la actividad física" label-placement="stacked" placeholder="No ingresado" :readonly="!editProfile"></IonInput>
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.physical_status" label="Estado físico" label-placement="stacked">
                <IonSelectOption value="Leve">Leve</IonSelectOption>
                <IonSelectOption value="Moderada">Moderada</IonSelectOption>
                <IonSelectOption value="Pesada">Pesada</IonSelectOption>
              </IonSelect>
            </template>
            <template v-if="!editProfile">
              <IonInput v-model="newProfile.physical_status" label="Estado físico" label-placement="stacked" placeholder="No ingresado"/>
            </template>
            <template v-if="editProfile">
              <IonSelect v-model="newProfile.allergies" label="Restricciones alimenticias o alergias" label-placement="stacked" :multiple="true">
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
              <IonInput v-model="newProfile.allergies" label="Restricciones alimenticias o alergias" label-placement="stacked" placeholder="No ingresado"></IonInput>
            </template>
          </IonGrid>
        </IonItem>
      </template>
      <IonItem v-if="!editProfile">
        <IonButton @click="editProfileToggle()" size="small">Editar<IonIcon slot="start" :icon="pencil"></IonIcon></IonButton>
      </IonItem>
      <IonItem v-if="editProfile">
        <ion-button @click="updateProfile()">Guardar</ion-button>
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
