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
    IonSelect, 
    IonSelectOption, 
    IonCard, 
    IonCardHeader,
    IonCardSubtitle, 
    IonCardTitle, 
    IonItem,
    IonCardContent, 
    IonList,
    IonItemDivider,
    IonItemGroup,
    IonLabel, 
    IonSpinner 
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useMenuStore, useRecipeStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const { menuday, menus } = storeToRefs(menuStore);

// Definir variables referenciales o reactivas
const query = ref('');
const MonthDays = ref(31);


// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a RecipeDetails.vue para ver los detalles de la receta */
const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
}

/* RFunción que genera un menú */
const GenerateMenu = async () => {
    if(menuStore.typemenu === 'día') {
        await menuStore.GenerateMenuday(query.value);
    }
    else if(menuStore.typemenu ==='semana') {
        await menuStore.GenerateMenu(query.value, 7);
    }
    else{
        await menuStore.GenerateMenu(query.value, Number(MonthDays.value));
    }
}

/* Función para guardar un menú en la BD */
const SaveMenu = async () => {
  if(menuStore.typemenu === 'día') {
    await menuStore.SaveMenu(menuday.value, menuStore.typemenu)
  }
  else {
    await menuStore.SaveMenu(menus.value, menuStore.typemenu)
  }
}

/* Lista los menús guardados que tiene el usuario loggeado */
const ViewMenus = async () => {
  await menuStore.IndexMenu()
  router.push({ name: "MenuList" });
}
</script>

<template>
    <IonPage>
        <IonHeader :translucent="true" >
          <IonToolbar>
            <IonTitle size="large">Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItemGroup>
            <IonItem>
              <IonButton @click="ViewMenus()">Ver menús guardados</IonButton>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItem>
              <IonButton v-if="!menuStore.isloading && menuStore.isgenerate" @click="SaveMenu()">Guardar Menú</IonButton>
            </IonItem>
          </IonItemGroup>
          <template v-if="menuStore.isloading && menuStore.isgenerate">
            <div class="flex justify-center">
                <IonSpinner name="dots"></IonSpinner>
            </div>
          </template>
          <template v-if="!menuStore.isloading && menuStore.isgenerate">
            <template v-if="menuStore.typemenu == 'día'">
              <IonCard v-for="(recipe, index) in menuday.recetas" :key="index">
                <IonCardHeader>
                  <IonCardTitle>{{ recipe.label }}</IonCardTitle>
                  <IonCardSubtitle>{{ recipe.mealType }}</IonCardSubtitle>
                </IonCardHeader>
                <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
              </IonCard>
            </template>
            <!-- <template v-if="menuStore.typemenu =='semana' || menuStore.typemenu == 'mes'">
              <IonCard v-for="(day, index) in menus.menus" :key="index">
                <IonCardHeader>
                  <IonCardTitle>Día {{ index + 1 }}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                      <IonItem v-for="(recipe, index) in day.recipes" :key="index">
                        <IonLabel>{{ recipe.meal_type }}: {{ recipe.label }}</IonLabel>
                        <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
                      </IonItem>
                    </IonList>
                </IonCardContent>
              </IonCard>
            </template> -->
          </template>
        </IonContent>

    </IonPage>
</template>