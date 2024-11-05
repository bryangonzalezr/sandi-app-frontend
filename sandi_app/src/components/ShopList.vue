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

const router = useRouter();

const shoppingListStore = useShoppingListStore();


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
    console.log(shoppingLists.value)
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
            <div class="p-4 flex flex-col mb-4 gap-y-4">
                <div 
                    v-for="(shoplist,index) in shoppingLists" :key="index"
                    class="shop-list p-4 flex flex-col gap-y-1 pt-[50px]"
                >
                    <div class="flex justify-between items-center">
                      <div class="uppercase font-PoppinsBold text-base">{{ shoplist.menu.name }}</div>
                      <IonButton class="shop-list-button" @click="goToDetails(shoplist.menu._id)">Ver más</IonButton>
                    </div>
                    <div class="flex flex-col gap-y-2 text-xs overflow-hidden">
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
}

.shop-list-button{
  --background: var(--mid-red);
  --color: var(--dark-red);
  font-family: 'PoppinsBold';
  font-size: 10px;
  width: fit-content;
  height: fit-content;
}
</style>