<script setup>
// Importar Componentes IONIC
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
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useRecipeStore, useAuthStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const recipeStore = useRecipeStore();
const authStore = useAuthStore();
const { recipe } = storeToRefs(recipeStore);

// Definir variables referenciales o reactivas
const query = ref('');

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a RecipeList.vue para ver la lista de recetas */
const ViewRecipes = async () => {
    await recipeStore.IndexRecipe();
    router.push({ name: "RecipeList" });
}

/* Redirecciona a RecipeDetails.vue para ver los detalles de la receta */
const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    console.log("esta receta se esta viendo:", recipe)
    router.push({ name: "RecipeDetail" });
}

/* Genera la receta */
const GenerateRecipe = async () => {
    await recipeStore.GenerateRecipe(query.value);
}

/* Guarda la receta */
const SaveRecipe = async (recipe) => {
    await recipeStore.SaveRecipe(recipe, true, authStore.userInfo.id);
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
                  <IonCardTitle>{{ recipe.label }}</IonCardTitle>
                  <IonCardSubtitle>Contiene {{ recipe.calories }} calorías</IonCardSubtitle>
                </IonCardHeader>
                <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
                <IonButton @click="SaveRecipe(recipe)">Guardar</IonButton>
            </IonCard>
        </IonContent>
    </IonPage>
</template>