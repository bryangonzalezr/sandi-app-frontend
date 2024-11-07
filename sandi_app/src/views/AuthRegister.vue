<script setup>
// Importar Componentes IONIC
import { 
  IonPage, 
  IonInput, 
  IonTitle, 
  IonSelect, 
  IonSelectOption, 
  IonButton,
  IonSpinner,
  IonModal,
  IonDatetime,
  IonButtons,
  IonIcon,
  IonInputPasswordToggle
} from '@ionic/vue';
import { calendar, alertCircle } from 'ionicons/icons';
// Importar componentes de otros paquetes y elementos de diseño (Archivos CSS, Iconos, etc.) en el orden respectivo
// Importar desde Vue, Vue-Router, Pinia en el orden respectivo
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
// Importar Stores
import { useAuthStore } from '@/stores';

// Definir contantes relacionadas al Vue-Router
const router = useRouter();

// Deifinir constantes relacionadas a los Stores
const authStore = useAuthStore();
const { register } = storeToRefs(authStore);

// Definir variables referenciales o reactivas
const isloading = ref(false);
const errorForm = ref({})
const modal = ref();
const IconDate = ref();

// Definir funciones de redireccionamiento, normales, asincronicas y eventos en ese orden

/* Redirecciona a AuthLogin.vue */
const goToLogin = () => {
  router.push({ name: 'Login'})
}

const openDatePicker = () => {
  modal.value.$el.present();
}

const Confirm = () => {
    IconDate.value.$el.confirm()
    modal.value.$el.dismiss()
    const [year,month, day] = (IconDate.value.$el.value).split("T")[0].split("-");
    delete errorForm.value.birthdate
    register.value.birthdate = `${day}-${month}-${year}`
}

const setValue = (value) => {
    register.value[value] = event.target.value;
    delete errorForm.value[value];
}

/* Realiza el registro con las credenciales ingresadas en los inputs */
const Register = async () => {
  isloading.value = true;
  await authStore.Register().then(() => {
    isloading.value = false;
  }).catch((error) => {
    isloading.value = false;
    errorForm.value = error.response.data.errors
  })
};

</script>

<template>
  <IonPage>
    <div class="flex flex-col p-5 h-full w-full justify-center items-center overflow-auto">
      <template v-if="!isloading">
        <div class="grid grid-col gap-y-2 self-center bg-dark-red rounded-lg p-4">
          <IonTitle class="text-center text-white">Crear Cuenta</IonTitle>
          <h1 class="text-xs text-center text-white">¡Create una cuenta para empezar a mejorar tus hábitos alimenticios!</h1>
          <div class="grid grid-col grid-cols-2 gap-2"> 
            <div class="flex flex-col">
              <IonInput 
                class="border-b border-b-white text-white"
                v-model="register.name" 
                label="Nombre" 
                label-placement="stacked" 
                type="text" 
                placeholder="Nombre"
                @update:modelValue="setValue('name')"
              ></IonInput>
              <p v-if="errorForm.name" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.name[0] }}
              </p>
            </div>
            <div class="flex flex-col">
              <IonInput 
                class="border-b border-b-white text-white"
                v-model="register.last_name" 
                label="Apellido" 
                label-placement="stacked" 
                type="text" 
                placeholder="Apellido"
                @update:modelValue="setValue('last_name')"
              ></IonInput>
              <p v-if="errorForm.last_name" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.last_name[0] }}
              </p>
            </div>
          </div>
          <div class="grid grid-col grid-cols-2 gap-2">
            <div class="flex flex-col">
              <IonSelect 
                class="border-b border-b-white text-white"
                v-model="register.sex" 
                label="Sexo" 
                label-placement="stacked" 
                placeholder="Sexo"
                @update:modelValue="setValue('sex')"
              >
                <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                <IonSelectOption value="Femenino">Femenino</IonSelectOption>
              </IonSelect>
              <p v-if="errorForm.sex" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.sex[0] }}
              </p>
            </div>
            <div class="flex flex-col">
                <IonSelect 
                class="border-b border-b-white text-white"
                v-model="register.civil_status" 
                label="Estado civil" 
                label-placement="stacked" 
                placeholder="Estado civil"
                @update:modelValue="setValue('civil_status')"
              >
                <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
                <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
                <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
                <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
                <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
              </IonSelect>
              <p v-if="errorForm.civil_status" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.civil_status[0] }}
              </p>
            </div>
          </div>
          <div class="grid grid-col grid-cols-2 gap-2">
            <div class="flex flex-col">
              <IonInput 
                class="border-b border-b-white text-white"
                v-model="register.email" 
                label="Correo" 
                label-placement="stacked" 
                type="text" 
                placeholder="Correo"
                @update:modelValue="setValue('email')"
              ></IonInput>
              <p v-if="errorForm.email" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.email[0] }}
              </p>
            </div>
            <div class="flex flex-col">
              <IonInput 
                class="border-b border-b-white text-white"
                v-model="register.phone_number" 
                label="Número de telefono" 
                label-placement="stacked" 
                type="text" 
                placeholder="Número"
                @update:modelValue="setValue('phone_number')"
              ></IonInput>
              <p v-if="errorForm.phone_number" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.phone_number[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col">
            <div>
              <div class="date-picker-container border-b border-b-white focus:border-b focus:border-b-light">
                <IonInput 
                  class="date-input text-white"
                  v-model="register.birthdate" 
                  label="Fecha de nacimiento" 
                  label-placement="stacked" 
                  placeholder="dd-mm-aaaa" 
                  :readonly="true" 
                  @click="openDatePicker" 
                ></IonInput>
                <IonButton fill="clear" size="small" @click="openDatePicker" class="date-picker-button">
                <IonIcon :icon="calendar" slot="icon-only"></IonIcon>
                </IonButton>
              </div>
              <IonModal :keep-contents-mounted="true" ref="modal" class="datetime-modal">
                <IonDatetime presentation="date" id="date" ref="IconDate">
                <IonButtons slot="buttons">
                  <IonButton color="primary" @click="Confirm()">Listo</IonButton>
                </IonButtons>
                </IonDatetime>
              </IonModal>
            </div>
            <p v-if="errorForm.birthdate" class="text-xs text-white flex gap-1 items-center">
                <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                {{ errorForm.birthdate[0] }}
              </p>
          </div>
          <div class="flex flex-col"> 
            <IonInput 
              class="border-b border-b-white text-white"
              v-model="register.password" 
              label="Contraseña" 
              label-placement="stacked" 
              type="password" 
              placeholder="Contraseña"
              @update:modelValue="setValue('password')"
            ><IonInputPasswordToggle slot="end"></IonInputPasswordToggle></IonInput>
            <p v-if="errorForm.password" class="text-xs text-white flex gap-1 items-center">
              <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
              {{ errorForm.password[0] }}
            </p>
          </div>
          <div class="flex flex-col">
            <IonInput 
              class="border-b border-b-white text-white"
              v-model="register.password_confirmation" 
              label="Confirmar contraseña" 
              label-placement="stacked" 
              type="password"  
              placeholder="Confirmar contraseña"
              @update:modelValue="setValue('password_confirmation')"
            ><IonInputPasswordToggle slot="end"></IonInputPasswordToggle></IonInput>
            <p v-if="errorForm.password_confirmation" class="text-xs text-white flex gap-1 items-center">
              <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
              {{ errorForm.password_confirmation[0] }}
            </p>
          </div>
          <div class="flex flex-col">
            <IonInput 
              class="border-b border-b-white text-white"
              v-model="register.objectives" 
              label="Objetivos" 
              label-placement="stacked"  
              placeholder="Ingresa tus objetivos"
              @update:modelValue="setValue('objectives')"
            ></IonInput>
            <p v-if="errorForm.objectives" class="text-xs text-white flex gap-1 items-center">
              <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
              {{ errorForm.objectives[0] }}
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <IonButton @click="Register()">Registrar</IonButton>
          <h1 class="my-3 text-sm text-center ">¿Ya tienes una cuenta? <a class="text-sm text-dark-red" @click="goToLogin">Ingresa aquí</a></h1>
        </div>
      </template>
      <template v-else>
        <IonSpinner color="success"></IonSpinner>
      </template>
    </div>
  </IonPage>
</template>

<style scoped>
  ion-button{
    --background: var(--dark-red);
  }

  ion-input{
    --highlight-color-focused: var(--light);
    --ion-color-primary: var(--white);
  }

  ion-select{
    --highlight-color-focused: var(--light);
  }

  ion-select::part(icon){
    color: var(--white);
  }

  ion-input::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  .date-picker-container {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
  }
  .date-input {
    flex-grow: 1;
  }

  .date-picker-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --color: var(--dark-red);
  --background: var(--white);
}

.datetime-modal {
  --height: auto;
  --width: 90%;
  --max-width: 400px;
  --border-radius: 16px;
  --background: var(--white);
}
</style>

