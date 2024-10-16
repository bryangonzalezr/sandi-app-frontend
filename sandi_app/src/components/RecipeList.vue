<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonButton,
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle,
    IonIcon, 
    IonCardSubtitle 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useRecipeStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const recipeStore = useRecipeStore();
const { listrecipes } = storeToRefs(recipeStore);
// Definir variables referenciales o reactivas

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la vista de generar receta RecipePage.vue */
const goToRecipe = () => {
    router.push('/recipe');
}

/* Redirecciona a los detalles de la receta RecipeDetails.vue */
const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
}

/* Elimina una receta guardada */
const DeleteRecipe = async (id_recipes) => {
    await recipeStore.DeleteRecipe(id_recipes);
    await recipeStore.IndexRecipe();
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