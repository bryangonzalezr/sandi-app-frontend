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
import { chevronBack, logOut, lockClosed } from 'ionicons/icons';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

const router = useRouter();

const authStore = useAuthStore();

const goBack = () => {
    router.push({ name: "Profile" });
}

const goToChangePass = () => {
    router.push({ name: "ProfileChangePass" });
}

const Logout = () => {
  authStore.Logout();
}

</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                  <IonButton @click="goBack">
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
                <button class="flex items-center gap-x-1" @click="goToChangePass">
                    <IonIcon :icon="lockClosed"></IonIcon>
                    Cambiar Contraseña
                </button>
            </IonItem>
            <IonItem>
                <button class="flex items-center gap-x-1 text-dark-red" @click="Logout">
                    <IonIcon :icon="logOut"></IonIcon>
                    Cerrar Sesión
                </button>
            </IonItem>
        </IonContent>
    </IonPage>
</template>
