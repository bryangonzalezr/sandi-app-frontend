<script setup>
// Importar Componentes IONIC
import { 
  IonPage,
  IonContent, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonIcon,
  IonInputPasswordToggle,
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
const errorCredentials = ref({});
const inputRef = ref(null);

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden
const SetValue = (value) => {
  credentials.value[value] = event.target.value;
  delete errorCredentials.value[value];
}

/* Realiza login con las credenciales ingresadas en los inputs */
const Login = async () => {
  try{
    await authStore.Login(credentials.value)
    credentials.value = {
      email: '',
      password: ''
    }
  }catch(error){
    errorCredentials.value = error.response.data.errors;
  }
}
</script>


<template>
  <IonPage>
    <IonContent>
      <div class="grid justify-center content-center items-center h-screen w-screen">
        <IonItem>
          <IonInput 
            ref="inputRef"
            v-model="credentials.email" 
            type="text" 
            placeholder="Ingrese su correo"
            @ionInput="SetValue('email')"
          >
            <IonIcon slot="start" :icon="person" />
          </IonInput>
        </IonItem>
        <IonItem >
          <IonInput 
            ref="inputRef"
            v-model="credentials.password" 
            type="password" 
            placeholder="Ingrese su contraseña"
            @ionInput="SetValue('password')"
          >
            <IonIcon slot="start" :icon="lockClosed" />
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </IonItem>
        <IonButton size="small" @click="Login()">Iniciar Sesión</IonButton>
        <IonButton size="small" href="/registro">Registro</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

