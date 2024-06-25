<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores";

const profileStore = useProfileStore();
const { Profile } = storeToRefs(profileStore);

const ejercicio = ref('');

const newProfile = ref({ 
  nombre: '', 
  fechaNacimiento: '',
  edad: 0,
  sexo: '', 
  peso: 0, 
  intolerancias: '', 
  tabacoAlcohol: '',
  estatura: 0,
  imc: 0,
  nivel_actividad: '',
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
      <IonItem>
        <label>Nombre:</label>
        <IonInput v-model="newProfile.nombre" placeholder="Ingrese su nombre completo"></IonInput>
      </IonItem>
      <IonItem>
        <label>Edad:</label>
        <IonInput v-model.number="newProfile.edad" placeholder="Ingrese su edad" type="number"></IonInput>
      </IonItem>
      <IonItem>
        <label>Fecha de nacimiento:</label>
        <IonInput v-model="newProfile.fechaNacimiento" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
      </IonItem>
      <IonItem>
        <label>Sexo:</label>
        <IonSelect v-model="newProfile.sexo" placeholder="Selecciona tu sexo">
          <IonSelectOption value="Masculino">Masculino</IonSelectOption>
          <IonSelectOption value="Femenino">Femenino</IonSelectOption>
          <IonSelectOption value="Otro">Otro</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <label>Estatura:</label>
        <IonInput v-model.number="newProfile.estatura" placeholder="Ingrese su estatura, ej:1.6"></IonInput>
      </IonItem>
      <IonItem>
        <label>Peso:</label>
        <IonInput v-model.number="newProfile.peso" placeholder="Ingrese su peso"></IonInput>
      </IonItem>
      <IonItem>
        <label>Intolerancia o alergias:</label>
        <IonInput v-model="newProfile.intolerancias" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
      </IonItem>
      <IonItem>
        <label>Tabaco/Alcohol:</label>
        <IonSelect v-model="newProfile.tabacoAlcohol" placeholder="Selecciona opción">
          <IonSelectOption value="No">No</IonSelectOption>
          <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
          <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
          <IonSelectOption value="Ambos">Ambos</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <label>¿Realiza actividades físicas?</label>
        <IonSelect v-model="ejercicio" placeholder="Selecciona opción">
          <IonSelectOption value="Si">Si</IonSelectOption>
          <IonSelectOption value="No">No</IonSelectOption>
        </IonSelect>
      </IonItem>
      <template v-if="ejercicio == 'Si'">
        <IonItem>
          <label>¿Cuantás veces a la semana realiza ejercicio?</label>
          <IonSelect v-model="newProfile.nivel_actividad" placeholder="Selecciona opción">
            <IonSelectOption value="moderada">1-2 veces a la semana</IonSelectOption>
            <IonSelectOption value="pesada">3-5 veces a la semana</IonSelectOption>
          </IonSelect>
        </IonItem>
      </template>
      <template v-if="ejercicio == 'No'">
        <IonItem>
          <label>Caminata al día:</label>
          <IonSelect v-model="newProfile.nivel_actividad" placeholder="Selecciona opción">
            <IonSelectOption value="leve">Camino poco</IonSelectOption>
            <IonSelectOption value="moderada">Camino mucho</IonSelectOption>
          </IonSelect>
        </IonItem>
      </template>
      <IonItem>
        <div>IMC: {{ Profile.imc }}</div>
      </IonItem>
      <IonItem>
        <ion-button expand="full" @click="saveData()">
            Guardar
        </ion-button>
      </IonItem>
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
</style>
