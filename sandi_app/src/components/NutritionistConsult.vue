<script setup>
import { 
  IonPage, 
  IonButtons, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonItem,
  IonIcon, 
  IonInput,
  IonGrid,
  IonCard, 
  IonCardHeader,
  IonModal,
  IonDatetime,
  IonDatetimeButton,
  IonLabel,
  onIonViewWillEnter,
} from '@ionic/vue';
import { ref } from 'vue';
import { chevronBack } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { useConsultStore } from '@/stores';
import { useRouter } from 'vue-router';

const props = defineProps({
  id : {
    type: Number,
    required: true
  }
});

const dateCurrent = ref(new Date(Date.now()))

const router = useRouter();

const consultStore = useConsultStore();
const { consulta } = storeToRefs(consultStore);

const Confirm = () => {
    IconDate.value.$el.confirm()
    modal.value.$el.dismiss()
}

const formatDate = function(dateString, option) {
    const date = new Date(dateString)
    let dayChange = -2;
    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }
    const day = String(date.getDate() - dayChange).padStart(2, '0'); // Obtener día
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener mes (los meses son base 0, por lo que sumamos 1)
    const year = date.getFullYear()
    if(option == 1){
      return `${day}-${month}-${year}`
    }else{
      return `${year}-${month}-${day}T00:00:00`
    }
  
}

const ObtainDate = () => {
    const date = new Date();
    let dayChange = -2;
    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }
    date.setDate(date.getDate() + dayChange);
    consulta.date = date.toISOString();
    dateCurrent.value = formatDate(date.toString(),2);
}

const returnToPatients = () =>{
  router.push({ name: "PatientProfile", params: { id: props.id }})
};

const saveConsult = async () => {
  await consultStore.saveConsult(props.id, formatDate(consulta.date,1))
}

onIonViewWillEnter(() => {
  ObtainDate()
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="returnToPatients()">
            <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>Consulta Paciente {{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard class="grid" color="secondary">
        <IonCardHeader><h1>Datos comunes</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-2 gap-2 py-2 justify-center content-center items-center">
            <IonLabel>Fecha de consulta</IonLabel>
            <IonDatetimeButton datetime="date"></IonDatetimeButton>
            <IonModal :keep-contents-mounted="true" ref="modal">
                <IonDatetime presentation="date" id="date" ref="IconDate" :max="dateCurrent" v-model="consulta.date" >
                    <IonButtons slot="buttons">
                        <IonButton color="primary" @click="Confirm()">Listo</IonButton>
                    </IonButtons>
                </IonDatetime>
            </IonModal>
            <IonInput v-model="consulta.height" label="Estatura" label-placement="stacked"  placeholder="Ingresar estatura" type="number"></IonInput>
            <IonInput v-model="consulta.weight" label="Peso" label-placement="stacked"  placeholder="Ingresar peso" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Plieges</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.bicipital_skinfold" label="Biciptal"  label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.tricipital_skinfold" label="Triciptal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.subscapular_skinfold" label="Sub Escap" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.supraspinal_skinfold" label="Supraespinal" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.suprailiac_skinfold" label="Supra Cres" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thigh_skinfold" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.calf_skinfold" label="Pantorilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.abdomen_skinfold" label="Abdomen" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Perimetros</h1></IonCardHeader>
        <IonItem>
          <IonGrid class="grid grid-cols-3 gap-2 py-2 justify-center content-center items-center">
            <IonInput v-model="consulta.pb_relaj" label="Pb Relajado" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.pb_contra" label="Pb contraido" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.forearm" label="Antebrazo" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thigh" label="Muslo medio" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.calf" label="Pantorrilla" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.waist" label="Cintura" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
            <IonInput v-model="consulta.thorax" label="Torax" label-placement="stacked" placeholder="Ingresar medida" type="number"></IonInput>
          </IonGrid>
        </IonItem>
        <IonButton @click="saveConsult()" class="place-self-center">Almacenar consulta</IonButton>
      </IonCard>
    </IonContent>
  </IonPage>
</template>