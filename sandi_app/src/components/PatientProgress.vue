<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons, 
    IonItemGroup, 
    IonItem,
    IonItemDivider,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon,
    IonCardSubtitle,
    onIonViewWillEnter
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { Line } from 'vue-chartjs'
import { chevronBack } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Importar Stores
import { useProfileStore } from "@/stores";

// Definir propiedades del componentes que se obtienen desde ruta u otro componente
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const profileStore = useProfileStore();

// Definir variables referenciales o reactivas
const progress = ref([])
const currentprogress = ref({})
const dateprogress = ref([])
const heightprogress = ref([])
const weightprogress = ref([])
const optionsHeight = ref({})
const dataHeight = ref({})
const dataWeight = ref({})
const optionsWeight = ref({})

// Volver atrás
const BackPage = () => {
    router.go(-1)
}

optionsHeight.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Altura por consulta",
      },
      legend: {
        display: false,
      }
    }
}

dataHeight.value = {
    labels: dateprogress.value,
    datasets: [
        {
            label: 'Altura',
            data: heightprogress.value, 
            backgroundColor: 'rgba(236,196,220, 1)',
            borderColor: 'rgba(236,196,220, 1)',
            type: 'line',
        }
    ]
}

optionsWeight.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Peso por consulta",
      },
      legend: {
        display: false,
      }
    }
}

dataWeight.value = {
    labels: dateprogress.value,
    datasets: [
        {
            label: 'Peso',
            data: weightprogress.value,
            backgroundColor: 'rgba(136,196,220, 1)',
            borderColor: 'rgba(136,196,220, 1)',
            type: 'line',
        }
    ]
}

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la vista anterior la cuál siempre será el perfil del usuario loggeado (paciente) */
const returnToProfile = () =>{
  router.push({ name: "Profile"})
};

/* Función que se ejecuta cuando se carga la página cargando los datos para las gráficas*/
const loadData = async () => {
  await profileStore.ShowProgress(props.id);
  progress.value = profileStore.GetProgress.data
  currentprogress.value = progress.value[progress.value.length - 1];
  dateprogress.value = progress.value.map(p => p.date)
  heightprogress.value = progress.value.map(p => p.height);
  weightprogress.value = progress.value.map(p => p.weight);
  loadCharts();
}

/* Función que se ejecuta cuando se carga la página cargando las configuraciones de las gráficas*/
const loadCharts = async () => {
    optionsHeight.value = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Altura por consulta",
        },
        legend: {
          display: false,
        }
      }
  }

  dataHeight.value = {
      labels: dateprogress.value,
      datasets: [
          {
              label: 'Altura',
              data: heightprogress.value, 
              backgroundColor: 'rgba(236,196,220, 1)',
              borderColor: 'rgba(236,196,220, 1)',
              type: 'line',
          }
      ]
  }

  optionsWeight.value = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Peso por consulta",
        },
        legend: {
          display: false,
        }
      }
  }

  dataWeight.value = {
      labels: dateprogress.value,
      datasets: [
          {
              label: 'Peso',
              data: weightprogress.value,
              backgroundColor: 'rgba(136,196,220, 1)',
              borderColor: 'rgba(136,196,220, 1)',
              type: 'line',
          }
      ]
  }
}

/* Evento que se ejecuta antes de cargar la página */
onIonViewWillEnter(() => {
    loadData()
})
</script>

<template>
  <IonPage>
      <IonHeader>
          <IonToolbar>
              <IonButtons slot="start">
                  <IonButton @click="BackPage()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                  </IonButton>
              </IonButtons>
              <IonTitle>Progreso Personal</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent>
          <div class="p-4">
              <!-- Resultados de la última consulta -->
              <div class="text-base opacity-60 mb-2">Resultados última consulta</div>
              <div class="bg-light-violet p-4 rounded-lg shadow-md mb-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="col-span-2">
                          <IonCard class="bg-white shadow-md rounded-lg">
                              <IonCardHeader>
                                  <IonCardSubtitle class="text-dark-violet font-semibold">Estado Nutricional</IonCardSubtitle>
                                  <IonCardTitle class="text-dark-black font-bold">{{ currentprogress.nutritional_state }}</IonCardTitle>
                              </IonCardHeader>
                          </IonCard>
                      </div>
                      <IonCard class="bg-white shadow-md rounded-lg">
                          <IonCardHeader>
                              <IonCardSubtitle class="text-dark-violet font-semibold">Peso</IonCardSubtitle>
                              <IonCardTitle class="text-dark-black font-bold">{{ currentprogress.weight }} kg</IonCardTitle>
                          </IonCardHeader>
                      </IonCard>
                      <IonCard class="bg-white shadow-md rounded-lg">
                          <IonCardHeader>
                              <IonCardSubtitle class="text-dark-violet font-semibold">Altura</IonCardSubtitle>
                              <IonCardTitle class="text-dark-black font-bold">{{ currentprogress.height }} m</IonCardTitle>
                          </IonCardHeader>
                      </IonCard>
                      <IonCard class="bg-white shadow-md rounded-lg">
                          <IonCardHeader>
                              <IonCardSubtitle class="text-dark-violet font-semibold">Grasa Corporal</IonCardSubtitle>
                              <IonCardTitle class="text-dark-black font-bold">{{ currentprogress.fat_percentage }}%</IonCardTitle>
                          </IonCardHeader>
                      </IonCard>
                      <IonCard class="bg-white shadow-md rounded-lg">
                          <IonCardHeader>
                              <IonCardSubtitle class="text-dark-violet font-semibold">Musculatura</IonCardSubtitle>
                              <IonCardTitle class="text-dark-black font-bold">{{ currentprogress.muscular_percentage }}%</IonCardTitle>
                          </IonCardHeader>
                      </IonCard>
                  </div>
              </div>

              <!-- Gráficas de progreso -->
              <div class="text-base opacity-60 mb-2">Gráficas de Progreso</div>
              <div class="bg-light-green p-4 rounded-lg shadow-md">
                  <div class="flex flex-col gap-4">
                      <IonCard class="bg-white shadow-md rounded-lg p-4">
                          <h3 class="font-PoppinsBold text-dark-green text-lg mb-2">Altura</h3>
                          <Line id="my-chart-id-height" :options="optionsHeight" :data="dataHeight" />
                      </IonCard>
                      <IonCard class="bg-white shadow-md rounded-lg p-4">
                          <h3 class="font-PoppinsBold text-dark-green text-lg mb-2">Peso</h3>
                          <Line id="my-chart-id-weight" :options="optionsWeight" :data="dataWeight" />
                      </IonCard>
                  </div>
              </div>
          </div>
      </IonContent>
  </IonPage>
</template>