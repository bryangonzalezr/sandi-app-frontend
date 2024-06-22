<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/vue";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { ScreenReader } from "@capacitor/screen-reader";
import { chevronBack, micOutline } from "ionicons/icons";
import { ref } from "vue";

SpeechRecognition.checkPermissions();
SpeechRecognition.requestPermissions();

const recordingvoice = ref(false);

const recognitionText = ref('');

const startRecognition = async () => {
    const { available } = await SpeechRecognition.available();

    if (available) {
        recordingvoice.value = true;
        SpeechRecognition.start();

        SpeechRecognition.addListener('partialResults', (data: any) => {
            console.log('partialResults was fired', data.value);
            if(data.value && data.value.length > 0){
                recognitionText.value = data.value[0];
            }
        });
    }

}

const stopRecognition = async () => {
    recordingvoice.value = false;
    await SpeechRecognition.stop();
}


const currentText = ref('');

const readText = async () => {
    await ScreenReader.speak({ language:"es", value: currentText.value });
    console.log(currentText);
    console.log(currentText.value);
    console.log("LEER MENSAJE:", currentText.value);
}


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
        <ion-input placeholder="Mensaje a leer" v-model="currentText" @ionChange=""></ion-input>
       </ion-row>
       <ion-row class="items-center">
         <ion-button shape="round" class="h-12 w-12" @click="readText()">Leer Mensaje</ion-button>
       </ion-row>
       <ion-row class="items-center">
        <ion-button expand="full" @click="startRecognition()" v-if="!recordingvoice">
            <ion-icon :icon="micOutline"></ion-icon>
            Empezar a escuchar
        </ion-button>
        <ion-button expand="full" @click="stopRecognition()" color="danger" v-if="recordingvoice">
            <ion-icon :icon="micOutline"></ion-icon>
            Detener
        </ion-button>
    </ion-row>
     </ion-col>
    </ion-grid>
  </ion-content>
 </ion-page>
</template>