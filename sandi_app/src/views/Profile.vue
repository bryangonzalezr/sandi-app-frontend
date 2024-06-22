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
        <IonInput v-model="nombre" @ionChange="saveData" placeholder="Ingrese su nombre completo"></IonInput>
      </IonItem>
      <IonItem>
        <label>Edad:</label>
        <IonInput v-model="edad" @ionChange="saveData" placeholder="Ingrese su edad" type="number"></IonInput>
      </IonItem>
      <IonItem>
        <label>Fecha de nacimiento:</label>
        <IonInput v-model="fechaNacimiento" @ionChange="saveData" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
      </IonItem>
      <IonItem>
        <label>Sexo:</label>
        <IonSelect v-model="sexo" @ionChange="saveData" placeholder="Selecciona tu sexo">
          <IonSelectOption value="Masculino">Masculino</IonSelectOption>
          <IonSelectOption value="Femenino">Femenino</IonSelectOption>
          <IonSelectOption value="Otro">Otro</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <label>Peso Habitual:</label>
        <IonInput v-model="pesoHabitual" @ionChange="saveData" placeholder="Ingrese su peso habitual"></IonInput>
      </IonItem>
      <IonItem>
        <label>Intolerancia o alergias:</label>
        <IonInput v-model="intolerancias" @ionChange="saveData" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
      </IonItem>
      <IonItem>
        <label>Tabaco/Alcohol:</label>
        <IonSelect v-model="tabacoAlcohol" @ionChange="saveData" placeholder="Selecciona opción">
          <IonSelectOption value="No">No</IonSelectOption>
          <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
          <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
          <IonSelectOption value="Ambos">Ambos</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <label>IMC:</label>
        <IonInput v-model="imc" @ionChange="saveData" placeholder="Ingrese su IMC"></IonInput>
      </IonItem>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const nombre = ref('');
const edad = ref('');
const fechaNacimiento = ref('');
const sexo = ref('');
const pesoHabitual = ref('');
const intolerancias = ref('');
const tabacoAlcohol = ref('');
const imc = ref('');

const loadData = () => {
  nombre.value = localStorage.getItem('nombre') || '';
  edad.value = localStorage.getItem('edad') || '';
  fechaNacimiento.value = localStorage.getItem('fechaNacimiento') || '';
  sexo.value = localStorage.getItem('sexo') || '';
  pesoHabitual.value = localStorage.getItem('pesoHabitual') || '';
  intolerancias.value = localStorage.getItem('intolerancias') || '';
  tabacoAlcohol.value = localStorage.getItem('tabacoAlcohol') || '';
  imc.value = localStorage.getItem('imc') || '';
};

const saveData = () => {
  localStorage.setItem('nombre', nombre.value);
  localStorage.setItem('edad', edad.value);
  localStorage.setItem('fechaNacimiento', fechaNacimiento.value);
  localStorage.setItem('sexo', sexo.value);
  localStorage.setItem('pesoHabitual', pesoHabitual.value);
  localStorage.setItem('intolerancias', intolerancias.value);
  localStorage.setItem('tabacoAlcohol', tabacoAlcohol.value);
  localStorage.setItem('imc', imc.value);
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
label {
  font-weight: bold;
  margin-right: 10px;
}
IonItem {
  margin-bottom: 10px;
}
</style>
