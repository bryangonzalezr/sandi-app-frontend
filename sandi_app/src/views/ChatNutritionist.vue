<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonFooter,
  IonToolbar, 
  IonContent, 
  IonButtons,
  IonGrid, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonIcon,
  IonTextarea,
  onIonViewWillEnter 
} from '@ionic/vue';
import { chevronBack, arrowForward } from 'ionicons/icons';
import { ref, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';
import { echo } from "@/plugins/reverb";
import { storeToRefs } from "pinia";
import { useChatNutritionistStore, useAuthStore } from "@/stores";

const router = useRouter();
const chatStore = useChatNutritionistStore();
const authStore = useAuthStore();
const authUser = localStorage.getItem('user');
const currentUser = JSON.parse(authUser.toString());
const { messages } = storeToRefs(useChatNutritionistStore());
const messagesContainer = ref(null);
const isNutritionistTyping = ref(false);
const isNutritionistTypingTimer = ref(null);
const nutritionist = ref({});
const isLoading = ref(true);
const pendingMessages = ref(new Set());
const form = ref({
    message: ''
});

// Maximum characters constant
const MAX_CHARS = 256;
const remainingChars = computed(() => MAX_CHARS - (form.value.message?.length || 0));

// Format date/time functions
const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};

// Group messages by date
const groupedMessages = computed(() => {
    const groups = {};
    messages.value.forEach(message => {
        const date = formatDate(message.created_at);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
    });
    return groups;
});

const BackPage = () => {
    router.push({name: 'Home'});
};

const getData = async (receiver_id) => {
    isLoading.value = true;
    try {
        await chatStore.ShowMessageNutritionist(receiver_id);

        // Reset any existing Echo listeners
        echo.private(`chat.${currentUser.id}`).stopListening('MessageSent');
        
        // Set up new Echo listeners
        echo.private(`chat.${currentUser.id}`)
            .listen('MessageSent', (response) => {
                messages.value.push(response.message);
            })
            .listenForWhisper("typing", (response) => {
                isNutritionistTyping.value = response.userID === nutritionist.value.id;

                if (isNutritionistTypingTimer.value) {
                    clearTimeout(isNutritionistTypingTimer.value);
                }

                isNutritionistTypingTimer.value = setTimeout(() => {
                    isNutritionistTyping.value = false;
                }, 1000);
            });
    } finally {
        isLoading.value = false;
    }
};

const sendMessage = async () => {
    if (!form.value.message.trim()) return;

    // Create temporary message object
    const tempMessage = {
        id: `temp-${Date.now()}`,
        text: form.value.message,
        sender_id: currentUser.id,
        receiver_id: nutritionist.value.id,
        created_at: new Date().toISOString(),
        pending: true
    };

    // Add to pending set
    pendingMessages.value.add(tempMessage.id);

    // Add message to local state immediately
    messages.value.push(tempMessage);

    // Clear input
    form.value.message = '';

    try {
        // Send to API
        await chatStore.SendMessageNutritionist(
            tempMessage.text,
            nutritionist.value.id
        );

        // Remove temporary message
        const messageIndex = messages.value.findIndex(m => m.id === tempMessage.id);
        if (messageIndex !== -1) {
            messages.value.splice(messageIndex, 1);
        }

        // Remove from pending set
        pendingMessages.value.delete(tempMessage.id);

        // Refresh messages
        await chatStore.ShowMessageNutritionist(nutritionist.value.id);
    } catch (error) {
        // Handle error - mark message as failed
        const messageIndex = messages.value.findIndex(m => m.id === tempMessage.id);
        if (messageIndex !== -1) {
            messages.value[messageIndex] = {
                ...tempMessage,
                pending: false,
                failed: true
            };
        }
        pendingMessages.value.delete(tempMessage.id);
        console.error('Failed to send message:', error);
    }
};

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
    nutritionist.value = authStore.userInfo.nutritionist;
    getData(authStore.userInfo.nutritionist.id);
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
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="BackPage()">
            <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-beige rounded-full flex items-center justify-center mb-2">
            <img src="@/theme/images/profile_user2.png" alt="Profile" class="w-12 h-12" />
          </div>
          <h1 class="text-xl font-medium">
            Nutricionista {{ nutritionist.name }} {{ nutritionist.last_name }}
          </h1>
        </div>
      </IonToolbar>
    </IonHeader>

    <IonContent ref="messagesContainer">
      <!-- Loading Screen -->
      <div v-if="isLoading" class="h-full flex items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <ion-spinner name="circular"></ion-spinner>
          <p class="text-gray-600 text-lg">Cargando mensajes...</p>
        </div>
      </div>

      <!-- Messages Content -->
      <div v-else class="mt-2 snap-end">
        <template v-for="(messageGroup, date) in groupedMessages" :key="date">
          <div class="flex justify-center my-4">
            <div class="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-600">
              {{ date }}
            </div>
          </div>

          <template v-for="message in messageGroup" :key="message.id">
            <div class="flex mb-2" :class="message.sender_id === currentUser.id ? 'justify-end' : 'justify-start'">
              <div
                  class="message-wrapper relative mb-6"
                  :class="message.sender_id === currentUser.id ? 'flex-row-reverse' : ''"
                >
                  <div
                    class="message-bubble flex px-2 py-3 rounded-2xl shadow-md max-w-[60%]"
                    :class="[
                      message.sender_id === currentUser.id ? 'rounded-tr-none bg-light-green' : 'rounded-tl-none bg-neutral-gray',
                      { 'opacity-70': message.pending },
                      { 'bg-red-100': message.failed }
                    ]"
                  >
                    <div class="w-full text-black">{{ message.text }}</div>
                    <div v-if="message.pending" class="text-xs text-gray-500">Enviando...</div>
                    <div v-if="message.failed" class="text-xs text-red-500">Error al enviar. Toca para reintentar.</div>
                  </div>
                  <div
                    class="message-timestamp"
                  >
                    {{ formatTime(message.created_at) }}
                  </div>
                </div>
            </div>
          </template>
        </template>

        <!-- Typing indicator -->
        <div class="flex mb-2 justify-start" v-if="isNutritionistTyping">
          <div class="flex px-2 py-3 rounded-2xl shadow-md max-w-[60%] rounded-tl-none bg-neutral-gray opacity-70">
            <div class="w-full text-black">{{ nutritionist.name }} está escribiendo...</div>
          </div>
        </div>
      </div>
    </IonContent>

    <IonFooter class="bg-transparent">
      <IonGrid>
        <IonRow class="items-end">
          <IonCol class="bg-white rounded-3xl text-black px-4 py-2 flex items-end">
            <div class="flex-1 relative">
              <IonTextarea
                v-model="form.message"
                placeholder="Mensaje"
                class="custom-textarea custom-input"
                :maxlength="MAX_CHARS"
                :rows="1"
                :auto-grow="true"
                @keypress="handleKeyPress"
                @ionInput="sendTypingEvent"
              />
              <div 
                v-if="form.message"
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
              @click="sendMessage" 
              :disabled="!form.message?.trim()"
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
  bottom: -1.5rem; /* positions timestamp below the bubble */
  font-size: 0.75rem;
  color: #6b7280;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
/* Center timestamp below the message bubble for sender and receiver */
.sender {
  right: 0;
  transform: translateX(50%);
}

.receiver {
  left: 8;
  transform: translateX(-50%);
}

/* Show timestamp on hover */
.message-wrapper:hover .message-timestamp,
.message-wrapper:active .message-timestamp {
  opacity: 1;
}

.message-wrapper.flex-row-reverse .message-timestamp {
  left: -2rem;
}

.message-wrapper:not(.flex-row-reverse) .message-timestamp {
  right: -2rem;
}

.message-wrapper:hover .message-timestamp,
.message-wrapper:active .message-timestamp {
  opacity: 1;
}

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
  --highlight-color: var(--dark-red);
  --highlight-color-focused: var(--dark-red);
  
  &::part(input) {
    &:focus {
      outline: none;
      border-color: var(--dark-red);
    }
  }
}
</style>