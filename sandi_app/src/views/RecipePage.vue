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
    IonCardSubtitle} from '@ionic/vue';
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores";

const router = useRouter();

const query = ref('');

const menuStore = useMenuStore();
const { recipe } = storeToRefs(menuStore);

const ViewDetailsRecipe = (recipe) => {
    menuStore.SelectedRecipe(recipe);
    router.push({ name: "MenuRecipe" });
}

const GenerateRecipe = async () => {
    await menuStore.GenerateRecipe(query.value);
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
            <IonItem>
                <label>Consulta:</label>
                <ion-input type="text" v-model="query" placeholder="Ingredientes"></ion-input>
            </IonItem>
            <IonItem>
                <ion-button @click="GenerateRecipe()">Generar</ion-button>
            </IonItem>
            <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ recipe.label }}</ion-card-title>
                  <ion-card-subtitle>{{ recipe.meal_type?recipe.meal_type[0]:"" }}</ion-card-subtitle>
                </ion-card-header>
                <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
            </ion-card>
        </ion-content>
    </ion-page>
</template>