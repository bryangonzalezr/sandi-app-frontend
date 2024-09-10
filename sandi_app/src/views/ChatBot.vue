<script setup>
import { ref, watchEffect  } from 'vue';
import { IonPage, IonHeader, IonFooter ,IonToolbar, IonTitle, IonContent, IonButtons, IonInput, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, micOutline, arrowForward } from 'ionicons/icons';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useChatStore, useConvertersStore } from "@/stores";

const router = useRouter();

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


const BackPage = () => {
    router.go(-1)
}

watchEffect(pushrecording, (newVal, oldVal) => {
  if (newVal === 'stopped' && oldVal !== 'stopped') {
    chatStore.sedMessage(recognitionText.value);
  }
});
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
              <IonButton shape="round" class="h-12 w-12" @click="UseMic()">
                <IonIcon slot="icon-only" class="text-white" :icon="micOutline" />
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
