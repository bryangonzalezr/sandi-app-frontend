<script setup>
// Modified imports to include nextTick
import { 
  IonPage, 
  IonHeader, 
  IonFooter,
  IonToolbar, 
  IonSpinner, 
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
const { messages, currentMessage } = storeToRefs(useChatStore());

// Add ref for content
const contentRef = ref(null);
const message = ref('');
const stopTexttospeech = ref(false);
const isLoading = ref(false)

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
  isLoading.value = true
  message.value = currentMessage.value
  if(currentMessage.value != ''){
    await chatStore.SendMessage(currentMessage.value);
    await scrollToBottom();
    currentMessage.value = '';
    isLoading.value = false
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
                <img src='@/theme/images/Logo_sandi_m.svg' alt="Sandi" className="w-12 h-12" />
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
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]" :class="message.from == 'user' ? 'rounded-tr-none bg-light-green' : 'rounded-tl-none bg-neutral-gray'">
            <div class="w-full" :class="message.from == 'user' ? 'text-black' : 'text-black'">{{ message.data }}</div>
          </div>
        </div>
      </template>
      <div class="flex mb-2 justify-start" v-if="isLoading">
        <div  class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%] rounded-tl-none bg-neutral-gray">
          <IonSpinner name="dots" color="danger"></IonSpinner>
        </div>
      </div>

    </IonContent>
    <IonFooter class="bg-transparent">
     
      <IonGrid>
        <IonRow class="items-center">
          <IonCol class="bg-white rounded-3xl text-black px-4 h-12 items-center flex">
            
            <IonInput 
              placeholder="Escribele algo a Sandi" 
              v-model="currentMessage"
              class="flex-1 custom-input"
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


ion-button{
  --background: var(--dark-red);
  --background-activated: var(--mid-red);
  --background-focused: var(--mid-red);
}

ion-input{
  --background: var(--light-gray);
  --background-focused: var(--mid-red);

  --border-color: var(--light-gray);
  --border-radius: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
}

.custom-input {
  /* Target the native input element */
  --highlight-color: var(--dark-red); /* Changes the highlight/focus color */
  --highlight-color-focused: var(--dark-red); /* Changes the focus indicator color */
  
  /* Optional: customize the focus state further */
  &::part(input) {
    &:focus {
      outline: none;
      border-color: var(--dark-red);
    }
  }
}

.loading-dots {
  display: flex;
  font-size: 1.5em;
}

.loading-dots span {
  animation: blink 1.2s infinite steps(1, start);
}

.loading-dots span:nth-child(1) { animation-delay: 0s; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>