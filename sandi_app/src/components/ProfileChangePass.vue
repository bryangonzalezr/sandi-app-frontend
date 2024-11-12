<script setup>
import { 
    IonButtons,
    IonButton,
    IonHeader,
    IonPage, 
    IonToolbar,
    IonIcon,
    IonContent,
    IonTitle,
    IonInput,
    onIonViewWillEnter,
    IonInputPasswordToggle
} from '@ionic/vue';
import { chevronBack, alertCircle } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import Swal from "sweetalert2"

const router = useRouter();

const authStore = useAuthStore();

const user = ref({})
const form = ref({})
const errorForm = ref({})
const errormessage = ref('')

const goBack = () => {
  router.push({ name: "ProfileSetting" });
}

const setValue = (value) => {
    form.value[value] = event.target.value;
    delete errorForm.value[value];
    delete errormessage.value
}

const ChangePass = async () => {
    await authStore.ChangePassword(form.value).then(() => {
      form.value = {}
    }).catch((error) => {
        console.log('error vista', error)
        if(error.response.data.errors){
            errorForm.value = error.response.data.errors
        }else{
            Swal.fire({
              title: error.response.data.message == 'Invalid Credentials' ? 'Credenciales invalidas' : 'Error',
              text: error.response.data.message == 'Invalid Credentials' ? 'Intenta nuevamente' : error.response.data.message,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
              heightAuto: false,
            })
        }
    })
}

onIonViewWillEnter(() => {
    user.value = authStore.userInfo
})

</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start" v-if="!user.password_reset">
                  <IonButton @click="goBack">
                      <IonIcon aria-hidden="true" :icon="chevronBack" slot="icon-only"></IonIcon>
                  </IonButton>
                </IonButtons>
                <IonTitle>Cambiar Contraseña</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <div class="flex flex-col items-center justify-center">
                <div class="grid grid-flow-row-dense gap-y-2 bg-dark-red p-4 m-4 rounded-lg">
                    <IonTitle class="text-white text-center">Crear nueva contraseña</IonTitle>
                    <div class="text-white text-justify text-sm">Su nueva contraseña debe ser diferente de la contraseña utilizada anteriormente.</div>
                    <p v-if="errormessage != ''" class="text-xs text-white flex gap-1 items-center">
                      <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                      {{ errormessage }}
                    </p>
                    <div class="flex flex-col">
                        <IonInput
                            class="border-b border-b-white text-white"
                            v-model="form.password" 
                            label="Contraseña Actual" 
                            label-placement="stacked" 
                            type="password" 
                            placeholder="contraseña actual"
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
                            v-model="form.new_password"
                            label="Contraseña Nueva" 
                            label-placement="stacked" 
                            type="password" 
                            placeholder="contraseña nueva"
                            @update:modelValue="setValue('new_password')"
                        ><IonInputPasswordToggle slot="end"></IonInputPasswordToggle></IonInput>
                        <p v-if="errorForm.new_password" class="text-xs text-white flex gap-1 items-center">
                          <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                          {{ errorForm.new_password[0] }}
                        </p>
                    </div>
                    <div class="flex flex-col">
                        <IonInput
                            class="border-b border-b-white text-white"
                            v-model="form.new_password_confirmation"  
                            label="Confirmar Contraseña Nueva" 
                            label-placement="stacked" 
                            type="password" 
                            placeholder="contraseña nueva"
                            @update:modelValue="setValue('new_password_confirmation')"
                        ><IonInputPasswordToggle slot="end"></IonInputPasswordToggle></IonInput>
                        <p v-if="errorForm.new_password_confirmation" class="text-xs text-dark-red flex gap-1 items-center">
                          <IonIcon slot="icon-only" :icon="alertCircle"></IonIcon>
                          {{ errorForm.new_password_confirmation[0] }}
                        </p>
                    </div>
                </div>
                <IonButton @click="ChangePass()">Confirmar</IonButton>
            </div>
        </IonContent>
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
</style>