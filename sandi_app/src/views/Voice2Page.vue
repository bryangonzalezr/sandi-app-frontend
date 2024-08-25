<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/vue";
import { chevronBack, micOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useConvertersStore } from "@/stores";

const converseStore = useConvertersStore();
const { currentText, recordingvoice, recognitionText } = storeToRefs(useConvertersStore());

</script>


<template>
 <ion-page>
   <ion-header :traslucent="true" >
     <ion-toolbar>
      <ion-buttons slot="start">
       <ion-back-button default-href="/" :icon="chevronBack"></ion-back-button>
      </ion-buttons>
      <ion-title size="large">Pruebas de Voz</ion-title>
     </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid>message,
     <ion-col class="items-center">
       <ion-row class="items-center">
        <ion-input placeholder="Mensaje a leer" v-model="currentText"></ion-input>
       </ion-row>
       <ion-row class="items-center">
         <ion-button shape="round" class="h-12 w-12" @click="converseStore.VoicetoTextmob(currentText)">Leer Mensaje</ion-button>
       </ion-row>
       <ion-row class="items-center">
        <ion-button expand="full" :color="recordingvoice ? 'danger' : 'primary'">
         <ion-icon :icon="micOutline"></ion-icon>
         {{ recordingvoice ? 'Detener' : 'Empezar a escuchar' }}
       </ion-button>
    </ion-row>
    <div>{{ recognitionText }}</div>
     </ion-col>
    </ion-grid>
  </ion-content>
 </ion-page>
</template>