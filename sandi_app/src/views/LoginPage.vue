<script setup>
import { 
  IonPage,
  IonContent, 
  IonInput, 
  IonButton, 
  IonItem, 
  IonIcon,
  IonAlert, 
} from "@ionic/vue";
import { person, lockClosed } from "ionicons/icons";
import { ref } from 'vue';
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

const credentials = ref({
  email: '',
  password: ''
});
const isOpenAlert = ref(false)

const data = ref()
const error = ref('')

const alertButtons = [
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      isOpenAlert.value = false;
    },
  },
];

const login = async () => {
    if(credentials.value.email != '' && credentials.value.password != ''){
        data.value = await authStore.login(credentials.value)
        credentials.value = {
          email: '',
          password: ''
        }
        error.value = `${data.value}`;
        isOpenAlert.value = true;

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
        {{ error.value }}
        <IonAlert
          :is-open="isOpenAlert"
          header="ERROR"
          :message="error"
          :buttons="alertButtons"
        ></IonAlert>
        <IonButton size="small" @click="login()">Iniciar Sesión</IonButton>
        <IonButton size="small" href="/registro">Registro</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

