<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonInput, 
    IonGrid, 
    IonRow, 
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
    IonLabel, 
    IonSpinner } from '@ionic/vue';
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores";
import { Recipe } from "@/interfaces/recipe";

const router = useRouter();

const query = ref('');
const MonthDays = ref(31);

const menuStore = useMenuStore();
const { menuday, menus} = storeToRefs(menuStore);

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

const ViewDetailsRecipe = (recipe: Recipe) => {
    menuStore.SelectedRecipe(recipe);
    router.push({ name: "MenuRecipe" });
}


</script>

<template>
    <ion-page>
        <ion-header :translucent="true" >
          <ion-toolbar>
            <ion-title size="large">Menú</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-grid>
            <ion-row>
                <IonItem>
                  <label>¿Para qué rango de días quieres el menú?</label>
                  <IonSelect v-model="menuStore.typemenu" placeholder="Selecciona opción">
                    <IonSelectOption value="día">Para el día</IonSelectOption>
                    <IonSelectOption value="semana">Para la semana</IonSelectOption>
                    <IonSelectOption value="mes">Para el mes</IonSelectOption>
                  </IonSelect>
                </IonItem>
            </ion-row>
            <ion-row v-if="menuStore.typemenu == 'mes'">
                <IonItem>
                    <label>¿cuántos días tendrá el mes?</label>
                    <IonSelect v-model="MonthDays" placeholder="Selecciona opción">
                      <IonSelectOption value="30">30</IonSelectOption>
                      <IonSelectOption value="31">31</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </ion-row>
            <ion-row>
                <IonItem>
                    <label>Consulta:</label>
                    <ion-input type="text" v-model="query" placeholder="Opcional"></ion-input>
                </IonItem>
            </ion-row>
            <ion-row>
                <ion-button @click="GenerateMenu()">Generar</ion-button>
            </ion-row>
          </ion-grid>
          <template v-if="menuStore.isloading && menuStore.isgenerate">
            <div class="flex justify-center">
                <ion-spinner name="dots"></ion-spinner>
            </div>
          </template>
          <template v-if="!menuStore.isloading && menuStore.isgenerate">
            <template v-if="menuStore.typemenu == 'día'">
              <ion-card v-for="(recipe, index) in menuday.recipes" :key="index">
                <ion-card-header>
                  <ion-card-title>{{ recipe.label }}</ion-card-title>
                  <ion-card-subtitle>{{ recipe.meal_type[0] }}</ion-card-subtitle>
                </ion-card-header>
                <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
              </ion-card>
            </template>
            <template v-if="menuStore.typemenu =='semana' || menuStore.typemenu == 'mes'">
              <ion-card v-for="(day, index) in menus.menus" :key="index">
                <ion-card-header>
                  <ion-card-title>Día {{ index + 1 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                      <ion-item v-for="(recipe, index) in day.recipes" :key="index">
                        <ion-label>{{ recipe.meal_type[0] }}: {{ recipe.label }}</ion-label>
                        <ion-button @click="ViewDetailsRecipe(recipe)">Ver Más</ion-button>
                      </ion-item>
                    </ion-list>
                </ion-card-content>
              </ion-card>
            </template>
          </template>
        </ion-content>

    </ion-page>
</template>