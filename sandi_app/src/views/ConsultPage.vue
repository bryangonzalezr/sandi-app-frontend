<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { useConsultStore } from '@/stores';

const consultStore = useConsultStore();

const { consulta } = storeToRefs(consultStore);

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Consulta</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard class="grid" color="secondary">
        <IonCardHeader><h1>Datos comunes</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-2 gap-2 py-2 justify-center content-center items-center">
              <IonInput v-model="consulta.datos.estatura" label="Estatura" label-placement="stacked"  placeholder="Ingresar estatura" type="number"></IonInput>
              <IonInput v-model="consulta.datos.peso" label="Peso" label-placement="stacked"  placeholder="Ingresar peso" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Plieges</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.plieges.biciptal" label="Biciptal"  label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.triciptal" label="Triciptal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.subescap" label="Sub Escap" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.supraespinal" label="Supraespinal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.supracres" label="Supra Cres" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.muslomedio" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.pantorrilla" label="Pantorilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.plieges.abdomen" label="Abdomen" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Perimetros</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.perimetros.pbrelajado" label="Pb Relajado" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.pbcontraido" label="Pb contraido" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.antebrazo" label="Antebrazo" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.muslomedio" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.pantorrilla" label="Pantorrilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.cintura" label="Cintura" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.perimetros.torax" label="Torax" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonButton @click="consultStore.saveConsult()" class="place-self-center">Almacenar consulta</IonButton>
      </IonCard>
    </IonContent>
  </IonPage>
</template>