<script setup>
import {
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonTextarea,
  IonButton,
} from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["goToStep"]);

const Pauta = ref([
    {
        service: 'Desayuno',
        indicator: ''
    },
    {
        service: 'Almuerzo',
        indicator: ''
    },
    {
        service: 'Colación 1',
        indicator: ''
    },
    {
        service: 'Cena',
        indicator: ''
    },
    {
        service: 'Once',
        indicator: ''
    },
    {
        service: 'Colación 2',
        indicator: ''
    }
])

const Finish = () => {
    emit("goToStep", props.currentStep + 1);
}

const Previous = () =>{
    emit("goToStep", props.currentStep - 1);
}
</script>

<template>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Desayuno</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[0].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Almuerzo</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[1].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Colación</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[2].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Once</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[3].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Cena</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[4].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Colación</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta[5].indicator" label-placement="stacked" placeholder="Desfina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <div class="flex justify-end m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Finish()">Finalizar y Guardar</IonButton>
    </div>

</template>