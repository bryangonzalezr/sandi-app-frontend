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
import { ref } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["goToStep"]);

const portionsFood = ref([
    {
        food: 'Cereales',
        portion: 4,
    },
    {
        food: 'Verduras General',
        portion: 4
    },
    {
        food: 'Verduras Libre Consumo',
        portion: 3
    },
    {
        food: 'Frutas',
        portion: 2
    },
    {
        food: 'Carnes Altos en grasa',
        portion: 0
    },
    {
        food: 'Carnes Bajos en grasa',
        portion: 3
    },
    {
        food: 'Legumbres',
        portion: 1
    },
    {
        food: 'Lácteos Altos en grasa',
        portion: 2
    },
    {
        food: 'Lácteos Medios en grasa',
        portion: 0
    },
    {
        food: 'Lácteos Bajos en grasa',
        portion: 0
    },
    {
        food: 'Aceites y Grasas',
        portion: 2
    },
    {
        food: 'Alimentos ricos en lípidos',
        portion: 0
    },
    {
        food: 'Azúcar',
        portion: 1
    },

])


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
            <IonLabel>Porciones por grupo de alimento</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion" type="number"></IonInput>
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
            <div v-for="group of portionsFood" :key="group.food" class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">{{ group.food }}</IonCol>
                <IonCol>{{ group.portion }}</IonCol>
                <IonCol>{{ group.portion }}</IonCol>
                <IonCol>{{ group.portion }}</IonCol>
                <IonCol>{{ group.portion }}</IonCol>
            </div>
            <div class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">Total</IonCol>
                <IonCol>0</IonCol>
                <IonCol>0</IonCol>
                <IonCol>0</IonCol>
                <IonCol>0</IonCol>
            </div>
            <div class="grid grid-cols-6 text-center items-center">
                <IonCol class="col-span-2 text-left">%Adecuación</IonCol>
                <IonCol>0%</IonCol>
                <IonCol>0%</IonCol>
                <IonCol>0%</IonCol>
                <IonCol>0%</IonCol>
            </div>
        </div>
    </IonItemGroup>
    <div class="flex justify-between m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Next()">Siguiente</IonButton>
    </div>

</template>