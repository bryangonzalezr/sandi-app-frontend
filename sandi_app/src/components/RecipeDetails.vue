<script setup lang="ts">
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonList, 
    IonListHeader, 
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem } from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack, archive } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useRecipeStore, useAuthStore } from '@/stores';

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const recipeStore = useRecipeStore();
const authStore = useAuthStore();

const { selectrecipe, recipe, sandi_recipe } = storeToRefs(recipeStore);
const { user } = storeToRefs(authStore);

// Definir variables referenciales o reactivas
const section = ref(0);
const sandiRecipe = sandi_recipe.value ? 'Sandi' : 'Nutricionista'


// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden

/* Cambia entre seccion ingredientes e instrucciones */
const changeSection = (new_section: number) => {
    section.value = new_section
}

/* Redirecciona a la última ruta que se ingreso antes de llegar a esta */
const BackPage = () => {
    router.go(-1)
}

/* Guarda la receta generada por sandi */
const SaveSandiRecipe = (selectrecipe: any, sandi_recipe: any, patient_id: any) => {
    recipeStore.SaveRecipe(selectrecipe, sandi_recipe, patient_id)
}
</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="BackPage()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <div class="font-PoppinsBold text-base">
                    {{ selectrecipe.label }}
                </div>
                <IonButtons slot="end">
                    <IonButton class="button-icon" @click="SaveSandiRecipe(selectrecipe, sandi_recipe, user.id)">
                        <IonIcon :icon="archive"></IonIcon>
                        Guardar
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="mx-8 my-4">
                <div class="grid grid-cols-2 mb-8 gap-x-5">
                    <div class="grid grid-rows-2">
                        <div class="font-PoppinsBold">
                            Calorias: 
                        </div>
                        <div class="bg-light-violet text-center rounded-2xl">
                            {{ Math.round(selectrecipe.calories) }} cal
                        </div>
                    </div>
                    <div class="grid grid-rows-2">
                        <div class="font-PoppinsBold">
                            Generada por:
                        </div>
                        <div class="bg-light-violet text-center rounded-2xl">
                            {{ sandiRecipe }}
                        </div>
                    </div>
                </div>
                <div class="text-center font-PoppinsBold text-base">
                    <button class="mr-2 px-4 bg-light-red my-2 rounded-2xl" @click="changeSection(0)">Ingredientes</button>
                    <button class="ml-2 px-4 bg-light-green my-2 rounded-2xl" @click="changeSection(1)">Instrucciones</button>
                </div>
                <div class="py-6 pl-8 pr-4 mb-10 rounded-2xl grid grid-flow-row-dense shadow-bottom-lg gap-y-4 items-center justify-between"
                    :class="section == 0 ? 'bg-light-red' : 'bg-light-green'"
                >
                    <div class="text-justify" v-if="section == 0" v-for="ingredientLines in selectrecipe.ingredientLines">
                        • {{ ingredientLines }}
                    </div>
                    <div v-else>
                        {{ selectrecipe.instructions }}
                    </div>
                </div>
                <div class="mb-8">
                    <div class="font-PoppinsBold mb-4">
                        Etiquetas de Salud
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-if="!selectrecipe.healthLabels">No tiene</div>
                        <div class="bg-light-orange rounded-lg text-center shadow-bottom-lg flex items-center justify-center" 
                        v-for="healthLabels in selectrecipe.healthLabels" v-else>
                            <span>{{ healthLabels }}</span>
                        </div>
                    </div>
                </div>
                <div class="mb-8">
                    <div class="font-PoppinsBold mb-4">
                        Etiquetas de Dietéticas
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-if="!selectrecipe.dietLabels">No tiene</div>
                        <div class="bg-light-orange align-middle rounded-lg text-center shadow-bottom-lg flex items-center justify-center" 
                        v-for="dietLabels in selectrecipe.dietLabels" v-else>
                        <span>{{ dietLabels }}</span>
                            
                        </div>
                    </div>
                    
                </div>
                
           <!-- <IonCard>
                <IonCardContent>
                    <IonList>
                        <IonListHeader>Calorias</IonListHeader>
                        <IonItem>
                            {{ selectrecipe.calorias ? selectrecipe.calorias : selectrecipe.calories }} cal
                        </IonItem>
                        <IonListHeader>Ingredientes</IonListHeader>
                        <IonItem v-for="(ingredient,index) in (selectrecipe.ingredientes ? selectrecipe.ingredientes : selectrecipe.ingredientLines)" :key="index">
                            {{ ingredient }}
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard> -->
        </div>
        </IonContent>
    </IonPage>
</template>
<style>
.button-icon {
  --background: var(--mid-green);
  --color: var(--mid-green);
  --box-shadow: none;
  --border-radius: 0.5rem;
}

.button-icon ion-icon {
  margin-right: 0.5rem; 
}
</style>