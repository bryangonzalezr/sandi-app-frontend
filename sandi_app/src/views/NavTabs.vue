<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonFabButton, onIonViewWillEnter } from '@ionic/vue';
import { home, chatboxEllipsesOutline, person, calendarClearOutline, bookOutline, add } from 'ionicons/icons';
import { ref, watchEffect } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useConvertersStore, useChatStore, useAuthStore} from "@/stores";

const chatStore = useChatStore();
const authStore = useAuthStore();

const converseStore = useConvertersStore();
const { pushrecording, recognitionText } = storeToRefs(useConvertersStore());

const router = useRouter();

const buttonRef = ref(null);
const rol = ref('')

const TalktoSandi = () => {
  converseStore.RecordingVoice();
};

watchEffect(pushrecording, (newVal, oldVal) => {
  if (newVal === 'stopped' && oldVal !== 'stopped') {
    chatStore.sedMessage(recognitionText.value)
    router.push('/chat');
  }
});

onIonViewWillEnter(() => {
  rol.value = authStore.rolUser
})

</script>

<template>
    <IonPage>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-fab-button @click="TalktoSandi()" ref="buttonRef">
              <IonIcon :icon="add"></IonIcon>
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