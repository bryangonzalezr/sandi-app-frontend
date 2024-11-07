<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton, 
    IonButtons,
    IonIcon,
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack, chevronForward, archive, volumeMute, volumeHigh } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import {  ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useMenuStore, useRecipeStore, useConvertersStore, useChatStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const menuStore = useMenuStore();
const recipeStore = useRecipeStore();
const { selectmenu } = storeToRefs(menuStore);
const chatStore = useChatStore();
const converseStore = useConvertersStore();

// Definir variables referenciales o reactivas
const stopTexttospeech = ref(false);

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la vista de MenuPage.vue */
const goToMenu = () => {
  router.push({name: 'ChatBot'});
}

/* Redirecciona a la vista de detalles de receta RecipeDetails.vue */
const ViewDetailsRecipe = (recipe) => {
    
    recipeStore.SelectedRecipe(recipe);
    router.push({ name: "RecipeDetail" });
}

/* Guarda el menu generado por sandi */
const SaveSandiMenu = (selectmenu, type) => {
    if (type == "diario"){
        menuStore.SaveMenuDay(selectmenu)
    }else{
        menuStore.SaveMenu(selectmenu)
    }
}

const StopSandi = () => {
  stopTexttospeech.value = !stopTexttospeech.value;
  chatStore.changeTexttospeech();
  if(stopTexttospeech.value){
    converseStore.StopVoicetoTextmob();
  }
};

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
                <!-- <IonTitle>Menu {{ $route.params.type }} N° {{ $route.params.id }}</IonTitle> -->
                <IonTitle> {{ selectmenu.name }}</IonTitle>
                <IonButtons slot="end">
                    <div className="flex items-center justify-between">
                        <IonButton @Click="StopSandi()" className="flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center">
                                <IonIcon 
                                :icon="stopTexttospeech ? volumeMute : volumeHigh"
                                className="h-6 w-6"
                                />
                                <span className="text-xs mt-1">
                                {{ stopTexttospeech ? 'Desmutear' : 'Mutear' }}
                                </span>

                            </div>
                        </IonButton>
                    </div>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <template v-if="$route.params.type == 'diario'">
              <div class="flex flex-col gap-y-6 p-6 ">
                <div class="flex justify-center">
                    <IonButton class="button-icon w-fit " @click="SaveSandiMenu(selectmenu, $route.params.type)">
                        <IonIcon :icon="archive"></IonIcon>
                        Guardar
                    </IonButton>
                </div>
                <h1 class="font-PoppinsBold text-center text-2xl">Recetas del dia</h1>
                <div v-for="(recipe,index) in selectmenu.recipes" :key="index" 
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
                            Calorias: {{ Math.round(recipe.calories) }} kcal  
                        </div>
                    </div>
                    <button class="text-white text-2xl text-center" @click="ViewDetailsRecipe(recipe)">
                        <IonIcon :icon="chevronForward"></IonIcon>
                    </button>
                </div>
            </div>
            </template>
            <template v-else>
              <div class="flex flex-col gap-y-1 p-6">
                <div class="flex justify-center">
                    <IonButton class="button-icon w-fit " @click="SaveSandiMenu(selectmenu, $route.params.type)">
                        <IonIcon :icon="archive"></IonIcon>
                        Guardar
                    </IonButton>
                </div>
                <div class="flex flex-col gap-y-6 p-6" v-for="(dayMenu,index) in selectmenu.menus" :key="index">
                    <h1 class="font-PoppinsBold text-center text-2xl">Dia {{ index }}</h1>
                  <div v-for="(recipe,index) in dayMenu" :key="index"
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
                              Calorias: {{ Math.round(recipe.calories) }} kcal  
                          </div>
                      </div>
                      <button class="text-white text-2xl text-center" @click="ViewDetailsRecipe(recipe)">
                          <IonIcon :icon="chevronForward"></IonIcon>
                      </button>
                  </div>
                </div>
              </div>
              
            </template>
        </IonContent>
    </IonPage>
</template>
<style scoped>
.button-icon {
  --background: var(--mid-green);
  color: var(--dark-green);
  --box-shadow: none;
  --border-radius: 0.5rem;
}

.button-icon ion-icon {
  margin-right: 0.5rem; 
}
</style>