<script setup>
// Importar Componentes IONIC
import { 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  IonLabel, 
  IonIcon, 
  IonPage,
  IonFabButton,
  IonRouterOutlet,  
  onIonViewWillEnter 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { home, chatboxEllipsesOutline, person, calendarClearOutline, bookOutline, micOutline, micOffOutline } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useConvertersStore, useChatStore, useAuthStore} from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const chatStore = useChatStore();
const authStore = useAuthStore();
const converseStore = useConvertersStore();
const { recordingvoice, recognitionText } = storeToRefs(useConvertersStore());

// Definir variables referenciales o reactivas
const buttonRef = ref(null);
const rol = ref('')


// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Activa el microfono para consultar a asistente  */
const TalktoSandi = () => {
  converseStore.RecordingVoice();
};

/* Detiene el uso del microfono  */
const StopTalktoSandi = () => {
  converseStore.StopRecordingVoice();
}

/* Evento que vigila la varibale recordingvoice para verificar si se esta grabando la voz o no */
watch(recordingvoice, (newRecordingVoice, oldRecordingVoice) => {
  if(!newRecordingVoice  && oldRecordingVoice){
    chatStore.SendMessage(recognitionText.value);
    router.push('/chat');
  }
})

/* Evento que se ejecuta antes de cargar la página */
onIonViewWillEnter(() => {
  rol.value = authStore.rolUser
})

</script>

<template>
    <IonPage>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-fab-button @click="TalktoSandi()" ref="buttonRef" v-if="!recordingvoice">
              <IonIcon :icon="micOutline"></IonIcon>
            </ion-fab-button>
            <ion-fab-button @click="StopTalktoSandi()" ref="buttonRef" v-if="recordingvoice">
              <IonIcon :icon="micOffOutline"></IonIcon>
            </ion-fab-button>
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home">
                <IonIcon aria-hidden="true" :icon="home" />
                <IonLabel>Inicio</IonLabel>
              </ion-tab-button>
              <ion-tab-button tab="recipe" href="/recipe">
                <IonIcon aria-hidden="true" :icon="bookOutline" />
                <IonLabel>Recetas</IonLabel>
              </ion-tab-button>
              <ion-tab-button tab="menu" href="/menu">
                <IonIcon aria-hidden="true" :icon="calendarClearOutline" />
                <IonLabel>Menú</IonLabel>
              </ion-tab-button>
              <ion-tab-button tab="chat" href="/chat">
                <IonIcon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <IonLabel>Chat</IonLabel>
              </ion-tab-button>
              <ion-tab-button tab="patients" href="/patients" v-if="rol == 'nutricionista' || rol == 'superadmin'">
                <IonIcon aria-hidden="true" :icon="person"/>
                <IonLabel>Pacientes</IonLabel>
              </ion-tab-button>
              <ion-tab-button tab="profile" href="/profile">
                <IonIcon aria-hidden="true" :icon="person" />
                <IonLabel>Perfil</IonLabel>
              </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </IonPage>
</template>

<style scoped>
  ion-fab {
    bottom: 10%;
    right: 2%;
  }
</style>