<script setup>
// Importar Componentes IONIC
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons,  
    IonButton, 
    IonLabel,
    IonIcon,
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonItemDivider,
    IonItemGroup,
    IonItem
} from '@ionic/vue';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { chevronBack, chevronForward } from 'ionicons/icons';
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useMenuStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const menuStore = useMenuStore();
const { daymenus, weekmenus, monthmenus, menus } = storeToRefs(menuStore);

// Definir variables referenciales o reactivas

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Redirecciona a la vista de generar menú MenuPage.vue */
const goToMenu = () => {
  router.push('/menu');
}

/* Redirecciona a la vista para ver los detalles de un menu MenuDetails.vue */
const ViewMenuDetails = (menu, index, type) => {
    menuStore.SelectedMenu(menu);
    router.push({ name: "MenuDetail", params: { id: index, type: type}});
}

/* Elimina un menú de la BD */
const DeleteMenu = async (id_menu, typemenu) => {
    await menuStore.DeleteMenu(id_menu, typemenu);
    await menuStore.IndexMenus();
}

onMounted(() => {
    menuStore.IndexMenus();
});

</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonTitle>Menus guardados</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="text-center" v-if="menus.length == 0">
                No posees recetas guardadas
            </div>
            <div v-else class="flex flex-col gap-y-11 p-6">
                <div v-for="(menu,index) in menus" :key="index" 
                class="py-6 pl-8 pr-4 bg-light-green rounded-[50px] shadow-inner-lg flex items-center justify-between"
                :class="index % 3 === 0 ? 'bg-light-green' : index % 3 === 1 ? 'bg-mid-red' : 'bg-light-orange'">
                    <div class="flex flex-col gap-y-3">
                        <div class="font-PoppinsBold text-base">
                            {{ menu.name }}
                        </div>
                        <div>
                            Tipo de menu: {{ menu.type }}
                        </div>
                        <div>
                            Calorias: {{ Math.round(menu.total_calories) }} kcal  
                        </div>
                    </div>
                    <button class="text-white text-2xl text-center" @click="ViewMenuDetails(menu, index+1 ,menu.type)">
                        <IonIcon :icon="chevronForward"></IonIcon>
                    </button>
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>