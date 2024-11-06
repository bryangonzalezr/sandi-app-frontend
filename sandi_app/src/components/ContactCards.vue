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
    onIonViewWillEnter,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/vue';
import { chevronBack, location, chevronForward } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useContactCardsStore } from "@/stores";

const router = useRouter();

const contactCardsStore = useContactCardsStore();

const contactCards = ref([])

const ionInfinite = (ev) => {
  getData();
  setTimeout(() => ev.target.complete(), 500);
};

const getData = async () => {
  await contactCardsStore.IndexContactCards(false)
  contactCards.value = contactCardsStore.GetContactCards.data;
}

const goToBack = () => {
  router.push({name: 'Home'});
}

const ViewDetails = (id, color) => {
    router.push({name: 'ContactDetails', params: { id: id, color: color }});
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
                    <IonButton @click="goToBack">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Nutricionistas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="flex flex-col gap-y-11 p-6">
                <div 
                  v-for="(card,index) in contactCards" :key="card.id"
                  class="py-6 pl-8 pr-4 bg-light-green rounded-[50px] shadow-inner-lg flex items-center justify-between"
                  :class="index % 3 === 0 ? 'bg-light-green' : index % 3 === 1 ? 'bg-mid-red' : 'bg-light-orange'"
                >
                    <div class="flex flex-col gap-y-3">
                        <div class="font-PoppinsBold text-base">
                          {{ card.nutritionist_id.name }}  {{ card.nutritionist_id.last_name }}
                      </div>
                      <div class="text-xs">
                        {{ card.slogan }}
                      </div> 
                      <div class="text-xs flex items-center gap-x-1">
                        <IonIcon :icon="location"></IonIcon>
                        {{ card.address }}, {{ card.commune_id.name }}
                      </div>
                    </div>
                    <button class="text-white text-2xl text-center" @click="ViewDetails(card.id, index % 3 === 0 ? 'green' : index % 3 === 1 ? 'red' : 'orange')">
                        <IonIcon :icon="chevronForward"></IonIcon>
                    </button>
                </div>
                <IonInfiniteScroll @ionInfinite="ionInfinite">
                  <IonInfiniteScrollContent></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </div>
        </IonContent>
    </IonPage>
</template>