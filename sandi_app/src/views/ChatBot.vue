<script setup>
// Modified imports to include nextTick
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
import { chevronBack, micOutline, arrowForward, micOffOutline, volumeMute, volumeHigh, happyOutline } from 'ionicons/icons';
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useChatStore, useConvertersStore, useAuthStore } from "@/stores";

const router = useRouter();
const converseStore = useConvertersStore();
const chatStore = useChatStore();
const authStore = useAuthStore();
const { recordingvoice, recognitionText } = storeToRefs(useConvertersStore()); 
const { messages } = storeToRefs(useChatStore());

// Add ref for content
const contentRef = ref(null);

const currentMessage = ref('');
const stopTexttospeech = ref(false);

// Modified scroll function to be more robust
const scrollToBottom = async () => {
  try {
    if (contentRef.value) {
      await nextTick();
      const content = contentRef.value.$el;
      await content.scrollToBottom(300);
    }
  } catch (error) {
    console.error('Error scrolling to bottom:', error);
  }
};

// Modified watcher to be more reliable
watch(messages, async () => {
  try {
    await scrollToBottom();
  } catch (error) {
    console.error('Error in messages watcher:', error);
  }
}, { deep: true });

const StopSandi = () => {
  stopTexttospeech.value = !stopTexttospeech.value;
  chatStore.changeTexttospeech();
  if(stopTexttospeech.value){
    converseStore.StopVoicetoTextmob();
  }
};

const sendMessage = async () => {
  if(currentMessage.value != ''){
    await chatStore.SendMessage(currentMessage.value);
    currentMessage.value = '';
    await scrollToBottom();
  }
};

const UseMic = () => {
  converseStore.RecordingVoice();
};

const StopMic = () => {
  converseStore.StopRecordingVoice();
};

const BackPage = () => {
  router.push({name: 'Home'});
};

const ChatFooter = () => {
  const showEmojiPicker = ref(false);
  
  const onEmojiSelect = (emoji) => {
    currentMessage.value += emoji.native;
    showEmojiPicker.value = false;
  };
};

watch(recordingvoice, async (newRecordingVoice, oldRecordingVoice) => {
  if(!newRecordingVoice && oldRecordingVoice){
    await chatStore.SendMessage(recognitionText.value, authStore.userInfo.id);
    await scrollToBottom();
  }
});
</script>


<template>
  <IonPage >
    <IonHeader className="border-b border-gray-200 bg-white">
        <IonToolbar className="px-4">
          <div className="flex items-center justify-between">
            
            <IonButtons slot="start">
              <IonButton @Click="BackPage()" className="text-gray-600">
                <div className="flex flex-col items-center">
                  <IonIcon :icon="chevronBack" className="h-6 w-6" />
                  <span className="text-xs mt-1">Atrás</span>
                </div>
              </IonButton>
            </IonButtons>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mb-2">
                <img src='../assets/SandiPfp.png' alt="Sandi" className="w-12 h-12" />
              </div>
              <h1 className="text-xl font-medium">Sandi</h1>
            </div>

            <IonButtons slot="end">
              <div className="flex items-center justify-between">

              <IonButton @Click="StopSandi()" className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                  <IonIcon 
                  :icon="stopTexttospeech ? volumeMute : volumeHigh"
                  className="h-6 w-6"
                  />
                  <span className="text-xs mt-1">
                    {{ stopTexttospeech ? 'Desmutear' : 'Mutear' }}
                  </span>

                </div>
                
              </IonButton>
              </div>
            </IonButtons>
            
          </div>
        </IonToolbar>
        
    </IonHeader>

    <IonContent ref="contentRef" class="bg-white">
      <template v-for="(message, index) in messages" :key="index">
        <div class="flex mb-2" :class="message.from == 'user' ? 'justify-end' : 'justify-start'" >
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]" :class="message.from == 'user' ? 'rounded-tr-none bg-lightgreen' : 'rounded-tl-none bg-grey'">
            <div class="w-full" :class="message.from == 'user' ? 'text-black' : 'text-black'">{{ message.data }}</div>
          </div>
        </div>
      </template>
    </IonContent>
    <IonFooter class="bg-transparent">
     
      <IonGrid>
        <IonRow class="items-center">
          <IonCol class="bg-white rounded-3xl text-black px-4 h-12 items-center flex">
            <IonButton 
              fill="clear"
              class="h-8 w-8 mr-2"
            >
              <IonIcon slot="icon-only" :icon="happyOutline" />
            </IonButton>
            <IonInput 
              placeholder="Escribele algo a Sandi" 
              v-model="currentMessage"
              class="flex-1"
            />
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