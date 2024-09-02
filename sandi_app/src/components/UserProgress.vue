<script setup>
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons, 
    IonBackButton,
    IonItemGroup, 
    IonItem,
    IonItemDivider,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import {  } from "@/stores";
import { Line } from 'vue-chartjs'

const dates = ['01/01/2024', '15/01/2024', '01/02/2024', '15/02/2024', '01/03/2024']

const dataHeight = {
    labels: dates,
    datasets: [
        {
            label: 'Altura',
            data: [170, 175, 180, 180, 180], // Ejemplos de alturas
            backgroundColor: 'rgba(236,196,220, 1)',
            borderColor: 'rgba(236,196,220, 1)',
            type: 'line',
        }
    ]
}

const optionsHeight = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Altura por consulta',
      },
      legend: {
        display: false,
      }
    }
}

const dataWeight = {
    labels: dates,
    datasets: [
        {
            label: 'Peso',
            data: [70, 75, 80, 80, 80], // Ejemplos de pesos
            backgroundColor: 'rgba(136,196,220, 1)',
            borderColor: 'rgba(136,196,220, 1)',
            type: 'line',
        }
    ]
}

const optionsWeight = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Peso por consulta',
      },
      legend: {
        display: false,
      }
    }
}
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton default-href="/" :icon="chevronBack"></IonBackButton>
              </IonButtons>
              <IonTitle>Progreso de {{ $route.params.id }}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>Resultados última consulta</IonLabel>
                </IonItemDivider>
                <IonItem>
                    <div class="grid grid-cols-2 w-full">
                        <IonCard class="col-span-2">
                            <IonCardHeader>
                                <IonCardSubtitle>Estado Nutricional</IonCardSubtitle>
                                <IonCardTitle>Normal</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Peso</IonCardSubtitle>
                                <IonCardTitle>60</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Altura</IonCardSubtitle>
                                <IonCardTitle>1.60</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Grasa</IonCardSubtitle>
                                <IonCardTitle>10%</IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Musculatura</IonCardSubtitle>
                                <IonCardTitle>70%</IonCardTitle>
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