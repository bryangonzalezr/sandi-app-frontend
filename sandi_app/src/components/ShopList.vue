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
    IonSpinner,
    onIonViewWillEnter
} from '@ionic/vue';
import { chevronBack, ellipseOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useShoppingListStore } from "@/stores";
import { transformString } from '@/utilities'
import { storeToRefs } from 'pinia';

const router = useRouter();

const shoppingListStore = useShoppingListStore();

const { isLoading } = storeToRefs(shoppingListStore)

const shoppingLists = ref([])

const goToHome = () => {
    router.push({name: 'Home'})
}

const goToDetails = (id) => {
    router.push({ name: 'ShopListDetails', params: {id: id}})
}

const getData = async () => {
    await shoppingListStore.IndexShoppingList();
    shoppingLists.value = shoppingListStore.GetShoppingLists;
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
                    <IonButton @click="goToHome()">
                        <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Listas de Compras</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div v-if="isLoading" class="w-full flex justify-center mt-4">
              <IonSpinner name="dots" color="danger"></IonSpinner>
            </div>
            <div class="p-4 flex flex-col justify-center items-center mb-4 gap-y-4" v-else>
                <div 
                    v-for="(shoplist,index) in shoppingLists" :key="index"
                    class="shop-list pl-4 pr-2 flex flex-col gap-y-1 pt-[50px]"
                >
                    <div class="flex justify-between items-center">
                      <div class="uppercase font-PoppinsBold text-base">{{ shoplist.menu.name }}</div>
                      <IonButton class="shop-list-button" @click="goToDetails(shoplist.menu._id)">Ver más</IonButton>
                    </div>
                    <div class="flex flex-col gap-y-0.5 text-xs overflow-hidden">
                        <div   
                            v-for="(values,key) in shoplist.list" :key="key"
                            class="flex items-start gap-x-2 text-[13px ]"
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

<style scoped>
.shop-list{
  background-image: url('@/theme/images/Lista_compras.png');
  background-size: 325.89px 250px;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  width: 325.89px;
}

.shop-list-button{
    --background: var(--mid-red);
    --color: var(--dark-red);
    font-family: 'PoppinsBold';
    font-size: 0.75rem;
}
</style>