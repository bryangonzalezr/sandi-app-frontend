<script setup>
import {
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput
} from '@ionic/vue';
import { reactive, watchEffect, onMounted } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  portionsGroup: {
    type: Object,
    required: true,
  },
  indicadores: {
    type: Object,
    required: true,
  },
  totalCalories: {
    type: Number,
    required: true,
  },
  portionsServices: {
    type: Object,
    required: false,
  }
});

const emit = defineEmits(["goToStep", "getPortionsServices"]);

const food = {
    "Cereales": "cereales",
    "Verduras general": "verduras_gral",
    "Verduras libre consumo" : "verduras_libre_cons",
    "Frutas": "frutas" ,
    "Carnes altos en grasas": "carnes_ag", 
    "Carnes bajos en grasas": "carnes_bg",
    "Legumbres": "legumbres",
    "Lácteos altos en grasas": "lacteos_ag",
    "Lácteos medios en grasas": "lacteos_mg",
    "Lácteos bajos en grasas": "lacteos_bg",
    "Aceites y Grasas": "aceites_grasas",
    "Ricos en lípidos": "alim_ricos_lipidos",
    "Azúcares": "azucares", 
}

const portionsFood = reactive({
    "patient_id": props.id,
    "total_calorias": 0,
    "desayuno": {
        "cereales": 0,
        "verduras_gral": 0,
        "verduras_libre_cons": 0,
        "frutas": 0,
        "carnes_ag": 0,
        "carnes_bg": 0,
        "legumbres": 0,
        "lacteos_ag": 0,
        "lacteos_mg": 0,
        "lacteos_bg": 0,
        "aceites_grasas": 0,
        "alim_ricos_lips":0,
        "azucares": 0,
        "total_calorias":0
    },
   
    "colacion": {
        "cereales": 0,
        "verduras_gral": 0,
        "verduras_libre_cons": 0,
        "frutas": 0,
        "carnes_ag": 0,
        "carnes_bg": 0,
        "legumbres":0,
        "lacteos_ag": 0,
        "lacteos_mg": 0,
        "lacteos_bg": 0,
        "aceites_grasas": 0,
        "alim_ricos_lips":0,
        "azucares": 0,
        "total_calorias":0
    },
    "almuerzo": {
        "cereales": 0,
        "verduras_gral": 0,
        "verduras_libre_cons": 0,
        "frutas": 0,
        "carnes_ag": 0,
        "carnes_bg": 0,
        "legumbres":0,
        "lacteos_ag": 0,
        "lacteos_mg": 0,
        "lacteos_bg": 0,
        "aceites_grasas": 0,
        "alim_ricos_lips":0,
        "azucares": 0,
        "total_calorias":0
    },
    "once": {
        "cereales": 0,
        "verduras_gral": 0,
        "verduras_libre_cons": 0,
        "frutas": 0,
        "carnes_ag": 0,
        "carnes_bg": 0,
        "legumbres":0,
        "lacteos_ag": 0,
        "lacteos_mg": 0,
        "lacteos_bg": 0,
        "aceites_grasas": 0,
        "alim_ricos_lips":0,
        "azucares": 0,
        "total_calorias":0
    },
    "cena": {
        "cereales": 0,
        "verduras_gral": 0,
        "verduras_libre_cons": 0,
        "frutas": 0,
        "carnes_ag": 0,
        "carnes_bg": 0,
        "legumbres":0,
        "lacteos_ag": 0,
        "lacteos_mg": 0,
        "lacteos_bg": 0,
        "aceites_grasas": 0,
        "alim_ricos_lips":0,
        "azucares": 0,
        "total_calorias":0
    }
})

const totales = reactive({
    desayuno: 0,
    colacion: 0,
    almuerzo: 0,
    once: 0,
    cena: 0
})

const percentages = reactive({
    desayuno: 0,
    colacion: 0,
    almuerzo: 0,
    once: 0,
    cena: 0
})

const TotalPortions = (service) => {
    const valores = Object.values(portionsFood[service])
    totales[service] = 0
    for(let i=0; i< 13; i++){
        totales[service] += valores[i] * props.indicadores[i].calorias
    }
    portionsFood[service].total_calorias = totales[service]
    percentages[service] = Math.round((totales[service]/props.totalCalories) * 100)
}

const Next = () =>{
    emit("goToStep", props.currentStep + 1);
    emit("getPortionsServices", portionsFood)
}

const Previous = () =>{
    emit("goToStep", props.currentStep - 1);
}

watchEffect(() => {
    TotalPortions('desayuno')
    TotalPortions('almuerzo')
    TotalPortions('colacion')
    TotalPortions('once')
    TotalPortions('cena')
    portionsFood.total_calorias = portionsFood.desayuno.total_calorias + portionsFood.almuerzo.total_calorias + portionsFood.colacion.total_calorias + portionsFood.once.total_calorias + portionsFood.cena.total_calorias
});

const dataResults = (service) => {
    const valores = Object.values(portionsFood[service])
    for(let i=0; i< valores.length; i++){
        portionsFood[service] = props.portionsServices[service]
        portionsFood[service].cereales = props.portionsServices[service].cereales
        portionsFood[service].verduras_gral = props.portionsServices[service].verduras_gral
        portionsFood[service].verduras_libre_cons = props.portionsServices[service].verduras_libre_cons
        portionsFood[service].frutas = props.portionsServices[service].frutas
        portionsFood[service].carnes_ag = props.portionsServices[service].carnes_ag
        portionsFood[service].carnes_bg = props.portionsServices[service].carnes_bg
        portionsFood[service].legumbres = props.portionsServices[service].legumbres
        portionsFood[service].lacteos_ag = props.portionsServices[service].lacteos_ag
        portionsFood[service].lacteos_mg = props.portionsServices[service].lacteos_mg
        portionsFood[service].lacteos_bg = props.portionsServices[service].lacteos_bg
        portionsFood[service].aceites_grasas = props.portionsServices[service].aceites_grasas
        portionsFood[service].alim_ricos_lips = props.portionsServices[service].alim_ricos_lips
        portionsFood[service].azucares = props.portionsServices[service].azucares
        portionsFood[service].total_calorias = props.portionsServices[service].total_calorias
    }
}

onMounted(() => {
  if('desayuno' in props.portionsServices){
    dataResults('desayuno')
    dataResults('almuerzo')
    dataResults('colacion')
    dataResults('once')
    dataResults('cena')
  }
})
</script>

<template>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Porciones definidas</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonCard v-for="(group, key) of food" :key="key">
                <IonCardHeader>
                    <IonCardSubtitle>{{ key }}</IonCardSubtitle>
                    <IonCardTitle>{{ portionsGroup[group] }}</IonCardTitle>
                </IonCardHeader>
            </IonCard>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Desayuno</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of food" :key="key">
                <IonInput :label="key" v-model="portionsFood.desayuno[value]" type="number" min="0"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>{{ totales.desayuno }}</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>{{ percentages.desayuno }}%</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Almuerzo</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of food" :key="key">
                <IonInput :label="key" v-model="portionsFood.almuerzo[value]" type="number" min="0"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>{{ totales.almuerzo }}</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>{{ percentages.almuerzo }}%</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Colación</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of food" :key="key">
                <IonInput :label="key" v-model="portionsFood.colacion[value]" type="number" min="0"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>{{ totales.colacion }}</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>{{ percentages.colacion }}%</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Once</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of food" :key="key">
                <IonInput :label="key" v-model="portionsFood.once[value]" type="number" min="0"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>{{ totales.once }}</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>{{ percentages.once }}%</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Cena</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of food" :key="key">
                <IonInput :label="key" v-model="portionsFood.cena[value]" type="number" min="0"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>{{ totales.cena }}</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>{{ percentages.cena }}%</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <div class="flex justify-between m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Next()">Siguiente</IonButton>
    </div>

</template>
