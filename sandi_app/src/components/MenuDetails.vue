<script setup>
import { useRouter } from "vue-router";
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton, 
    IonCard, 
    IonCardHeader,
    IonCardSubtitle, 
    IonCardTitle, 
    IonItem,
    IonCardContent, 
    IonList,
    IonLabel,  
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

import { storeToRefs } from "pinia";
import { useMenuStore, useRecipeStore } from "@/stores";

const router = useRouter();

const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const { selectmenu } = storeToRefs(menuStore);

const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
}

const goToMenu = () => {
  router.push('/menu');
}


</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                  <IonButton @click="goToMenu()">
                    <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                  </IonButton>
                </ion-buttons>
                <ion-title>Menu {{ $route.params.type }} N° {{ $route.params.id }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <template v-if="$route.params.type == 'diario'">
              <ion-card v-for="(recipe, index) in selectmenu.recipes" :key="index">
                <ion-card-header>
                  <ion-card-title>{{ recipe.label }}</ion-card-title>
                  <ion-card-subtitle>{{ recipe.meal_type[0] }}</ion-card-subtitle>
                </ion-card-header>
                <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
              </ion-card>
            </template>
            <template v-else>
              <ion-card v-for="(day, index) in selectmenu.menus" :key="index">
                <ion-card-header>
                  <ion-card-title>Día {{ index + 1 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                      <ion-item v-for="(recipe, index) in day.recipes" :key="index">
                        <ion-label>{{ recipe.meal_type[0] }}: {{ recipe.label }}</ion-label>
                        <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
                      </ion-item>
                    </ion-list>
                </ion-card-content>
              </ion-card>
            </template>
        </ion-content>
    </ion-page>
</template>