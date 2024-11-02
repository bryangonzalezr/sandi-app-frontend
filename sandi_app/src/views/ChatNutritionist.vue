<script setup>
// Previous imports remain the same
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
  IonTextarea,  // Add this import
  onIonViewWillEnter 
} from '@ionic/vue';
import { chevronBack, arrowForward, happyOutline } from 'ionicons/icons';
import { ref, watch, nextTick, computed } from 'vue';  // Add computed
import { useRouter } from 'vue-router';
import { echo } from "@/plugins/reverb";
import { storeToRefs } from "pinia";
import { useChatNutritionistStore, useAuthStore } from "@/stores";

// Previous setup code remains the same
const router = useRouter();
const chatStore = useChatNutritionistStore();
const authStore = useAuthStore();
const authUser = localStorage.getItem('user')
const currentUser = JSON.parse(authUser.toString());
const currentMessage = ref('');
const nutritionist = ref({})
const { messages } = storeToRefs(useChatNutritionistStore());
const messagesContainer = ref(null);
const isNutritionistTyping = ref(false);
const isNutritionistTypingTimer = ref(null);

// Add computed property for remaining characters
const MAX_CHARS = 256;
const remainingChars = computed(() => {
  return MAX_CHARS - (currentMessage.value?.length || 0);
});

// Add function to handle input height
const adjustInputHeight = (event) => {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

// Previous functions remain the same
const BackPage = () => {
    router.push({name: 'Home'})
}

const getData = async (receiver_id) => {
    await chatStore.ShowMessageNutritionist(receiver_id)

    echo.private(`chat.${currentUser.id}`)
        .listen('MessageSent', (response) => {
          messages.value.push(response.message)
        }).listenForWhisper("typing", (response) => {
        isNutritionistTyping.value = response.userID === nutritionist.value.id;

        if (isNutritionistTypingTimer.value) {
            clearTimeout(isNutritionistTypingTimer.value);
        }

        isNutritionistTypingTimer.value = setTimeout(() => {
            isNutritionistTyping.value = false;
        }, 1000);
    });
}

const sendMessage = async () => {
    if (currentMessage.value.trim()) {
        await chatStore.SendMessageNutritionist(currentMessage.value, nutritionist.value.id)
        currentMessage.value = ''
    }
}

// Add handler for Enter key
const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
};

const sendTypingEvent = () => {
    echo.private(`chat.${nutritionist.value.id}`).whisper("typing", {
        userID: currentUser.id,
    });
};

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
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mb-2">
              <img src='../assets/SandiPfp.png' alt="Sandi" className="w-12 h-12" />
            </div>
            <h1 className="text-xl font-medium">
              Nutricionista {{ nutritionist.name }} {{ nutritionist.last_name }} 
            </h1>
        </div>
        <IonButtons slot="end">
          <IonButton style="visibility: hidden;">
            <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>

        <IonTitle size="large">
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent ref="messagesContainer">
      <div class="mt-2 snap-end">
        <div class="flex mb-2 justify-start" v-if="messages.length === 0 && isNutritionistTyping">
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%] rounded-tl-none bg-darkgreen opacity-70">
            <div class="w-full text-white text-small">{{ nutritionist.name }} está escribiendo...</div>
          </div>
        </div>
        <template v-for="(message, index) in messages" :key="index">
          <!-- Date separator -->
          <div v-if="index === 0 || new Date(message.created_at).getTime() - new Date(messages[index - 1].created_at).getTime() > 600000" 
               class="text-center text-gray-500 text-xs my-2">
            {{ new Date(message.created_at).toLocaleDateString() }}
          </div>
          
          <!-- Message bubble with timestamp -->
          <div class="flex mb-2" :class="message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'">
            <div class="message-wrapper relative" :class="message.sender_id === currentUser.id ? 'flex-row-reverse' : ''">
              <div class="message-bubble flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]"
                   :class="message.sender_id === currentUser.id ? 'rounded-tr-none bg-light-green' : 'rounded-tl-none bg-neutral-gray'">
                <div class="w-full" :class="message.sender_id === currentUser.id ? 'text-black' : 'text-black'">
                  {{ message.text }}
                </div>
              </div>
              <div class="message-timestamp">
                {{ new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </div>
            </div>
          </div>
        </template>
        
        <!-- Typing indicator -->
        <div class="flex mb-2 justify-start" v-if="messages.length !== 0 && isNutritionistTyping">
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%] rounded-tl-none bg-neutral-gray opacity-70">
            <div class="w-full text-white text-small">{{ nutritionist.name }} está escribiendo...</div>
          </div>
        </div>
      </div>
    </IonContent>
    <IonFooter class="bg-transparent">
      <IonGrid>
        <IonRow class="items-end"> <!-- Changed from items-center to items-end -->
          <IonCol class="bg-white rounded-3xl text-black px-4 py-2 flex items-end"> <!-- Added py-2 and items-end -->
            
            <div class="flex-1 relative">
              <IonTextarea
                placeholder="Mensaje"
                v-model="currentMessage"
                class="custom-textarea custom-input"
                :maxlength="MAX_CHARS"
                :rows="1"
                :auto-grow="true"
                @keypress="handleKeyPress"
                @ionInput="adjustInputHeight($event)"
              />
              <div 
                v-if="currentMessage"
                class="absolute right-2 bottom-2 rounded-full bg-gray-200 w-6 h-6 flex items-center justify-center text-xs text-gray-500"
              >
                {{ remainingChars }}
              </div>
            </div>
          </IonCol>
          <IonCol size="auto">
            <IonButton 
              shape="round" 
              class="h-12 w-12" 
              @click="sendMessage()" 
              :disabled="!currentMessage?.trim()"
            >
              <IonIcon slot="icon-only" class="text-white" :icon="arrowForward" />
            </IonButton>
            
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonFooter>
  </IonPage>
</template>

<style lang="postcss" scoped>
.message-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.message-bubble {
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  transition: margin 0.3s ease;
}

.message-timestamp {
  position: absolute;
  opacity: 0;
  font-size: 0.75rem;
  color: #6b7280;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* Position timestamps differently based on message sender */
.message-wrapper:has(.message-bubble) {
  display: flex;
  align-items: center;
}

.message-wrapper.flex-row-reverse .message-timestamp {
  left: -4rem;
}

.message-wrapper:not(.flex-row-reverse) .message-timestamp {
  right: -4rem;
}

/* Show timestamp on scroll */
.message-wrapper:hover .message-timestamp,
.message-wrapper:active .message-timestamp {
  opacity: 1;
}

/* Adjust spacing when timestamp is visible */
.message-wrapper:hover .message-bubble,
.message-wrapper:active .message-bubble {
  margin-left: var(--timestamp-spacing, 0);
  margin-right: var(--timestamp-spacing, 0);
}

@media (max-width: 640px) {
  .message-wrapper.flex-row-reverse .message-timestamp {
    left: -3rem;
  }
  
  .message-wrapper:not(.flex-row-reverse) .message-timestamp {
    right: -3rem;
  }
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
</style>