<script setup>
// Importar Componentes IONIC
import { 
  IonPage, 
  IonHeader, 
  IonFooter,
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonInput, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonIcon 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack, micOutline, arrowForward, micOffOutline } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
// Importar Stores
import { useChatStore, useConvertersStore, useAuthStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const converseStore = useConvertersStore();
const chatStore = useChatStore();
const authStore = useAuthStore();
const { recordingvoice, recognitionText } = storeToRefs(useConvertersStore()); 
const { messages } = storeToRefs(useChatStore());

// Definir variables referenciales o reactivas
const currentMessage = ref('');
const stopTexttospeech = ref(false);

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
const StopSandi = () => {
  stopTexttospeech.value = !stopTexttospeech.value
  chatStore.changeTexttospeech()
  console.log(stopTexttospeech.value)
  if(stopTexttospeech.value){
    converseStore.StopVoicetoTextmob()
  }
}

/* Envia un mensaje al asistente */
const sendMessage = () => {
  if(currentMessage.value != ''){
    chatStore.SendMessage(currentMessage.value, authStore.userInfo.id)
    currentMessage.value = ''
  }
}

/* Activa el microfono */
const UseMic = () => {
  converseStore.RecordingVoice();
}

/* Detiene el microfono */
const StopMic = () => {
  converseStore.StopRecordingVoice();
}

/* Vuelve a la última ruta que se visitó antes de ingresar a esta */
const BackPage = () => {
    router.push({name: 'Home'})
}

/* Evento que vigila la varibale recordingvoice para verificar si se esta grabando la voz o no */
watch(recordingvoice, (newRecordingVoice, oldRecordingVoice) => {
  if(!newRecordingVoice  && oldRecordingVoice){
    chatStore.SendMessage(recognitionText.value, authStore.userInfo.id);
  }
})
</script>

<template>
  <IonPage>
    <IonHeader :translucent="true" >
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="BackPage()">
            <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle size="large">Sandi</IonTitle>
        <IonButton slot="end" @click="StopSandi()" v-if="!stopTexttospeech">
          Silenciar a Sandi
        </IonButton>
        <IonButton slot="end" @click="StopSandi()" v-else>
          Escuchar a Sandi
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <template v-for="(message, index) in messages" :key="index">
        <div class="flex mb-2" :class="message.from == 'user' ? 'justify-end' : 'justify-start'" >
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]" :class="message.from == 'user' ? 'rounded-tr-none bg-lightgreen' : 'rounded-tl-none bg-darkgreen'">
            <div class="w-full" :class="message.from == 'user' ? 'text-black' : 'text-white'">{{ message.data }}</div>
          </div>
        </div>
      </template>
    </IonContent>
    <IonFooter class="bg-transparent">
      <IonGrid>
        <IonRow class="items-center">
          <IonCol class="bg-white  rounded-3xl text-black px-4 h-12 items-center flex">
            <IonInput placeholder="Escribele algo a Sandi" v-model="currentMessage"></IonInput>
          </IonCol>
          <IonCol size="auto">
            <template v-if="currentMessage == ''">
              <IonButton shape="round" class="h-12 w-12" @click="UseMic()" v-if="!recordingvoice">
                <IonIcon slot="icon-only" class="text-white" :icon="micOutline" />
              </IonButton>
              <IonButton shape="round" class="h-12 w-12" @click="StopMic()" v-if="recordingvoice">
                <IonIcon slot="icon-only" class="text-white" :icon="micOffOutline" />
              </IonButton>
            </template>
            <template v-else>
                <IonButton shape="round" class="h-12 w-12" @click="sendMessage()">
                  <IonIcon slot="icon-only" class="text-white" :icon="arrowForward" />
                </IonButton>
            </template>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonFooter>
  </IonPage>
</template>

<style lang="postcss" scope>
.positionMessage{
  display: flex;
  flex-direction: column;
  align-self: flex-end;
}
</style>
