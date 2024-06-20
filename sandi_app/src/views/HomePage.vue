<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button href="/chat">
      <ion-icon class="text-white" :icon="chatboxEllipsesOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { chatboxEllipsesOutline, triangle } from 'ionicons/icons';
</script>
