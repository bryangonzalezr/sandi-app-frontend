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
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonTitle>Recetas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItemGroup>
                <IonItem>
                    <IonButton @click="ViewRecipes()">Ver recetas guardadas</IonButton>
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                  <IonLabel> Generador de recetas </IonLabel>
                </IonItemDivider>
                <IonItem>
                    <label>Consulta:</label>
                    <IonInput type="text" v-model="query" placeholder="Ingredientes"></IonInput>
                </IonItem>
                <IonItem>
                    <IonButton @click="GenerateRecipe()">Generar</IonButton>
                </IonItem>
            </IonItemGroup>
            <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{{ recipe.receta }}</IonCardTitle>
                  <IonCardSubtitle>Contiene {{ recipe.calorias }} calorías</IonCardSubtitle>
                </IonCardHeader>
                <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
                <IonButton @click="SaveRecipe(recipe)">Guardar</IonButton>
            </IonCard>
        </IonContent>
    </IonPage>
</template>