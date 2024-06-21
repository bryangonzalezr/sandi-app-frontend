<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, micOutline, arrowForward } from 'ionicons/icons';
import { storeToRefs } from "pinia";
import { useChatStore } from "@/stores";
import { ref } from 'vue';

const chatStore = useChatStore();
const { messages } = storeToRefs(useChatStore());

const currentMessage = ref('');

const sendMessage = () => {
  if(currentMessage.value != ''){
    chatStore.sedMessage(currentMessage.value)
    currentMessage.value = ''
  }
}
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
        <div class="flex mb-2 justify-end" >
          <div class="flex px-2 py-3 bg-white rounded-2xl shadow-md rounded-tr-none max-w-[60%]">
            <div class="text-black w-full">{{ message.data }}</div>
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
            <ion-button shape="round" class="h-12 w-12" @click="sendMessage()">
              <template v-if="currentMessage == ''">
                <ion-icon slot="icon-only" class="text-white" :icon="micOutline" />
              </template>
              <template v-else>
                <ion-icon slot="icon-only" class="text-white" :icon="arrowForward" />
              </template>
            </ion-button>
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
