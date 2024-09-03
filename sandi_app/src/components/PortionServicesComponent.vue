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
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Verduras General',
        portion: 4,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Verduras Libre Consumo',
        portion: 3,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Frutas',
        portion: 2,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Carnes Altos en grasa',
        portion: 0,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Carnes Bajos en grasa',
        portion: 3,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Legumbres',
        portion: 1,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Lácteos Altos en grasa',
        portion: 2,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Lácteos Medios en grasa',
        portion: 0,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Lácteos Bajos en grasa',
        portion: 0,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Aceites y Grasas',
        portion: 2,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Alimentos ricos en lípidos',
        portion: 0,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
    },
    {
        food: 'Azúcar',
        portion: 1,
        portion_lunch: 0,
        portion_dinner: 0,
        portion_snack1: 0,
        portion_snack2: 0,
        portion_breakfast:0,
        portion_once: 0,
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
            <IonLabel>Porciones definidas</IonLabel>
        </IonItemDivider>
        <IonList>
            <IonCard v-for="group of portionsFood" :key="group.food">
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_breakfast" type="number"></IonInput>
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_lunch" type="number"></IonInput>
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_snack1" type="number"></IonInput>
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_once" type="number"></IonInput>
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_dinner" type="number"></IonInput>
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
            <IonItem v-for="group of portionsFood" :key="group.food">
                <IonInput :label="group.food" v-model.number="group.portion_snack2" type="number"></IonInput>
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
