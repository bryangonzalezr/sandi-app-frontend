<script setup lang="ts">
import { useRouter } from "vue-router";
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonList, 
    IonListHeader, 
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/stores";

const router = useRouter();

const menuStore = useRecipeStore();
const { selectrecipe } = storeToRefs(menuStore);

const BackPage = () => {
    router.go(-1)
}


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
                <IonTitle>Receta</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
           <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {{ selectrecipe.receta }}
                </IonCardTitle>
            </IonCardHeader> 
                <IonCardContent>
                    <IonList>
                        <IonListHeader>Calorias</IonListHeader>
                        <IonItem>
                            {{ selectrecipe.calorias }} cal
                        </IonItem>
                        <IonListHeader>Ingredientes</IonListHeader>
                        <IonItem v-for="(ingredient,index) in selectrecipe.ingredientes" :key="index">
                            {{ ingredient }}
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    </IonPage>
</template>