<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonFabButton, useIonRouter } from '@ionic/vue';
import { home, chatboxEllipsesOutline, person, calendarClearOutline, bookOutline, add, clipboard, clipboardOutline} from 'ionicons/icons';
import { ref, watch } from 'vue';
import { storeToRefs } from "pinia";

import { useConvertersStore, useChatStore } from "@/stores";

const chatStore = useChatStore();

const converseStore = useConvertersStore();
const { pushrecording, recognitionText } = storeToRefs(useConvertersStore());

const ionRouter = useIonRouter();

const buttonRef = ref(null);

const TalktoSandi = () => {
  converseStore.RecordingVoice();
};

watch(pushrecording, (newVal, oldVal) => {
  if (newVal === 'stopped' && oldVal !== 'stopped') {
    chatStore.sedMessage(recognitionText.value)
    ionRouter.push('/chat');
  }
});

</script>

<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home">
                <ion-icon aria-hidden="true" :icon="home" />
                <ion-label>Inicio</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="recipe" href="/recipe">
                <ion-icon aria-hidden="true" :icon="bookOutline" />
                <ion-label>Recetas</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="menu" href="/menu">
                <ion-icon aria-hidden="true" :icon="calendarClearOutline" />
                <ion-label>Menú</ion-label>
              </ion-tab-button>
              <ion-fab-button @click="TalktoSandi()" ref="buttonRef">
                <ion-icon :icon="add"></ion-icon>
              </ion-fab-button>
              <ion-tab-button tab="chat" href="/chat">
                <ion-icon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <ion-label>Chat</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="patients" href="/patients">
                <ion-icon aria-hidden="true" :icon="person"/>
                <ion-label>Pacientes</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="profile" href="/profile">
                <ion-icon aria-hidden="true" :icon="person" />
                <ion-label>Perfil</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="consult" href="/consult">
                <ion-icon aria-hidden="true" :icon="clipboardOutline"></ion-icon>
                <ion-label>Consult</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<style scoped>
  ion-fab {
    bottom: 10%;
    right: 2%;
  }
</style>