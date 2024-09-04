<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonBreadcrumb,
  IonBreadcrumbs
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";

// Importar los componentes de cada paso
import RequirementsComponent from '@/components/RequirementsComponent.vue';
import PortionsComponent from '@/components/PortionsComponent.vue';
import PortionServicesComponent from '@/components/PortionServicesComponent.vue';
import PautaComponent from '@/components/PautaComponent.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

// Estado reactivo para el paso actual del formulario
const currentStep = ref(1);

// Función para ir a un paso específico
const goToStep = (step) => {
    currentStep.value = step;
    if(currentStep.value == 5){
      router.push({ name: "Home" });
    }
}

const getRequirements = (requirements) => {
  console.log(requirements)
}

</script>

<template>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/" :icon="chevronBack"></IonBackButton>
          </IonButtons>
          <IonTitle>Control Plan Nutricional</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <!-- Breadcrumbs para indicar el paso activo -->
        <IonBreadcrumbs >
          <IonBreadcrumb 
            href="#requirements" 
            :active="currentStep === 1"
            :disabled="currentStep > 1"
          >
            Requerimientos
          </IonBreadcrumb>
          <IonBreadcrumb 
            href="#portions" 
            :active="currentStep === 2"
            :disabled="currentStep > 2"
          >
            Porciones
          </IonBreadcrumb>
          <IonBreadcrumb 
            href="#pauta" 
            :active="currentStep === 3"
            :disabled="currentStep > 3"
          >
            Porciones/Servicio
          </IonBreadcrumb>
          <IonBreadcrumb 
            href="#pauta" 
            :active="currentStep === 4"
            :disabled="currentStep > 4"
          >
            Pauta
          </IonBreadcrumb>
        </IonBreadcrumbs>
  
        <!-- Componentes para cada paso -->
        <div v-if="currentStep === 1">
          <IonToolbar>
            <IonTitle>Requerimientos</IonTitle>
          </IonToolbar>
          <RequirementsComponent @goToStep="goToStep" @getRequirements="getRequirements" :currentStep="currentStep" :id="props.id" />
        </div>
        <div v-if="currentStep === 2">
          <IonToolbar>
            <IonTitle>Definición de Porciones</IonTitle>
          </IonToolbar>
          <PortionsComponent @goToStep="goToStep" :currentStep="currentStep" />
        </div>
        <div v-if="currentStep === 3">
          <IonToolbar>
            <IonTitle>Porciones por Servicio</IonTitle>
          </IonToolbar>
          <PortionServicesComponent @goToStep="goToStep" :currentStep="currentStep"/>
        </div>
        <div v-if="currentStep === 4">
          <IonToolbar>
            <IonTitle>Pauta</IonTitle>
          </IonToolbar>
          <PautaComponent @goToStep="goToStep" :currentStep="currentStep"/>
        </div>
      </IonContent>
    </IonPage>
  </template>