<script setup>
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
    IonCardSubtitle,
    onIonViewWillEnter
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { usePatientsStore } from '@/stores';
import { Line } from 'vue-chartjs'
/* import AppChartLine from '@/common/AppChartLine.vue' */

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const router = useRouter();

const patientsStore = usePatientsStore();

const progress = ref([])
const currentprogress = ref({})
const dateprogress = ref([])
const stateprogress = ref([])
const heightprogress = ref([])
const weightprogress = ref([])
const imcprogress = ref([])
const optionsHeight = ref({})
const dataHeight = ref({})
const dataWeight = ref({})
const optionsWeight = ref({})
const dataStateNutritional = ref({})
const optionsStateNutritional = ref({})
const dataIMC = ref({})
const optionsIMC = ref({})

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

dataStateNutritional.value = {
    labels: dateprogress.value,
    datasets: [
        {
            label: 'Estado Nutricional',
            data: stateprogress.value, 
            borderColor: 'rgba(236,196,220, 1)',
            backgroundColor: 'rgba(236,196,220, 1)',
            stepped: true,
            yAxisID: 'y',
        }
    ]
}

optionsStateNutritional.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Progreso Estado Nutricional',
      },
      legend: {
        display: false,
      }
    },
    scales: {
        y: {
            type: 'category',
            labels: ['Obesidad', 'Sobrepeso', 'Normal', 'Enflaquecido'],
        }
    }
}

optionsIMC.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "IMC por cosnulta",
      },
      legend: {
        display: false,
      }
    }
}

dataIMC.value = {
  labels: dateprogress.value,
  datasets: [
    {
        label: 'IMC',
        data: imcprogress.value,
        borderColor: 'rgba(236,196,220, 1)',
        backgroundColor: 'rgba(236,196,220, 1)'
    },
  ],

}

const loadData = async () => {
  // Si el paciente no tiene progreso se crashea todo, hacer manejo de errores para que la app no muera
  await patientsStore.ShowProgress(props.id);
  progress.value = patientsStore.GetProgress.data
  currentprogress.value = progress.value[progress.value.length - 1];
  dateprogress.value = progress.value.map(p => p.date)
  stateprogress.value = progress.value.map(p => p.nutritional_state);
  heightprogress.value = progress.value.map(p => p.height);
  weightprogress.value = progress.value.map(p => p.weight);
  imcprogress.value = progress.value.map(p => p.imc);
  loadCharts();

}

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

  dataStateNutritional.value = {
      labels: dateprogress.value,
      datasets: [
          {
              label: 'Estado Nutricional',
              data: stateprogress.value, 
              borderColor: 'rgba(236,196,220, 1)',
              backgroundColor: 'rgba(236,196,220, 1)',
              stepped: true,
              yAxisID: 'y',
          }
      ]
  }

  optionsStateNutritional.value = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Progreso Estado Nutricional',
        },
        legend: {
          display: false,
        }
      },
      scales: {
          y: {
              type: 'category',
              labels: ['Obesidad', 'Sobrepeso', 'Normal', 'Enflaquecido'],
          }
      }
  }

  optionsIMC.value = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "IMC por cosnulta",
        },
        legend: {
          display: false,
        }
      }
  }

  dataIMC.value = {
    labels: dateprogress.value,
    datasets: [
      {
          label: 'IMC',
          data: imcprogress.value,
          borderColor: 'rgba(236,196,220, 1)',
          backgroundColor: 'rgba(236,196,220, 1)'
      },
    ],

  }
}

const goToBack = () => {
  router.push({ name: "PatientProfile", params: { id: props.id }});
}

onIonViewWillEnter(() => {
    loadData()
})
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton @click="goToBack()">
                  <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Progreso de {{ $route.params.id }}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Resultados última consulta (a)</IonLabel>
                </IonItemDivider>
                <IonItem>
                    <div class="grid grid-cols-2 w-full">
                        <IonCard class="col-span-2">
                            <IonCardHeader>
                                <IonCardSubtitle>Estado Nutricional</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.nutritional_state || 'a' }}</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Peso</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.weight ||'a' }} kg</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Altura</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.height ||'a' }} m</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Grasa</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.fat_percentage || 'a' }}%</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Musculatura</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.muscular_percentage ||'a' }}%</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </div>
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Gráficas de progreso</IonLabel>
                </IonItemDivider>
                <IonItem>
                    <div class="w-full">
                        <IonCard>
                            <Line
                              id="my-chart-id"
                              :options="optionsHeight"
                              :data="dataHeight"
                            />
                            <!-- <AppChartLine :data="heightprogress" :label="'Altura'" :title="'Altura por consulta'" :dates="dateprogress" /> -->
                        </IonCard>
                        <IonCard>
                            <Line
                              id="my-chart-id"
                              :options="optionsWeight"
                              :data="dataWeight"
                            />
                        </IonCard>
                        <IonCard>
                            <Line
                              id="my-chart-id"
                              :options="optionsStateNutritional"
                              :data="dataStateNutritional"
                            />
                        </IonCard>
                        <IonCard>
                            <Line
                              id="my-chart-id"
                              :options="optionsIMC"
                              :data="dataIMC"
                            />
                        </IonCard>
                    </div>
                </IonItem>
            </IonItemGroup>
        </IonContent>
    </IonPage>
</template>