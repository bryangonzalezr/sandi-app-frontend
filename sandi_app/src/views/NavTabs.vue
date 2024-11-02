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
  onIonViewWillEnter, 
  IonContent,
  IonList,
  IonToolbar,
  IonTitle,
  IonMenu,
  menuController,
  IonHeader,
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

const goToSandi = async () => {
  router.push({name: 'ChatBot'});
  await menuController.close('chats-menu')
}

const goToChatNutri = async () => {
  router.push({name: 'ChatNutritionist'});
  await menuController.close('chats-menu')
}

const goToRecipes = async () => {
  router.push({name: 'RecipeList'});
  await menuController.close('saved-menu')
}

const goToMenus = async () => {
  router.push({name: 'MenuList'});
  await menuController.close('saved-menu')
}

/*Abre el menu de chats */
const openSavedMenu = async () => {
  await menuController.open('saved-menu')
}

/*Abre el menu de guardados (menus y recetas) */
const openChatsMenu = async () => {
  await menuController.open('chats-menu')
}

/* Evento que vigila la varibale recordingvoice para verificar si se esta grabando la voz o no */
watch(recordingvoice, (newRecordingVoice, oldRecordingVoice) => {
  if(!newRecordingVoice  && oldRecordingVoice){
    chatStore.SendMessage(recognitionText.value);
    router.push({name: 'ChatBot'});
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
        <IonMenu menu-id="saved-menu" content-id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Guardados</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <button @click="goToRecipes()" class="w-full">
                <div class="w-full border-b border-b-light-gray text-left p-4 hover:bg-light">Recetas guardadas</div>
              </button>
              <button @click="goToMenus()" class="w-full">
                <div class="w-full border-b border-b-light-gray text-left p-4 hover:bg-light">Menús guardados</div>
              </button>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonMenu menu-id="chats-menu" content-id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Chats</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <button @click="goToSandi()" class="w-full">
                <div class="w-full border-b border-b-light-gray text-left p-4 hover:bg-light">Chat con Sandi</div>
              </button>
              <button @click="goToChatNutri()" class="w-full">
                <div class="w-full border-b border-b-light-gray text-left p-4 hover:bg-light">Chat con Nutricionista</div>
              </button>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonTabBar slot="bottom" id="main-content">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" :icon="home" />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="recipe" href="/recipe" v-if="rol == 'usuario_basico'">
            <IonIcon aria-hidden="true" :icon="bookOutline" />
            <IonLabel>Recetas</IonLabel>
          </IonTabButton>
          <IonTabButton @click="openSavedMenu()" v-if="rol == 'paciente'">
            <IonIcon aria-hidden="true" :icon="calendarClearOutline" />
            <IonLabel>Guardados</IonLabel>
          </IonTabButton>
          <IonFabButton @click="TalktoSandi()" ref="buttonRef" v-if="!recordingvoice">
            <IonIcon :icon="micOutline"></IonIcon>
          </IonFabButton>
          <IonFabButton @click="StopTalktoSandi()" ref="buttonRef" v-if="recordingvoice">
            <IonIcon :icon="micOffOutline"></IonIcon>
          </IonFabButton>
          <IonTabButton tab="chatbot" href="/chat-asistente" v-if="rol == 'usuario_basico'">
            <IonIcon aria-hidden="true" :icon="chatboxEllipsesOutline" />
            <IonLabel>Sandi</IonLabel>
          </IonTabButton>
          <IonTabButton @click="openChatsMenu()" v-if="rol == 'paciente'">
            <IonIcon aria-hidden="true" :icon="chatboxEllipsesOutline" />
            <IonLabel>Chats</IonLabel>
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
ion-tab-button{
  --color-selected: var(--dark-red);
  --color-focused: var(--mid-red);
}

ion-fab-button{
  --background: var(--dark-red);
  --background-activated: var(--mid-red);
  --background-focused: var(--mid-red);
}

ion-item{
  width: 100%;
}
</style>