<script setup>
import {
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonButton,
  IonCol,
} from '@ionic/vue';
import { watch, computed, reactive } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  requirements: {
    type: Object,
    required: true,
  },
  indicadores: {
    type: Object,
    required: true,
  }
});


const emit = defineEmits(["goToStep", "getPortions"]);

const portionsFood = reactive({
    "Cereales": 0,
    "Verduras general": 0,
    "Verduras Libre Consumo": 0,
    "Frutas": 0,
    "Carnes altos en grasas":0 ,
    "Carnes bajos en grasas": 0,
    "legumbres": 0 ,
    "Lácteos altos en grasas": 0 ,
    "Lácteos bajos en grasas": 0,
    "Lácteos medios en grasas": 0,
    "Aceites y Grasas": 0,
    "Ricos en lípidos": 0,
    "Azúcares": 0, 
})

const dataPortions = reactive({
    patient_id: props.id,
    cereales:computed(() => portionsFood["Cereales"]),
    verduras_gral: computed(() => portionsFood["Verduras general"]),
    verduras_libre_cons: computed(() => portionsFood["Verduras Libre Consumo"]),
    frutas: computed(() => portionsFood["Frutas"]),
    carnes_ag: computed(() => portionsFood["Carnes altos en grasas"]),
    carnes_bg: computed(() => portionsFood["Carnes bajos en grasas"]),
    legumbres: computed(() => portionsFood["legumbres"]),
    lacteos_ag: computed(() => portionsFood["Lácteos altos en grasas"]),
    lacteos_bg: computed(() => portionsFood["Lácteos bajos en grasas"]),
    lacteos_mg: computed(() => portionsFood["Lácteos medios en grasas"]),
    aceites_grasas: computed(() => portionsFood["Aceites y Grasas"]),
    alim_ricos_lipidos: computed(() => portionsFood["Ricos en lípidos"]),
    azucares: computed(() => portionsFood["Azúcares"])
})

const totales = reactive({
    calorias: 0,
    cho: 0,
    lipidos: 0,
    proteinas: 0
})

const percentages = reactive({
    calorias: 0,
    cho: 0,
    lipidos: 0,
    proteinas: 0
})

const TotalPortions = () => {
    const valores = Object.values(portionsFood)
    totales.calorias = 0
    totales.cho = 0
    totales.lipidos = 0
    totales.proteinas = 0
    for(let i=0; i< 13; i++){
      totales.calorias += valores[i] * props.indicadores[i].calorias
      totales.cho += valores[i] * props.indicadores[i].cho
      totales.lipidos += valores[i] * props.indicadores[i].lipidos
      totales.proteinas += valores[i] * props.indicadores[i].proteinas
    }
    percentages.calorias = Math.round((totales.calorias/props.requirements.get) * 100)
    percentages.cho = Math.round((totales.cho/props.requirements.carbohidratos) * 100)
    percentages.lipidos = Math.round((totales.lipidos/props.requirements.lipidos) * 100)
    percentages.proteinas = Math.round((totales.proteinas/props.requirements.proteina) * 100)
}


const Next = () =>{
    emit("goToStep", props.currentStep + 1);
    emit("getPortions", dataPortions, totales.calorias)
}

const Previous = () =>{
    emit("goToStep", props.currentStep - 1);
}

watch(() => {
    TotalPortions()
});
</script>

<template>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Porciones por grupo de alimento</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key) of portionsFood" :key="key">
                <IonInput :label="key" v-model.number="portionsFood[key]" type="number" min="0"></IonInput>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Cálculo</IonLabel>
        </IonItemDivider>
        <div class="grid grid-flow-row auto-rows-auto">
            <div class="grid grid-cols-6 text-center">
                <IonCol class="col-span-2 text-left">Grupo</IonCol>
                <IonCol>Cal</IonCol>
                <IonCol>CHO</IonCol>
                <IonCol>Líp</IonCol>
                <IonCol>Pro</IonCol>
            </div>
            <div v-for="(value, key, index) of portionsFood" :key="key" class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">{{ key }}</IonCol>
                <IonCol>{{ props.indicadores[index].calorias * value }}</IonCol>
                <IonCol>{{ props.indicadores[index].cho * value }}</IonCol>
                <IonCol>{{ props.indicadores[index].lipidos * value }}</IonCol>
                <IonCol>{{ props.indicadores[index].proteinas * value }}</IonCol>
            </div>
            <div class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">Total</IonCol>
                <IonCol v-for="(value, key) of totales" :key="key" >
                    {{ value }}
                </IonCol>
            </div>
            <div class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">Requerimientos</IonCol>
                <IonCol>{{ props.requirements.get }}</IonCol>
                <IonCol>{{ props.requirements.carbohidratos }}</IonCol>
                <IonCol>{{ props.requirements.lipidos }}</IonCol>
                <IonCol>{{ props.requirements.proteina }}</IonCol>
            </div>
            <div class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">%Adecuación</IonCol>
                <IonCol v-for="(value, key) of percentages" :key="key" >
                    {{ value }} %
                </IonCol>
            </div>
        </div>
    </IonItemGroup>
    <div class="flex justify-between m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Next()">Siguiente</IonButton>
    </div>

</template>