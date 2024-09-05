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
import { useRouter } from 'vue-router';
import { usePatientsStore } from "@/stores";
import { Line } from 'vue-chartjs'

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
const heightprogress = ref([])
const weightprogress = ref([])
const optionsHeight = ref({})
const dataHeight = ref({})
const dataWeight = ref({})
const optionsWeight = ref({})

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

const loadData = async () => {
  await patientsStore.ShowProgress(props.id);
  progress.value = patientsStore.GetProgress.data
  currentprogress.value = progress.value[progress.value.length - 1];
  dateprogress.value = progress.value.map(p => p.date)
  heightprogress.value = progress.value.map(p => p.height);
  weightprogress.value = progress.value.map(p => p.weight);
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
}

const returnToPatients = () =>{
  router.push({ name: "PatientProfile", params: { id: props.id }})
};

onIonViewWillEnter(() => {
    loadData()
})


</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton @click="returnToPatients()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
              </IonButtons>
              <IonTitle>Progreso personal</IonTitle>
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
                                <IonCardTitle>{{ currentprogress.nutritional_state }}</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Peso</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.weight }} kg</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Altura</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.height }} m</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Grasa</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.fat_percentage }}%</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Musculatura</IonCardSubtitle>
                                <IonCardTitle>{{ currentprogress.muscular_percentage }}%</IonCardTitle>
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
                    </div>
                </IonItem>
            </IonItemGroup>
        </IonContent>
    </IonPage>
</template>