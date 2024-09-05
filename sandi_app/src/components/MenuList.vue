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
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <IonButton @click="goToMenu()">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                    </IonButton>
                </ion-buttons>
                <ion-title>Menus guardados</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item-group>
                <ion-item-divider>
                  <ion-label> Menus diarios </ion-label>
                </ion-item-divider>
                <ion-list v-if="daymenus.length > 0">
                    <ion-card v-for="(daymenu,index) in daymenus" :key="index">
                        <ion-card-header>
                          <ion-card-title>Menú diario N°{{ index + 1 }}</ion-card-title>
                        </ion-card-header>
                        <ion-button @click="ViewMenuDetails(daymenu, index+1, 'diario')">Ver Más</ion-button>
                        <ion-button @click="DeleteMenu(daymenu.id, 'día')">Borrar</ion-button>
                    </ion-card>
                </ion-list>
                <ion-item v-else>
                    No hay menús diarios para mostrar
                </ion-item>
            </ion-item-group>
            <ion-item-group>
                <ion-item-divider>
                  <ion-label> Menus Semanales </ion-label>
                </ion-item-divider>
                <ion-list v-if="weekmenus.length > 0">
                    <ion-card v-for="(weekmenu,index) in weekmenus" :key="index">
                        <ion-card-header>
                          <ion-card-title>Menú semanal N°{{ index + 1 }}</ion-card-title>
                        </ion-card-header>
                        <ion-button @click="ViewMenuDetails(weekmenu, index+1, 'semanal')">Ver Más</ion-button>
                        <ion-button @click="DeleteMenu(weekmenu.id, 'semana')">Borrar</ion-button>
                    </ion-card>
                </ion-list>
                <ion-item v-else>
                    No hay menús semanales para mostrar
                </ion-item>
            </ion-item-group>
            <ion-item-group>
                <ion-item-divider>
                  <ion-label> Menus Mensuales </ion-label>
                </ion-item-divider>
                <ion-list v-if="monthmenus.length > 0">
                    <ion-card v-for="(monthmenu,index) in monthmenus" :key="index">
                        <ion-card-header>
                          <ion-card-title>Menú semanal N°{{ index + 1 }}</ion-card-title>
                        </ion-card-header>
                        <ion-button @click="ViewMenuDetails(monthmenu, index+1, 'mensual')">Ver Más</ion-button>
                        <ion-button @click="DeleteMenu(monthmenu, 'mes')">Borrar</ion-button>
                    </ion-card>
                </ion-list>
                <ion-item v-else>
                    No hay menús mensuales para mostrar
                </ion-item>
            </ion-item-group>
        </ion-content>
    </ion-page>
</template>