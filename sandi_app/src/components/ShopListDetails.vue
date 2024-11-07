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
    onIonViewWillEnter
} from '@ionic/vue';
import { chevronBack, ellipseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useShoppingListStore } from "@/stores";
import { transformString } from '@/utilities'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter();
const shoppingListStore = useShoppingListStore();


const shoppingList = ref({})
const menudetails = ref({})

const BackPage = () => {
    router.go(-1)
}

const getData = async () => {
    await shoppingListStore.ShowShoppingList(props.id);
    shoppingList.value = shoppingListStore.GetShoppingList.list;
    menudetails.value = shoppingListStore.GetShoppingList.menu
}

onIonViewWillEnter(() => {
    getData()
})

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
                    {{ menudetails.name }}
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
                    <div class="capitalize">{{ menudetails.type  }}</div>
                    <div class="font-PoppinsBold">Generado por:</div>
                    <div >{{ menudetails.sandi_recipe ? 'Asistente' : 'Nutricionista' }}</div>
                </div>
            </div>
            <div class="border-b flex flex-col gap-y-3 pb-2">
                <div class="font-PoppinsBold">
                    Lista de compras
                </div>
                <div class="text-xs flex flex-col gap-2">
                    <div 
                        v-for="(values, key) in shoppingList" :key="key"
                        class="flex items-start gap-x-2"
                    >
                        <IonIcon aria-hidden="true" :icon="ellipseOutline" slot="icon-only"></IonIcon>
                        <div class="flex flex-col gap-y-2">
                             <div>{{ values.amount }} de {{ transformString(key) }}</div>
                             <div>{{ values.price ? `(precio de referencia: ${values.price})`: '' }}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </IonContent>
    </IonPage>
</template>
