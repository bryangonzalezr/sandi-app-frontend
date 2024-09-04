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
import { reactive } from 'vue';

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
  }
});

const emit = defineEmits(["goToStep"]);

const food = [
    "Cereales",
    "Verduras general",
    "Verduras Libre Consumo",
    "Frutas",
    "Carnes altos en grasas",
    "Carnes bajos en grasas",
    "legumbres",
    "Lácteos altos en grasas",
    "Lácteos medios en grasas",
    "Lácteos bajos en grasas",
    "Aceites y Grasas",
    "Ricos en lípidos",
    "Azúcares", 
]

const portionsFood = reactive({
    "patient_id": 3,
    "desayuno": {
        "desayuno.cereales": 0,
        "desayuno.verduras_gral": 0,
        "desayuno.verduras_libre_cons": 0,
        "desayuno.frutas": 0,
        "desayuno.carnes_ag": 0,
        "desayuno.carnes_bg": 0,
        "desayuno.lacteos_ag": 0,
        "desayuno.lacteos_mg": 0,
        "desayuno.lacteos_bg": 0,
        "desayuno.aceites_grasas": 0,
        "desayuno.azucares": 0
    },
   
    "colacion": {
        "colacion.cereales": 0,
        "colacion.verduras_gral": 0,
        "colacion.verduras_libre_cons": 0,
        "colacion.frutas": 0,
        "colacion.carnes_ag": 0,
        "colacion.carnes_bg": 0,
        "colacion.lacteos_ag": 0,
        "colacion.lacteos_mg": 0,
        "colacion.lacteos_bg": 0,
        "colacion.aceites_grasas": 0,
        "colacion.azucares": 0
    },
    "almuerzo": {
        "almuerzo.cereales": 0,
        "almuerzo.verduras_gral": 0,
        "almuerzo.verduras_libre_cons": 0,
        "almuerzo.frutas": 0,
        "almuerzo.carnes_ag": 0,
        "almuerzo.carnes_bg": 0,
        "almuerzo.lacteos_ag": 0,
        "almuerzo.lacteos_mg": 0,
        "almuerzo.lacteos_bg": 0,
        "almuerzo.aceites_grasas": 0,
        "almuerzo.azucares": 0
    },
    "once": {
        "once.cereales": 0,
        "once.verduras_gral": 0,
        "once.verduras_libre_cons": 0,
        "once.frutas": 0,
        "once.carnes_ag": 0,
        "once.carnes_bg": 0,
        "once.lacteos_ag": 0,
        "once.lacteos_mg": 0,
        "once.lacteos_bg": 0,
        "once.aceites_grasas": 0,
        "once.azucares": 0
    },
    "cena": {
        "cena.cereales": 0,
        "cena.verduras_gral": 0,
        "cena.verduras_libre_cons": 0,
        "cena.frutas": 0,
        "cena.carnes_ag": 0,
        "cena.carnes_bg": 0,
        "cena.lacteos_ag": 0,
        "cena.lacteos_mg": 0,
        "cena.lacteos_bg": 0,
        "cena.aceites_grasas": 0,
        "cena.azucares": 0
    }
})

const totales = reactive({
    desayuno: 0,
    colacion: 0,
    almuerzo: 0,
    once: 0,
    cena: 0
})


const Next = () =>{
    emit("goToStep", props.currentStep + 1);
}

const Previous = () =>{
    emit("goToStep", props.currentStep - 1);
}
</script>

<template>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Porciones definidas</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonCard v-for="group of props.portionsGroup" :key="group.food">
                <IonCardHeader>
                    <IonCardSubtitle>{{ group.food }}</IonCardSubtitle>
                    <IonCardTitle>{{ group.portion }}</IonCardTitle>
                </IonCardHeader>
            </IonCard>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Desayuno</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key, index) of portionsFood.desayuno" :key="key">
                <IonInput :label="food[index]" v-model="portionsFood.desayuno[key]" type="number"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>0</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>0</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Almuerzo</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key, index) of portionsFood.almuerzo" :key="key">
                <IonInput :label="food[index]" v-model="portionsFood.almuerzo[key]" type="number"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>0</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>0</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Colación</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key, index) of portionsFood.colacion" :key="key">
                <IonInput :label="food[index]" v-model="portionsFood.colacion[key]" type="number"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>0</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>0</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Once</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key, index) of portionsFood.once" :key="key">
                <IonInput :label="food[index]" v-model="portionsFood.once[key]" type="number"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>0</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>0</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Cena</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="(value, key, index) of portionsFood.cena" :key="key">
                <IonInput :label="food[index]" v-model="portionsFood.cena[key]" type="number"></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Total Calorias</IonLabel>
                <div>0</div>
            </IonItem>
            <IonItem>
                <IonLabel>% Calorias</IonLabel>
                <div>0</div>
            </IonItem>
        </IonList>
    </IonItemGroup>
    <div class="flex justify-between m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Next()">Siguiente</IonButton>
    </div>

</template>
