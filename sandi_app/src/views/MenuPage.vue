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
import { storeToRefs } from "pinia";
import { useMenuStore, useRecipeStore } from "@/stores";

const router = useRouter();

const query = ref('');
const MonthDays = ref(31);

const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const { menuday, menus } = storeToRefs(menuStore);

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

const SaveMenu = async () => {
  if(menuStore.typemenu === 'día') {
    await menuStore.SaveMenu(menuday.value, menuStore.typemenu)
  }
  else {
    await menuStore.SaveMenu(menus.value, menuStore.typemenu)
  }
}

const ViewMenus = async () => {
  await menuStore.ViewMenuList()
  router.push({ name: "MenuList" });
}

const ViewDetailsRecipe = (recipe) => {
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
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
            <IonItemDivider>
              <IonLabel> Generador de recetas </IonLabel>
            </IonItemDivider>
            <IonItem>
              <label>¿Para qué rango de días quieres el menú?</label>
              <IonSelect v-model="menuStore.typemenu" placeholder="Selecciona opción">
                <IonSelectOption value="día">Para el día</IonSelectOption>
                <IonSelectOption value="semana">Para la semana</IonSelectOption>
                <IonSelectOption value="mes">Para el mes</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem v-if="menuStore.typemenu == 'mes'">
                <label>¿cuántos días tendrá el mes?</label>
                <IonSelect v-model="MonthDays" placeholder="Selecciona opción">
                  <IonSelectOption value="30">30</IonSelectOption>
                  <IonSelectOption value="31">31</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem>
                <label>Consulta:</label>
                <IonInput type="text" v-model="query" placeholder="Opcional"></IonInput>
            </IonItem>
            <IonItem>
              <IonButton @click="GenerateMenu()">Generar</IonButton>
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
              <IonCard v-for="(recipe, index) in menuday.recipes" :key="index">
                <IonCardHeader>
                  <IonCardTitle>{{ recipe.label }}</IonCardTitle>
                  <IonCardSubtitle>{{ recipe.meal_type[0] }}</IonCardSubtitle>
                </IonCardHeader>
                <IonButton @click="ViewDetailsRecipe(recipe)">Ver Más</IonButton>
              </IonCard>
            </template>
            <template v-if="menuStore.typemenu =='semana' || menuStore.typemenu == 'mes'">
              <IonCard v-for="(day, index) in menus.menus" :key="index">
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
          </template>
        </IonContent>

    </IonPage>
</template>