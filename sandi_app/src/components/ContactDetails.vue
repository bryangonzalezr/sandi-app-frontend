<script setup>
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons,  
    IonButton,
    IonIcon,
    onIonViewWillEnter
} from '@ionic/vue';
import { chevronBack, location } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useContactCardsStore } from "@/stores";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  color:{
    type: String,
    default: 'green'
  }
})

const router = useRouter();

const contactCardsStore = useContactCardsStore();

const contactDetails = ref({})
const nutritionistDetails = ref({})
const commune = ref({})
const experiences = ref([])

const goToBack = () => {
  router.push({name: 'ContactCards'});
}

const getData = async () => {
  await contactCardsStore.ShowContactCards(props.id)
  contactDetails.value = contactCardsStore.GetContactDetails;
  nutritionistDetails.value = contactDetails.value.nutritionist_id;
  commune.value = contactDetails.value.commune_id;
  experiences.value = contactDetails.value.experiences;
}

onIonViewWillEnter(() => {
  getData()
});
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="goToBack()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Nutricionistas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div 
              class="flex flex-col gap-y-3 m-6 py-6 pl-8 pr-4 bg-light-green rounded-[50px] shadow-inner-lg"
              :class="props.color == 'green' ? 'bg-light-green' : props.color == 'red' ? 'bg-mid-red' : 'bg-light-orange'"
            >
                <div class="border-b flex flex-col gap-y-3 pb-2">
                    <div class="font-PoppinsBold text-base">
                      {{ nutritionistDetails.name }} {{ nutritionistDetails.last_name }}
                    </div>
                    <div class="text-xs">
                      {{ contactDetails.slogan }}
                    </div> 
                    <div class="text-xs flex items-center gap-x-1">
                      <IonIcon :icon="location"></IonIcon>
                      {{ contactDetails.address }}, {{ commune.name }}
                    </div>
                </div>
                <div class="border-b flex flex-col gap-y-3 pb-2">
                  <div class="font-PoppinsBold">
                    Descripción
                  </div>
                  <div class="text-xs">
                    {{ contactDetails.description }}
                  </div>
                </div>
                <div class="border-b flex flex-col gap-y-3 pb-2">
                  <div class="font-PoppinsBold">
                    Especialidad Principal
                  </div>
                  <div class="text-xs">
                    • {{ contactDetails.specialties }}
                  </div>
                </div>
                <div class="border-b flex flex-col gap-y-3 pb-2">
                  <div class="font-PoppinsBold">
                    Experiencia
                  </div>
                  <ul class="text-xs flex flex-col gap-y-2">
                    <li 
                      v-for="(experience, index) in experiences" :key="index"
                    >
                      <div class="flex gap-x-1">
                        <div>•</div>
                        <div class="flex flex-col">
                          <div>{{ experience.title }} en {{ experience.institution }} </div>
                          <div class="opacity-60">{{ experience.start_date }} - {{ experience.end_date ? experience.end_date : 'En curso' }}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="flex flex-col gap-y-3 pb-2">
                  <div class="font-PoppinsBold">
                    Contacto
                  </div>
                  <div class="text-xs flex flex-col gap-y-2">
                    <div class="flex gap-x-1">
                      <div class="font-PoppinsBold">Email:</div>
                      <div class="pl-2">{{ contactDetails.email }}</div>
                    </div>
                    <div class="flex gap-x-1">
                      <div class="font-PoppinsBold">Celular:</div>
                      <div class="pl-2">{{ contactDetails.phone_number }}</div>
                    </div>
                  </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
