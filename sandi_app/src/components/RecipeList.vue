<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton,IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/stores";

const recipeStore = useRecipeStore();
const { listrecipes } = storeToRefs(recipeStore);


const router = useRouter();

const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetails" });
}

const DeleteRecipe = async (id_recipes) => {
    await recipeStore.DeleteRecipe(id_recipes);
    await recipeStore.ViewListRecipes();
}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-back-button default-href="/recipe" :icon="chevronBack"></ion-back-button>
                </ion-buttons>
                <ion-title>Recetas guardadas</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-card v-for="(recipe,index) in listrecipes" :key="index">
                    <ion-card-header>
                      <ion-card-title>{{ recipe.label }}</ion-card-title>
                      <ion-card-subtitle>{{ recipe.meal_type?recipe.meal_type[0]:"" }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
                    <ion-button @click="DeleteRecipe(recipe.id)">Borrar</ion-button>
                </ion-card>
            </ion-list>
        </ion-content>
    </ion-page>
</template>