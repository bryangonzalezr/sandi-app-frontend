<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, chatboxEllipsesOutline, person, calendarClearOutline, bookOutline} from 'ionicons/icons';
</script>

<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home">
                <ion-icon aria-hidden="true" :icon="home" />
                <ion-label>Inicio</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="recipe" href="/recipe">
                <ion-icon aria-hidden="true" :icon="bookOutline" />
                <ion-label>Recetas</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="menu" href="/menu">
                <ion-icon aria-hidden="true" :icon="calendarClearOutline" />
                <ion-label>Menú</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="chat" href="/chat">
                <ion-icon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <ion-label>Chat</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="voice" href="/voice">
                <ion-icon aria-hidden="true" :icon="chatboxEllipsesOutline" />
                <ion-label>Voice</ion-label>
              </ion-tab-button>
              <ion-tab-button tab="profile" href="/profile">
                <ion-icon aria-hidden="true" :icon="person" />
                <ion-label>Perfil</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>