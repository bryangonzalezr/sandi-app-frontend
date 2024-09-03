<script setup>
import {
  IonItem,
  IonSelect,
  IonSelectOption,
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

const selectedMethod = ref("")

const Next = () =>{
    emit("goToStep", props.currentStep + 1);
}
</script>

<template>
    <IonItem>
        <IonSelect label="Método para calcular GEB" v-model="selectedMethod">
            <IonSelectOption value="Normal">Factorial paciente sano</IonSelectOption>
            <IonSelectOption value="Factorial">Facotorial paciente enfermo</IonSelectOption>
            <IonSelectOption value="FAO/OMS/ONU">FAO/OMS/ONU</IonSelectOption>
            <IonSelectOption value="Harris-Benedict">Harris-Benedict</IonSelectOption>
        </IonSelect>
    </IonItem>
    <div class="flex justify-end m-2">
        <IonButton @click="Next()">Siguiente</IonButton>
    </div>

</template>