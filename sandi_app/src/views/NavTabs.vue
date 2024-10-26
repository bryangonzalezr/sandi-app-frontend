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
const nutritionist = ref(false)

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
  if(authStore.userInfo.nutritionist){
    nutritionist.value = true
  }
})

</script>

<template>
    <IonPage>
        <IonTabs>
            <IonRouterOutlet></IonRouterOutlet>
            <IonFabButton @click="TalktoSandi()" ref="buttonRef" v-if="!recordingvoice">
              <IonIcon :icon="micOutline"></IonIcon>
            </IonFabButton>
            <IonFabButton @click="StopTalktoSandi()" ref="buttonRef" v-if="recordingvoice">
              <IonIcon :icon="micOffOutline"></IonIcon>
            </IonFabButton>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" :icon="home" />
                <IonLabel>Inicio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="recipe" href="/recipe">
                <IonIcon aria-hidden="true" :icon="bookOutline" />
                <IonLabel>Recetas</IonLabel>
              </IonTabButton>
              <IonTabButton tab="menu" href="/menu">
                <IonIcon aria-hidden="true" :icon="calendarClearOutline" />
                <IonLabel>Menú</IonLabel>
              </IonTabButton>
              <IonTabButton tab="chatbot" href="/chat-asistente">
                <IonIcon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <IonLabel>Sandi</IonLabel>
              </IonTabButton>
              <IonTabButton v-if="nutritionist" tab="chatnutri" href="/chat-nutricionista">
                <IonIcon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <IonLabel>Nutricionista</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon aria-hidden="true" :icon="person" />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
        </IonTabs>
    </IonPage>
</template>

<style scoped>
  ion-fab {
    bottom: 10%;
    right: 2%;
  }
</style>