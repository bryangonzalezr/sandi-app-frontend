<script setup>
import { 
    IonButton, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonPage, 
    IonTitle, 
    IonToolbar 
} from '@ionic/vue';
import { chevronBack, ellipseOutline } from 'ionicons/icons';
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
    router.push({name: 'Home'})
}

const goToDetails = () => {
    router.push({ name: 'ShopListDetails' })
}

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
                    v-for="num in [1,2,3,4]" :key="num"
                    class="shop-list p-4 flex flex-col gap-y-1 pt-[50px]"
                >
                    <div class="flex justify-between items-center">
                      <div class="uppercase font-PoppinsBold text-base">Menú {{ num }}</div>
                      <IonButton class="shop-list-button" @click="goToDetails">Ver más</IonButton>
                    </div>
                    <div class="flex flex-col gap-y-2 text-xs overflow-hidden">
                        <div   
                            v-for="num in [1,2,3,4,5,6,7,8,9]" :key="num"
                            class="flex items-center gap-x-2 text-[13px ]"
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