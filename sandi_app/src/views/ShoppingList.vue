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
import { chevronForward } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useRecipeStore, useProgressBarStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const recipeStore = useRecipeStore();
const progressBarStore = useProgressBarStore();

const { progress, status, progressInterval, statusInterval, isLoading } = storeToRefs(progressBarStore);

// Definir variables referenciales o reactivas
const props = defineProps({
  menu_id: {
    type: String,
    required: true
  }
})

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden

/* Redirecciona a RecipeDetails.vue para ver los detalles de la receta */
onMounted(() => {
    progressBarStore.checkProgress(props.menu_id)
    /* progressBarStore.checkStatus(props.menu_id)
    console.log(status.value) */
});

onBeforeUnmount(() => {
    clearInterval(progressInterval);
    clearInterval(statusInterval);
}) 

</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonTitle>Recetas Guardadas</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
           <!-- <IonProgressBar :value="progress"></IonProgressBar> -->
           <div v-if="progress > 0">
             <div class="progress-bar">
                <div
                class="progress-fill"
                :style="{ width: progress + '%' }"
                ></div>
                
             </div>
             <p>{{ progress }}%</p>
             <!-- <p v-else-if="status === 'completed'">Job completado!</p>
             <p v-else>No se encontró el job o ha fallado.</p> -->
           </div>
        </IonContent>
    </IonPage>
</template>
<style scoped>
  .progress-bar {
    width: 100%;
    height: 24px;
    background-color: #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s;
  }
  </style>