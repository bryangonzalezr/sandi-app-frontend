<script setup>
import {
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
} from '@ionic/vue';
import { reactive , ref, watch, onMounted } from 'vue';
import { usePlanStore } from "@/stores";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  type_patient: {
    type: String,
    required: true,
  },
  requirementsResult: {
    type: Object,
    required: false,
  },
  lastMethod:{
    type: Object,
    required: false,
  }
});

const usePlan = usePlanStore();

const emit = defineEmits(["goToStep", 'getRequirements']);

const selectedMethod = reactive({
  patient_id: props.id,
  method: '',
  rest_type: ''
})

const viewResults = ref(false)

const Results = reactive({})

const Next = () =>{
  emit('getRequirements', selectedMethod);
  emit("goToStep", props.currentStep + 1);
}

const Consult = (method) =>{
  emit('getRequirements', method);
  getResult(method)
}

const getResult = async (method) => {
  await usePlan.Requeriments(method)
  Results.value = usePlan.GetRequirements.data.data;
  viewResults.value = true;
}

const getData = () => {
  Results.value = props.requirementsResult
  selectedMethod.method = props.lastMethod.method
  selectedMethod.rest_type = props.lastMethod.rest_type
  viewResults.value = true;
}
 
watch(selectedMethod,(newMethod, oldMethod) => {
  if(newMethod.method != ''){
    if(newMethod.method == 'Harris-Benedict' && newMethod.rest_type != ''){
      Consult(newMethod)
    }
    if(newMethod.method != 'Harris-Benedict'){
      Consult(newMethod)
    }
  }
  if(newMethod.method != oldMethod.method){
    if(newMethod.method == 'Harris-Benedict' && newMethod.rest_type != ''){
      Consult(newMethod)
    }
    if(newMethod.method != 'Harris-Benedict'){
      Consult(newMethod)
    }
  }
})

watch(() => props.requirementsResult, () => {
  getData()
})

onMounted(() => {
  if('get' in props.requirementsResult){
    getData()
  }
})

</script>

<template>
    <IonItem>
        <IonSelect label="Método para calcular GEB" v-model="selectedMethod.method">
            <IonSelectOption value="Normal">Factorial paciente sano</IonSelectOption>
            <IonSelectOption value="Factorial" v-if="props.type_patient == 'Enfermo'">Facotorial paciente enfermo</IonSelectOption>
            <IonSelectOption value="FAO/OMS/ONU">FAO/OMS/ONU</IonSelectOption>
            <IonSelectOption value="Harris-Benedict" v-if="props.type_patient == 'Enfermo'">Harris-Benedict</IonSelectOption>
        </IonSelect>
    </IonItem>
    <IonItem v-if="selectedMethod.method == 'Harris-Benedict'">
        <IonSelect label="Factor de reposo" v-model="selectedMethod.rest_type">
            <IonSelectOption value="Absoluto">Absoluto (cama)</IonSelectOption>
            <IonSelectOption value="Relativo">Relativo (cama-sillón-baño)</IonSelectOption>
            <IonSelectOption value="Ambulatorio">Ambulatorio (deambulación)</IonSelectOption>
        </IonSelect>
    </IonItem>
    <IonItemGroup v-if="viewResults">
        <IonItemDivider>
          <IonLabel>Resultados</IonLabel>
        </IonItemDivider>
        <IonItem>
          <IonLabel>GET: {{ Results.value.get }}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Proteina: {{ Results.value.proteina }}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Lípidos: {{ Results.value.lipidos }}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Carbohidratos: {{ Results.value.carbohidratos }}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Agua: {{ Results.value.agua }}</IonLabel>
        </IonItem>
    </IonItemGroup>
    <div class="flex justify-end m-2">
        <IonButton @click="Next()" :disabled="selectedMethod.method=='' || (selectedMethod.method=='Harris-Benedict' && selectedMethod.rest_type=='')">Siguiente</IonButton>
    </div>

</template>