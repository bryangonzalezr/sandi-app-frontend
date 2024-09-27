<script setup>
// Importar Componentes IONIC
import { 
  IonPage,
  IonContent, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonIcon,
} from "@ionic/vue";
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
import { person, lockClosed } from "ionicons/icons";
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo 
import { ref } from 'vue';
// Importar Stores
import { useAuthStore } from "@/stores";

// Definir contantes relacionadas al Vue-Router
// Deifinir constantes relacionadas a los Stores
const authStore = useAuthStore();

// Definir variables referenciales o reactivas
const credentials = ref({
  email: '',
  password: ''
});

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
/* Realiza login con las credenciales ingresadas en los inputs */
const login = async () => {
    if(credentials.value.email != '' && credentials.value.password != ''){
        await authStore.Login(credentials.value)
        credentials.value = {
          email: '',
          password: ''
        }

  }
}
</script>


<template>
  <IonPage>
    <IonContent>
      <div class="grid justify-center content-center items-center h-screen w-screen">
        <IonItem>
          <IonInput v-model="credentials.email" type="text" placeholder="Ingrese su correo">
            <IonIcon slot="start" :icon="person" />
          </IonInput>
        </IonItem>
        <IonItem >
          <IonInput v-model="credentials.password" type="password" placeholder="Ingrese su contraseña">
            <IonIcon slot="start" :icon="lockClosed" />
          </IonInput>
        </IonItem>
        <IonButton size="small" @click="Login()">Iniciar Sesión</IonButton>
        <IonButton size="small" href="/registro">Registro</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

