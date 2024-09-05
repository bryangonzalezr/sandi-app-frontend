<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonList, IonListHeader, IonItem } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

const router = useRouter();

import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/stores";

const menuStore = useRecipeStore();
const { selectrecipe } = storeToRefs(menuStore);

const BackPage = () => {
    router.go(-1)
}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <IonButton @click="BackPage()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </ion-buttons>
                <ion-title>{{ selectrecipe.label }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-list-header>Ingredientes</ion-list-header>
                <ion-item v-for="(ingredient,index) in selectrecipe.ingredient_lines" :key="index">
                    {{ ingredient }}
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-list-header>Instructions</ion-list-header>
                <template v-if="selectrecipe.instructions != null">
                    <ion-item v-for="(step, index) in selectrecipe.instructions" :key="index">
                        {{ step }}
                    </ion-item>
                </template>
                <template v-if="selectrecipe.instructions == null">
                    <ion-item>No hay instrucciones disponibles.</ion-item>
                </template>
            </ion-list>
        </ion-content>
    </ion-page>
</template>