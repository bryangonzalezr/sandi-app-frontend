<script setup>
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons,  
    IonButton, 
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonItemDivider,
    IonItemGroup,
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores";

const menuStore = useMenuStore();
const { daymenus, weekmenus, monthmenus } = storeToRefs(menuStore);


const router = useRouter();


const DeleteMenu = async (id_menu, typemenu) => {
    await menuStore.DeleteMenu(id_menu, typemenu);
    await menuStore.ViewMenuList();
}

 const ViewMenuDetails = (menu, index, type) => {
    menuStore.SelectedMenu(menu);
    router.push({ name: "MenuDetail", params: { id: index, type: type}});
}

const goToMenu = () => {
  router.push('/menu');
}

</script>

<template>
    <IonPage>
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="goToMenu()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Menus guardados</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItemGroup>
                <IonItemDivider>
                  <IonLabel> Menus diarios </IonLabel>
                </IonItemDivider>
                <IonList v-if="daymenus.length > 0">
                    <IonCard v-for="(daymenu,index) in daymenus" :key="index">
                        <IonCardHeader>
                          <IonCardTitle>Menú diario N°{{ index + 1 }}</IonCardTitle>
                        </IonCardHeader>
                        <IonButton @click="ViewMenuDetails(daymenu, index+1, 'diario')">Ver Más</IonButton>
                        <IonButton @click="DeleteMenu(daymenu.id, 'día')">Borrar</IonButton>
                    </IonCard>
                </IonList>
                <IonItem v-else>
                    No hay menús diarios para mostrar
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                  <IonLabel> Menus Semanales </IonLabel>
                </IonItemDivider>
                <IonList v-if="weekmenus.length > 0">
                    <IonCard v-for="(weekmenu,index) in weekmenus" :key="index">
                        <IonCardHeader>
                          <IonCardTitle>Menú semanal N°{{ index + 1 }}</IonCardTitle>
                        </IonCardHeader>
                        <IonButton @click="ViewMenuDetails(weekmenu, index+1, 'semanal')">Ver Más</IonButton>
                        <IonButton @click="DeleteMenu(weekmenu.id, 'semana')">Borrar</IonButton>
                    </IonCard>
                </IonList>
                <IonItem v-else>
                    No hay menús semanales para mostrar
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                  <IonLabel> Menus Mensuales </IonLabel>
                </IonItemDivider>
                <IonList v-if="monthmenus.length > 0">
                    <IonCard v-for="(monthmenu,index) in monthmenus" :key="index">
                        <IonCardHeader>
                          <IonCardTitle>Menú semanal N°{{ index + 1 }}</IonCardTitle>
                        </IonCardHeader>
                        <IonButton @click="ViewMenuDetails(monthmenu, index+1, 'mensual')">Ver Más</IonButton>
                        <IonButton @click="DeleteMenu(monthmenu, 'mes')">Borrar</IonButton>
                    </IonCard>
                </IonList>
                <IonItem v-else>
                    No hay menús mensuales para mostrar
                </IonItem>
            </IonItemGroup>
        </IonContent>
    </IonPage>
</template>