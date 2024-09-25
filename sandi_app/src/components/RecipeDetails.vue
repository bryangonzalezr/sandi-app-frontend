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
import { chevronBack } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectiv
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useRecipeStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const menuStore = useRecipeStore();
const { selectrecipe } = storeToRefs(menuStore);

// Definir variables referenciales o reactivas

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la última ruta que se ingreso antes de llegar a esta */
const BackPage = () => {
    router.go(-1)
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
                <IonTitle>Receta</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
           <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {{ selectrecipe.receta }}
                </IonCardTitle>
            </IonCardHeader> 
                <IonCardContent>
                    <IonList>
                        <IonListHeader>Calorias</IonListHeader>
                        <IonItem>
                            {{ selectrecipe.calorias }} cal
                        </IonItem>
                        <IonListHeader>Ingredientes</IonListHeader>
                        <IonItem v-for="(ingredient,index) in selectrecipe.ingredientes" :key="index">
                            {{ ingredient }}
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    </IonPage>
</template>