<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/vue";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { chevronBack, micOutline } from "ionicons/icons";
import { onMounted, ref } from "vue";

const recordingvoice = ref(false);
const recognitionText = ref('');

const currentText = ref('');

const readText = async () => {
  await TextToSpeech.speak({
    text: currentText.value,
    lang: 'es-CL',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    category: 'ambient',
  });
}

const ToggleMic = () =>{
    recordingvoice.value = !recordingvoice.value;
  if(recordingvoice.value){
    console.log("Empezar grabación");
    SpeechRecognition.start({
      language: "es-CL",
      maxResults: 2,
      prompt: "Say something",
      partialResults: true,
      popup: false,
    });
  } else{
    console.log("Detener grabación");
    SpeechRecognition.stop();
  }
}

onMounted(() => {

    SpeechRecognition.available()

    SpeechRecognition.requestPermissions()
    SpeechRecognition.addListener("partialResults", (data: any) => {
        recognitionText.value = data.matches;
    });
})


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
    <ion-grid>
     <ion-col class="items-center">
       <ion-row class="items-center">
        <ion-input placeholder="Mensaje a leer" v-model="currentText"></ion-input>
       </ion-row>
       <ion-row class="items-center">
         <ion-button shape="round" class="h-12 w-12" @click="readText()">Leer Mensaje</ion-button>
       </ion-row>
       <ion-row class="items-center">
        <ion-button expand="full" @click="ToggleMic()" v-if="!recordingvoice">
            <ion-icon :icon="micOutline"></ion-icon>
            Empezar a escuchar
        </ion-button>
        <ion-button expand="full" @click="ToggleMic()" color="danger" v-if="recordingvoice">
            <ion-icon :icon="micOutline"></ion-icon>
            Detener
        </ion-button>
    </ion-row>
    <div>{{ recognitionText }}</div>
     </ion-col>
    </ion-grid>
  </ion-content>
 </ion-page>
</template>