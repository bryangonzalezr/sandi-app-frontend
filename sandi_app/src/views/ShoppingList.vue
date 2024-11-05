<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonProgressBar 
} from '@ionic/vue';

// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useProgressBarStore, useShoppingListStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const progressBarStore = useProgressBarStore();
const shoppingListStore = useShoppingListStore();

const { progress, status, progressInterval } = storeToRefs(progressBarStore);
const { shoppingList } = storeToRefs(shoppingListStore)

// Definir variables referenciales o reactivas
const props = defineProps({
  menu_id: {
    type: String,
    required: true
  }
})

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
const BackPage = () => {
  clearInterval(progressInterval);
  router.push({name: 'MenuList'})
}

/* Redirecciona a RecipeDetails.vue para ver los detalles de la receta */
onMounted(() => {
    progressBarStore.checkProgress(props.menu_id)
    /* progressBarStore.checkStatus(props.menu_id)
    console.log(status.value) */
});


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
                <IonTitle>Recetas Guardadas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
           <div v-if="status == 'active'" class="text-center flex flex-col gap-y-1">
               <div class="progress-bar">
                 <div
                 class="progress-fill"
                 :style="{ width: progress + '%' }"
                 ></div>

              </div>
              <p>{{ progress }}%</p>
           </div>
           <div v-else-if="status == 'inactive'">
            Lista de compras
           </div>
        </IonContent>
    </IonPage>
</template>