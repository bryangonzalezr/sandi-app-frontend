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
  IonIcon,
  onIonViewWillEnter 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack, arrowForward } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { echo } from "@/plugins/reverb";
import { storeToRefs } from "pinia";
// Importar Stores
import { useChatNutritionistStore, useAuthStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const chatStore = useChatNutritionistStore();
const authStore = useAuthStore();
const { messages } = storeToRefs(useChatNutritionistStore());
const authUser = localStorage.getItem('user')
const currentUser = JSON.parse(authUser.toString());

// Definir variables referenciales o reactivas
const currentMessage = ref('');
const nutritionist = ref({})
const messagesContainer = ref(null);
// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Vuelve a la última ruta que se visitó antes de ingresar a esta */
const BackPage = () => {
    router.push({name: 'Home'})
}

const getData = async (receiver_id) => {
    await chatStore.ShowMessageNutritionist(receiver_id)
    
    messages.value = chatStore.GetMessages;

    echo.private(`chat.${currentUser.id}`)
        .listen('MessageSent', (response) => {
          messages.value.push(response.message)
        })
}

const sendMessage = async () => {
    await chatStore.SendMessageNutritionist(currentMessage.value, nutritionist.value.id)
    currentMessage.value = ''
}

/* Evento que se ejecuta antes de cargar la página */
onIonViewWillEnter(() => {
  nutritionist.value = authStore.userInfo.nutritionist
  getData(authStore.userInfo.nutritionist.id)
  
});

watch(
            messages,
            () => {
                nextTick(() => {
                    messagesContainer.value.$el.scrollToBottom(500);
                });
            },
            { deep: true }
        );
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
        <IonTitle size="large">Nutricionista {{ nutritionist.name }} {{ nutritionist.last_name }} </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent ref="messagesContainer">
      <div class="mt-2 snap-end" >
        <template v-for="(message, index) in messages" :key="index">
          <div class="flex mb-2" :class="message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'" >
            <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]" :class="message.sender_id === currentUser.id ? 'rounded-tr-none bg-lightgreen' : 'rounded-tl-none bg-darkgreen'">
              <div class="w-full" :class="message.sender_id === currentUser.id ? 'text-black' : 'text-white'">{{ message.text }}</div>
            </div>
          </div>
        </template>
      </div>
    </IonContent>
    <IonFooter class="bg-transparent">
      <IonGrid>
        <IonRow class="items-center">
          <IonCol class="bg-white  rounded-3xl text-black px-4 h-12 items-center flex">
            <IonInput placeholder="Mensaje" v-model="currentMessage"></IonInput>
          </IonCol>
          <IonCol size="auto">
            <IonButton shape="round" class="h-12 w-12" @click="sendMessage()" :disabled="currentMessage == ''">
              <IonIcon slot="icon-only" class="text-white" :icon="arrowForward" />
            </IonButton>
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
