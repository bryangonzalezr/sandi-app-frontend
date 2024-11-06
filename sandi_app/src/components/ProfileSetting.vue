<script setup>
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonItem
} from '@ionic/vue';
import { chevronBack, logOut } from 'ionicons/icons';

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
                    Configuración
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonButton>
                    <IonIcon></IonIcon>
                    Cambiar Contraseña
                </IonButton>
            </IonItem>
            <IonItem>
                <button class="flex items-center gap-x-1">
                    <IonIcon :icon="logOut"></IonIcon>
                    Cerrar Sesión
                </button>
            </IonItem>
        </IonContent>
    </IonPage>
</template>
