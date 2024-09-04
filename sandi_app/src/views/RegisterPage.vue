<script setup>
import { IonContent, IonPage, IonGrid, IonItem, IonInput, IonTitle, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { useRegisterStore } from '@/stores';
import { storeToRefs } from "pinia";
import { ref } from 'vue';

const isloading = ref('false');

const registerUser = async () => {
  const res = await registerStore.RegisterUser();
};

const registerStore = useRegisterStore();

const { register } = storeToRefs(registerStore);

</script>

<template>
  <IonPage>
    <IonContent>
      <IonGrid class="grid justify-center content-center items-center h-screen w-screen">
        <IonTitle class="pb-5 text-center">Registrar un nuevo usuario</IonTitle>
        <IonItem>
          <IonInput v-model="register.name" label="Nombre" label-placement="stacked" type="text" placeholder="Ingrese su nombre"></IonInput>
          <IonInput v-model="register.last_name" label="Apellido" label-placement="stacked" type="text" placeholder="Ingrese su apellido"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput v-model="register.email" label="Correo" label-placement="stacked" type="text" placeholder="Ingrese su correo"></IonInput>
          <IonInput v-model="register.phone_number" label="Número de telefono" label-placement="stacked" type="number" placeholder="Ingrese su número"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput v-model="register.password" label="Contraseña" label-placement="stacked" type="text" placeholder="Ingrese su contraseña"></IonInput>
          <IonInput v-model="register.password_confirmation" label="Confirmar contraseña" label-placement="stacked" type="text" placeholder="Confirme su contraseña"></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect v-model="register.sex" label="Sexo" label-placement="stacked" placeholder="Selecciona tu sexo">
            <IonSelectOption value="Masculino">Masculino</IonSelectOption>
            <IonSelectOption value="Femenino">Femenino</IonSelectOption>
          </IonSelect>
          <IonSelect v-model="register.civil_status" label="Estado civil" label-placement="stacked" placeholder="Selecciona tu estado">
            <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
            <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
            <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
            <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
            <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonInput v-model="register.birthdate" label="Fecha de nacimiento" label-placement="stacked" type="date"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput v-model="register.objectives" label="Objetivos" label-placement="stacked"  placeholder="Ingresa tus objetivos"></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect v-model="register.role" label="Rol" label-placement="stacked" placeholder="Ingresa rol">
            <IonSelectOption value="nutricionista">Nutricionista</IonSelectOption>
            <IonSelectOption value="usuario_basico">Usuario</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton @click="registerUser()" class="px-20 pt-5">Registrar</IonButton>
      </IonGrid>
      </IonContent>
  </IonPage>
</template>
