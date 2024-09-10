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
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonButtons slot="start">
                  <IonButton @click="goToMenu()">
                    <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                  </IonButton>
                </IonButtons>
                <IonTitle>Menu {{ $route.params.type }} N° {{ $route.params.id }}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <template v-if="$route.params.type == 'diario'">
              <IonCard v-for="(recipe, index) in selectmenu.recipes" :key="index">
                <IonCardHeader>
                  <IonCardTitle>{{ recipe.label }}</IonCardTitle>
                  <IonCardSubtitle>{{ recipe.meal_type[0] }}</IonCardSubtitle>
                </IonCardHeader>
                <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
              </IonCard>
            </template>
            <template v-else>
              <IonCard v-for="(day, index) in selectmenu.menus" :key="index">
                <IonCardHeader>
                  <IonCardTitle>Día {{ index + 1 }}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                      <IonItem v-for="(recipe, index) in day.recipes" :key="index">
                        <IonLabel>{{ recipe.meal_type[0] }}: {{ recipe.label }}</IonLabel>
                        <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
                      </IonItem>
                    </IonList>
                </IonCardContent>
              </IonCard>
            </template>
        </IonContent>
    </IonPage>
</template>