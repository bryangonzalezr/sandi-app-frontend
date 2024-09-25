<script setup>
// Importar Componentes IONIC
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
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useMenuStore, useRecipeStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const { selectmenu } = storeToRefs(menuStore);

// Definir variables referenciales o reactivas

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la vista de MenuPage.vue */
const goToMenu = () => {
  router.push('/menu');
}

/* Redirecciona a la vista de detalles de receta RecipeDetails.vue */
const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
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