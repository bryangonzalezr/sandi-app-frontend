<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/vue";
import { ScreenReader } from "@capacitor/screen-reader";
import { chevronBack, micOutline } from "ionicons/icons";
import { onMounted, ref } from "vue";

const recordingvoice = ref(false)
const recognitionText = ref('')

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition

const sr = new Recognition()

onMounted(() => {
  sr.continuous = true
  sr.interimResults = true
  sr.lang = "es-ES"

  sr.onstart = () => {
    recordingvoice.value = true
  }

  sr.onend = () => {
    recordingvoice.value = false
  }

  sr.onresult = (evt) => {
    const t = Array.from(evt.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    recognitionText.value = t
  }
})

const ToggleMic = () =>{
  if(recordingvoice.value){
    sr.onend()
    sr.stop()
  } else{
    sr.onstart()
    sr.start()
  }
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