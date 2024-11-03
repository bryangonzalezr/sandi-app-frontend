<script setup>
import { 
    IonContent, 
    IonHeader, 
    IonPage,
    IonButtons,
    IonButton,  
    IonTitle, 
    IonToolbar, 
    IonIcon,
    onIonViewWillEnter,
    IonSpinner
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

const profileStore = useProfileStore();

const pauta = ref({})
const isLoading = ref(false)

const BackPage = () => {
    router.go(-1)
}

const getData = async () => {
    isLoading.value = true;
    await profileStore.ShowPauta(props.id);
    pauta.value = profileStore.GetPauta;
    isLoading.value = false;
    console.log(pauta.value)
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
                    <IonButton @click="BackPage()">
                        <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Pauta Nutricional</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="flex flex-col p-4 gap-y-2">
                <div class="text-base opacity-60">
                    Comidas del día
                </div>
                <div v-if="isLoading" class="w-full flex justify-center">
                    <IonSpinner name="dots" color="danger"></IonSpinner>
                </div>
                <div v-else class="flex flex-col gap-y-4">
                    <template v-for="(service, index) in ['desayuno', 'almuerzo', 'colacion','once', 'cena' ]" :key="index">
                        <div
                            v-if="pauta[service] != null"
                            class="bg-light-violet p-4 rounded-lg"
                        >
                            <div class="font-PoppinsBold text-base capitalize">{{ service }}</div>
                            <div class="text-xs">{{ pauta[service] }}</div>
                        </div>
                    </template>
                </div>
                <div class="text-base opacity-60">
                    Recomendaciones
                </div>
                <div v-if="isLoading" class="w-full flex justify-center">
                    <IonSpinner name="dots" color="danger"></IonSpinner>
                </div>
                <div v-else class="flex flex-col gap-y-4">
                    <template v-for="(value, key) in {'general_recommendations': 'generales', 'free_foods': 'alimentos de libre consumo', 'forbidden_foods': 'alimentos restringidos'}" :key="key">
                        <div
                            v-if="pauta[key] != null"
                            class="bg-light-orange p-4 rounded-lg"
                        >
                            <div class="font-PoppinsBold text-base capitalize">{{ value }}</div>
                            <div class="text-xs">{{ pauta[key] }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>