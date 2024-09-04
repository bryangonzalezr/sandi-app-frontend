<script setup>
import { IonPage, IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox, onIonViewWillEnter } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { useConsultStore } from '@/stores';
import { useRouter } from 'vue-router';

const props = defineProps({
  id : {
    type: Number,
    required: true
  }
});

const router = useRouter();

const returnToPatients = () =>{
  router.push({ name: "Patients"})
};

const consultStore = useConsultStore();

const { consulta } = storeToRefs(consultStore);



</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton @click="returnToPatients()" :icon="chevronBack"></IonBackButton>
        </IonButtons>
        <IonTitle>Consulta Paciente {{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard class="grid" color="secondary">
        <IonCardHeader><h1>Datos comunes</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-2 gap-2 py-2 justify-center content-center items-center">
              <IonInput v-model="consulta.date" label="Fecha de consulta" label-placement="stacked" type="date"></IonInput>
              <div></div>
              <IonInput v-model="consulta.height" label="Estatura" label-placement="stacked"  placeholder="Ingresar estatura" type="number"></IonInput>
              <IonInput v-model="consulta.weight" label="Peso" label-placement="stacked"  placeholder="Ingresar peso" type="number"></IonInput>
            </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Plieges</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.bicipital_skinfold" label="Biciptal"  label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.tricipital_skinfold" label="Triciptal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.subscapular_skinfold" label="Sub Escap" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.supraspinal_skinfold" label="Supraespinal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.suprailiac_skinfold" label="Supra Cres" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thigh_skinfold" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.calf_skinfold" label="Pantorilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.abdomen_skinfold" label="Abdomen" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Perimetros</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.pb_relaj" label="Pb Relajado" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.pb_contra" label="Pb contraido" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.forearm" label="Antebrazo" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thigh" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.calf" label="Pantorrilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.waist" label="Cintura" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thorax" label="Torax" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonButton @click="consultStore.saveConsult()" class="place-self-center">Almacenar consulta</IonButton>
      </IonCard>
    </IonContent>
  </IonPage>
</template>