<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon, 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronForward } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { onMounted, ref } from 'vue';
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

/* Redirecciona a RecipeDetails.vue para ver los detalles de la receta */
const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    console.log("esta receta se esta viendo:", recipe)
    router.push({ name: "RecipeDetail" });
}

/* Elimina una receta guardada */
const DeleteRecipe = async (id_recipes) => {
    await recipeStore.DeleteRecipe(id_recipes);
    await recipeStore.IndexRecipe();
}


onMounted(() => {
    recipeStore.IndexRecipe();
});

</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonTitle>Recetas Guardadas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="text-center" v-if="listrecipes.length == 0">
                No posees recetas guardadas
            </div>
            <div v-else class="flex flex-col gap-y-11 p-6">
                <div v-for="(recipe,index) in listrecipes" :key="index" 
                class="py-6 pl-8 pr-4 bg-light-green rounded-[50px] shadow-inner-lg flex items-center justify-between"
                :class="index % 3 === 0 ? 'bg-light-green' : index % 3 === 1 ? 'bg-mid-red' : 'bg-light-orange'">
                    <div class="flex flex-col gap-y-3">
                        <div class="font-PoppinsBold text-base">
                            {{ recipe.label }}
                        </div>
                        <div>
                            Tipo de comida: {{ recipe.mealType[0] }}
                        </div>
                        <div>
                            Calorias: {{ recipe.calories }} kcal  
                        </div>
                    </div>
                    <button class="text-white text-2xl text-center" @click="ViewDetailsRecipe(recipe)">
                        <IonIcon :icon="chevronForward"></IonIcon>
                    </button>
                </div>
            </div>
        </IonContent>
        <!-- <IonContent>
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
        </IonContent> -->
    </IonPage>
</template>