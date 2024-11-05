<script setup>
import { 
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage, 
    IonTitle, 
    IonToolbar,
} from '@ionic/vue';
import { chevronBack, ellipseOutline } from 'ionicons/icons';
import { useRouter } from "vue-router";

const router = useRouter();

const BackPage = () => {
    router.go(-1)
}

</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="BackPage()">
                        <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>
                    Menú 1
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div 
              class="flex flex-col gap-y-3 m-6 py-6 pl-8 pr-4 bg-extralight-beige rounded-[50px] shadow-inner-lg"
            >
            <div class="border-b flex flex-col gap-y-3 pb-2">
                <div class="font-PoppinsBold">
                    Detalles Menú
                </div>
                <div class="text-xs grid grid-cols-2 gap-2">
                    <div class="font-PoppinsBold">Tipo:</div>
                    <div class="">Diario</div>
                    <div class="font-PoppinsBold">Generado por:</div>
                    <div class="">Asistente</div>
                </div>
            </div>
            <div class="border-b flex flex-col gap-y-3 pb-2">
                <div class="font-PoppinsBold">
                    Lista de compras
                </div>
                <div class="text-xs flex flex-col gap-2">
                    <div 
                        v-for="num in [1,2,3,4,5,6,7,8,9]" :key="num"
                        class="flex items-center gap-x-2"
                    >
                        <IonIcon aria-hidden="true" :icon="ellipseOutline" slot="icon-only"></IonIcon> 
                        {{ num+2 }} de Ingrediente {{ num }}
                    </div>
                </div>
            </div>
            </div>
        </IonContent>
    </IonPage>
</template>
