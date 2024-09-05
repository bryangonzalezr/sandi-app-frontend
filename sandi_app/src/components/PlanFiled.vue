<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonItem,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonGrid,
  IonRow,
  IonModal,
  IonDatetime,
  IonDatetimeButton,
  onIonViewWillEnter,
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { usePlanStore } from '@/stores';

const router = useRouter();

const usePlan = usePlanStore();

const plansFiled = ref([])
const datetime = ref('')
const IconDate = ref()
const modal = ref();

const goToBack = () => {
  router.push({ name: "Patients" });
}

const Confirm = () => {
    IconDate.value.$el.confirm()
    modal.value.$el.dismiss()
    getData(formatDate(datetime.value))
}

const formatDate = function(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0'); // Obtener día
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtener mes (los meses son base 0, por lo que sumamos 1)
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

const getData = async (date) => {
    await usePlan.ObtainPlanfiled(date)
    plansFiled.value = usePlan.GetPlansfiled;
    console.log(date)
    console.log(plansFiled.value)
}

const ObtainDate = () => {
    const date = new Date();
    let dayChange = -2;
    if (date.getDate() + dayChange <= 0) {
      dayChange = -dayChange;
    }
    date.setDate(date.getDate() + dayChange);
    datetime.value = date.toISOString();
}

onIonViewWillEnter(() => {
    ObtainDate()
    getData()
});

</script>

<template>
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
                <IonButton @click="goToBack()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
            </IonButtons>
            <IonTitle>Control Plan Nutricional</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonGrid>
                    <IonRow>Filtrar por fecha</IonRow>
                    <IonRow>
                        <IonDatetimeButton datetime="date">Filtar por fecha</IonDatetimeButton>
                        <IonModal :keep-contents-mounted="true" ref="modal">
                            <IonDatetime presentation="date" id="date" ref="IconDate" v-model="datetime" >
                                <IonButtons slot="buttons">
                                    <IonButton color="primary" @click="Confirm()">Listo</IonButton>
                                </IonButtons>
                            </IonDatetime>
                        </IonModal>
                    </IonRow>
                </IonGrid>
            </IonItem>
            <IonItem>
                <IonList>
                    <template v-if="plansFiled.length > 0">
                        <IonCard v-for="(plan, index) of plansFiled" :key="plan._id">
                            <IonCardHeader>
                              <IonCardTitle>Plan N°{{index+1}}</IonCardTitle>
                              <IonCardSubtitle>{{ formatDate(plan.created_at) }}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonList>
                                    <IonGrid v-if="plan.desayuno">
                                        <IonRow class="font-bold text-black">Desayuno</IonRow>
                                        <IonRow>{{ plan.desayuno }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.almuerzo">
                                        <IonRow class="font-bold text-black">Almuerzo</IonRow>
                                        <IonRow>{{ plan.almuerzo }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.colacion">
                                        <IonRow class="font-bold text-black">Colación</IonRow>
                                        <IonRow>{{ plan.colacion }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.once">
                                        <IonRow class="font-bold text-black">Once</IonRow>
                                        <IonRow>{{ plan.once }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.cena">
                                        <IonRow class="font-bold text-black">Cena</IonRow>
                                        <IonRow>{{ plan.cena }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.general_recommendations">
                                        <IonRow class="font-bold text-black">Recomendaciones Generales</IonRow>
                                        <IonRow>{{ plan.general_recommendations }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.forbidden_foods">
                                        <IonRow class="font-bold text-black">Limitar el consumo de...</IonRow>
                                        <IonRow>{{ plan.forbidden_foods }}</IonRow>
                                    </IonGrid>
                                    <IonGrid v-if="plan.free_foods">
                                        <IonRow class="font-bold text-black">Alimentos libres de consumo</IonRow>
                                        <IonRow>{{ plan.free_foods }}</IonRow>
                                    </IonGrid>
                                </IonList>
                            </IonCardContent>
                        </IonCard>
                    </template>
                    <template v-else>
                        No hay planes nutricionales archivados con la fecha seleccionada
                    </template>
                </IonList>
            </IonItem>
        </IonContent>
    </IonPage>
</template>