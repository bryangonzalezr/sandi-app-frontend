<script setup>
import { ref, watch  } from 'vue';
import { IonPage, IonHeader, IonFooter ,IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, micOutline, arrowForward } from 'ionicons/icons';
import { storeToRefs } from "pinia";
import { useChatStore, useConvertersStore } from "@/stores";

const converseStore = useConvertersStore();
const { pushrecording, recognitionText } = storeToRefs(useConvertersStore());

const chatStore = useChatStore(); 
const { messages } = storeToRefs(useChatStore());

const currentMessage = ref('');

const sendMessage = () => {
  if(currentMessage.value != ''){
    chatStore.sedMessage(currentMessage.value)
    currentMessage.value = ''
  }
}

const UseMic = () => {
  converseStore.RecordingVoice();
}

watch(pushrecording, (newVal, oldVal) => {
  if (newVal === 'stopped' && oldVal !== 'stopped') {
    chatStore.sedMessage(recognitionText.value);
  }
});
</script>

<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" :icon="chevronBack"></ion-back-button>
        </ion-buttons>
        <ion-title size="large">Sandi</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <template v-for="(message, index) in messages" :key="index">
        <div class="flex mb-2" :class="message.from == 'user' ? 'justify-end' : 'justify-start'" >
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]" :class="message.from == 'user' ? 'rounded-tr-none bg-lightgreen' : 'rounded-tl-none bg-darkgreen'">
            <div class="w-full" :class="message.from == 'user' ? 'text-black' : 'text-white'">{{ message.data }}</div>
          </div>
        </div>
      </template>
    </ion-content>
    <ion-footer class="bg-transparent">
      <ion-grid>
        <ion-row class="items-center">
          <ion-col class="bg-white  rounded-3xl text-black px-4 h-12 items-center flex">
            <ion-input placeholder="Escribele algo a Sandi" v-model="currentMessage"></ion-input>
          </ion-col>
          <ion-col size="auto">
            <template v-if="currentMessage == ''">
              <ion-button shape="round" class="h-12 w-12" @click="UseMic()">
                <ion-icon slot="icon-only" class="text-white" :icon="micOutline" />
              </ion-button>
            </template>
            <template v-else>
                <ion-button shape="round" class="h-12 w-12" @click="sendMessage()">
                  <ion-icon slot="icon-only" class="text-white" :icon="arrowForward" />
                </ion-button>
            </template>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </ion-page>
</template>

<style lang="postcss" scope>
.positionMessage{
  display: flex;
  flex-direction: column;
  align-self: flex-end;
}
</style>
