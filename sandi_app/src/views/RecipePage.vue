<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonInput, 
    IonButton,  
    IonCard, 
    IonCardHeader,
    IonCardTitle, 
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel, 
    IonCardSubtitle} from '@ionic/vue';
import { storeToRefs } from "pinia";
import { useRecipeStore } from "@/stores";

const router = useRouter();

const query = ref('');

const recipeStore = useRecipeStore();
const { recipe } = storeToRefs(recipeStore);

const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
}

const GenerateRecipe = async () => {
    await recipeStore.GenerateRecipe(query.value);
}

const SaveRecipe = async (recipe) => {
    await recipeStore.SaveRecipe(recipe);
}

const ViewRecipes = async () => {
    await recipeStore.ViewListRecipes();
    router.push({ name: "RecipeList" });
}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Recetas</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item-group>
                <IonItem>
                    <ion-button @click="ViewRecipes()">Ver recetas guardadas</ion-button>
                </IonItem>
            </ion-item-group>
            <ion-item-group>
                <ion-item-divider>
                  <ion-label> Generador de recetas </ion-label>
                </ion-item-divider>
                <IonItem>
                    <label>Consulta:</label>
                    <ion-input type="text" v-model="query" placeholder="Ingredientes"></ion-input>
                </IonItem>
                <IonItem>
                    <ion-button @click="GenerateRecipe()">Generar</ion-button>
                </IonItem>
            </ion-item-group>
            <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ recipe.label }}</ion-card-title>
                  <ion-card-subtitle>{{ recipe.meal_type?recipe.meal_type[0]:"" }}</ion-card-subtitle>
                </ion-card-header>
                <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
                <ion-button @click="SaveRecipe(recipe)">Guardar</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>