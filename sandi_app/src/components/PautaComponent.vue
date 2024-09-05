<script setup>
import {
  IonItem,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonTextarea,
  IonButton,
} from '@ionic/vue';
import { reactive, onMounted, watch } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  portionsService: {
    type: Object,
    required: true,
  },
  pautaResults: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(["goToStep", "getPauta"]);

const Pauta = reactive({
    "patient_id": props.id,
    "desayuno": "",
    "colacion": "",
    "almuerzo": "",
    "once": "",
    "cena": "",
    "general_recommendations": "",
    "forbidden_foods": "",
    "free_foods": ""
})

const Finish = () => {
    emit("goToStep", props.currentStep + 1);
    emit("getPauta", Pauta);
}

const Previous = () =>{
    emit("goToStep", props.currentStep - 1);
}

const getData = () => {
    Pauta.desayuno = props.pautaResults.desayuno;
    Pauta.colacion = props.pautaResults.colacion;
    Pauta.almuerzo = props.pautaResults.almuerzo;
    Pauta.once = props.pautaResults.once;
    Pauta.cena = props.pautaResults.cena;
    Pauta.general_recommendations = props.pautaResults.general_recommendations;
    Pauta.forbidden_foods = props.pautaResults.forbidden_foods;
    Pauta.free_foods = props.pautaResults.free_foods;
}

watch(() => props.pautaResults, () => {
  getData()
})

onMounted(() => {
    if('desayuno' in props.pautaResults){
        getData();
    }
})
</script>

<template>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Desayuno</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.desayuno" label-placement="stacked" placeholder="Defina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Almuerzo</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.almuerzo" label-placement="stacked" placeholder="Defina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Colación</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.colacion" label-placement="stacked" placeholder="Defina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Once</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.once" label-placement="stacked" placeholder="Defina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Cena</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.cena" label-placement="stacked" placeholder="Defina porciones, hora y ejemplos de alimentos con sus porciones"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Recomendaciones Generales</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.general_recommendations" label-placement="stacked" placeholder="Recomendaciones generales (Ej: Prefiera productos que digan  bajo en sodio.)"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Limitar el consumo de</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.forbidden_foods" label-placement="stacked" placeholder="Defina los alimentos que debe evitar el paciente (Ej: Frituras)"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <IonItemGroup>
        <IonItemDivider>
            <IonLabel>Alimentos Libres</IonLabel>
        </IonItemDivider>
        <IonItem>
            <IonTextarea v-model="Pauta.free_foods" label-placement="stacked" placeholder="Defina los alimentos de libre consumo (Ej: Lechuga)"></IonTextarea>
        </IonItem>
    </IonItemGroup>
    <div class="flex justify-between m-2">
        <IonButton @click="Previous()">Volver</IonButton>
        <IonButton @click="Finish()" :disabled="(Pauta.desayuno == '' || Pauta.almuerzo == '' || (Pauta.colacion == '' && Pauta.once == '' && Pauta.cena == ''))"> Finalizar y Guardar</IonButton>
    </div>

</template>