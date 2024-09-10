<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
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

const goToRecipe = () => {
    router.push('/recipe');
}

</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="goToRecipe()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Recetas guardadas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                <IonCard v-for="(recipe,index) in listrecipes" :key="index">
                    <IonCardHeader>
                      <IonCardTitle>{{ recipe.label }}</IonCardTitle>
                      <IonCardSubtitle>{{ recipe.meal_type?recipe.meal_type[0]:"" }}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
                    <IonButton @click="DeleteRecipe(recipe.id)">Borrar</IonButton>
                </IonCard>
            </IonList>
        </IonContent>
    </IonPage>
</template>