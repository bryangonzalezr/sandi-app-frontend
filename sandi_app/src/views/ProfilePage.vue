<script setup>
// Keep all existing imports
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonImg,
  IonButton, 
  IonItem, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonGrid, 
  IonLabel, 
  IonCard, 
  IonCardHeader, 
  IonIcon, 
  onIonViewWillEnter,
  IonTextarea,
  IonCheckbox,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButtons
} from '@ionic/vue';
import Swal from "sweetalert2";
import { pencil, eye, settings, chevronDown, chevronUp, logOut} from 'ionicons/icons';
import { ref, watchEffect } from 'vue';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProfileStore , useAuthStore } from "@/stores";
import { calendar } from 'ionicons/icons';
import LogoMonocromatic from '@/theme/images/Logo_sandi_m.svg'
//import datepicker


// Keep all existing constants and store references
const router = useRouter();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { user, rolUser } = storeToRefs(authStore);
const { healthTypes } = storeToRefs(profileStore);  
const modal = ref();
const IconDate = ref();
const pauta = ref({});




// Add new ref for accordion state
const isExpanded = ref(false);
const editProfile = ref(false);
const checkProgress = ref(true);
const allergiesNames = ref([]);
const newProfile = ref({
  name: '',
  last_name: '',
  sex: '',
  birthdate: '',
  age: '',
  phone_number: '',
  civil_status: '',
  objectives: '',
  physical_comentario: '',
  physical_status: '',
  habits: {
    alcohol: '',
    tabaco: ''
  },
  allergies: [],
  nutritional_anamnesis: {
    plan_anterior: '',
    agua: ''
  }
});

const Confirm = () => {
    IconDate.value.$el.confirm()
    modal.value.$el.dismiss()
    newProfile.value.birthdate = IconDate.value.$el.value
}

// Keep all existing functions
const goToProgress = () => {
  router.push({ name: 'ProgressDetail', params: { id: user.value.nutritional_profile.patient_id } });
}

const getPlan = async () => {
  if(rol.value == 'paciente'){
    await profileStore.ShowPauta(authStore.userInfo.id);
    pauta.value = profileStore.GetPauta;
  }
}

const goToPauta = () => {
  router.push({ name: "PautaDetail", params: {id: authStore.userInfo.id}});
}

const Logout = () => {
  authStore.Logout();
}

const editProfileToggle = () => {
  editProfile.value = !editProfile.value;
  getDataProfile();
};

const verifyProgress = async () => {
  await profileStore.ShowProgress(user.value.id);
  if (profileStore.GetProgress.data.length > 0) {
    checkProgress.value = true;
  }
}

const updateProfile = async () => {
  try {
    await profileStore.UpdateUserProfile(user.value.id);
    editProfileToggle();
    Swal.fire({
      title: "Exito",
      text: "Se han guardado los cambios",
      icon: "success",
      confirmButtonText: "Aceptar",
      heightAuto: false,
    });
  } catch (error) {
    console.error(error);
  }
}

const getDataProfile = async () => {
  if (user.value.id !== undefined) {
    await profileStore.ShowUserProfile(user.value.id);
  }
  newProfile.value = profileStore.GetProfile;
  await profileStore.HealthTypes();
}

// Watch for changes in healthTypes and newProfile.allergies
watchEffect(() => {
  if (healthTypes.value) {
    allergiesNames.value = newProfile.value.allergies.map(allergyId => {
      const type = healthTypes.value.find(type => type.value === allergyId);
      return type ? type.name : 'Desconocido';
    });
  }
});

onIonViewWillEnter(() => {
  getDataProfile();
  if (rolUser.value === 'paciente') {
    verifyProgress();
  }
});

const toggleAllergy = (value) => {
  const index = newProfile.value.allergies.indexOf(value);
  if (index === -1) {
    newProfile.value.allergies.push(value);
  } else {
    newProfile.value.allergies.splice(index, 1);
  }
}
const openDatePicker = () => {
  modal.value.$el.present();
}

</script>



<template>
  <IonPage>
    <IonHeader :translucent="true">
      <div class="header">
        <IonImg
          :src="LogoMonocromatic"
          alt="Logo sandi"
          class="logo-sandi"
        ></IonImg>
        
      <IonButton class="button-icon" @click="Logout">
        <IonIcon :icon="logOut"></IonIcon>
        Cerrar sesión
      </IonButton>
      </div>
    </IonHeader>

    <IonContent class="ion-padding">
      <div class="profile-container">
        <!-- Left Column - Avatar and Edit Button -->
        <div class="profile-left-column">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              <img src='../assets/SandiPfp.png' alt="Sandi" class="avatar-image" />
            </div>
          </div>
          
          <button 
            class="edit-profile-btn"
            @click="editProfileToggle()"
            v-if="!editProfile"
          >
            <IonIcon :icon="pencil"></IonIcon>
            Editar perfil
          </button>
          <button 
            class="progreso-btn"
            @click="goToProgress()"
            v-if="checkProgress"
          >
            <IonIcon :icon="eye"></IonIcon>
            Ver progreso
          </button>
          <button
            class="progreso-btn"
            @click="goToPauta()"
            v-if="pauta != null && rol == 'paciente'"

          >
            <IonIcon :icon="eye"></IonIcon>

            Ver plan
          </button>
          
        </div>

        <!-- Right Column - Profile Information -->
        <div class="profile-right-column">
          <IonCard class="profile-card">
            <IonCardHeader>
              <template v-if="editProfile">
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput v-model="newProfile.name"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput v-model="newProfile.last_name"></IonInput>
                </IonItem>
              </template>
              <template v-else>
                <h2 class="profile-name">{{ newProfile.name }} {{ newProfile.last_name }}</h2>
              </template>
              <div class="profile-tags">
                <template v-if="editProfile">
                  <IonItem lines="none" class="profile-item">
                    <IonLabel position="stacked" class="label-spacing">Restricciones Alimentarias</IonLabel>
                    <div class="tag-container">
                      <span 
                      v-for="type in healthTypes" 
                      :key="type.value" 
                      @click="toggleAllergy(type.value)"
                      :class="{'tag-selected': newProfile.allergies.includes(type.value), 'tag-unselected': !newProfile.allergies.includes(type.value)}"
                      class="profile-tag"
                      >
                      {{ type.name }}
                      </span>
                    </div>
                  </IonItem>
                </template>
                <template v-else>
                  <span 
                    v-for="(name, index) in allergiesNames" 
                    :key="index"
                    class="profile-tag"
                  >
                    {{ name || 'Cargando...' }}
                  </span>
                </template>
              </div>
            </IonCardHeader>
            

            <!-- Essential Information -->
            <IonGrid class="essential-info">
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput v-model="newProfile.phone_number" :readonly="!editProfile"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Edad</IonLabel>
                <IonInput v-model="newProfile.age" :readonly="!editProfile"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Objetivos</IonLabel>
                <IonTextarea
                  v-model="newProfile.objectives" 
                  :readonly="!editProfile"
                  autoGrow="true"
                ></IonTextarea>
              </IonItem>

              <!-- Accordion Toggle -->
              <div class="accordion-toggle" @click="isExpanded = !isExpanded">
                <span>{{ isExpanded ? 'Ver menos' : 'Ver más' }}</span>
                <IonIcon :icon="isExpanded ? chevronUp : chevronDown"></IonIcon>
              </div>

              <!-- Additional Information (Accordion Content) -->
              <div v-if="isExpanded" class="additional-info">
                <IonItem>
                  <IonLabel position="stacked">Sexo</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.sex" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <IonSelect v-model="newProfile.sex" :readonly="!editProfile">
                      <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                      <IonSelectOption value="Femenino">Femenino</IonSelectOption>
                    </IonSelect>
                  </template>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.birthdate" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <div class="date-picker-container">
                      <IonInput v-model="newProfile.birthdate" class="date-input" @click="openDatePicker" :readonly="true"></IonInput>
                      <IonButton fill="clear" size="small" @click="openDatePicker" class="date-picker-button">
                      <IonIcon :icon="calendar" slot="icon-only"></IonIcon>
                      </IonButton>
                    </div>
                    <IonModal :keep-contents-mounted="true" ref="modal" class="datetime-modal">
                      <IonDatetime presentation="date" id="date" ref="IconDate" v-model="datetime">
                      <IonButtons slot="buttons">
                        <IonButton color="primary" @click="Confirm()">Listo</IonButton>
                      </IonButtons>
                      </IonDatetime>
                    </IonModal>
                  </template>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado Civil</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.civil_status" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <IonSelect v-model="newProfile.civil_status" label-placement="stacked">
                      <IonSelectOption value="Soltero(a)">Soltero(a)</IonSelectOption>
                      <IonSelectOption value="Divorciad(a)">Divorciad(a)</IonSelectOption>
                      <IonSelectOption value="Viudo(a)">Viudo(a)</IonSelectOption>
                      <IonSelectOption value="Casado(a)">Casado(a)</IonSelectOption>
                      <IonSelectOption value="Conviviente civil">Conviviente civil</IonSelectOption>
                    </IonSelect>
                  </template>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Estado Físico</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.physical_status" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <IonSelect v-model="newProfile.physical_status"  label-placement="stacked">
                      <IonSelectOption value="Leve">Leve</IonSelectOption>
                      <IonSelectOption value="Moderada">Moderada</IonSelectOption>
                      <IonSelectOption value="Pesada">Pesada</IonSelectOption>
                    </IonSelect>
                  </template>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Comentario Físico</IonLabel>
                  <IonTextarea
                   v-model="newProfile.physical_comentario" 
                   :readonly="!editProfile"
                    autoGrow="true"
                   >
                  </IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Consumo de Alcohol</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.habits.alcohol" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <IonSelect v-model="newProfile.habits.alcohol" label-placement="stacked" placeholder="Frecuencia">
                      <IonSelectOption value="Nada">Nada</IonSelectOption>
                      <IonSelectOption value="Poco">Poco</IonSelectOption>
                      <IonSelectOption value="Moderado">Moderado</IonSelectOption>
                      <IonSelectOption value="Alto">Alto</IonSelectOption>
                    </IonSelect>
                  </template>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Consumo de Tabaco</IonLabel>
                  <template v-if="!editProfile">
                    <IonInput v-model="newProfile.habits.tabaco" :readonly="!editProfile"></IonInput>
                  </template>
                  <template v-else>
                    <IonSelect v-model="newProfile.habits.tabaco" label-placement="stacked" placeholder="Frecuencia">
                      <IonSelectOption value="Nada">Nada</IonSelectOption>
                      <IonSelectOption value="Poco">Poco</IonSelectOption>
                      <IonSelectOption value="Moderado">Moderado</IonSelectOption>
                      <IonSelectOption value="Alto">Alto</IonSelectOption>
                    </IonSelect>
                  </template>
                </IonItem>
                <IonItem>
                  <div style="margin-bottom: 1.5rem;">
                    <IonLabel position="stacked">Experiencia en Planes Anteriores</IonLabel>
                    <IonCheckbox
                      v-model="newProfile.nutritional_anamnesis.plan_anterior"
                      :disabled="!editProfile"
                    ></IonCheckbox>
                  </div>
                </IonItem>
                <IonItem>
                  <div style="margin-bottom: 1.5rem;">

                    <IonLabel position="stacked">Consumo de Agua Regular</IonLabel>
                    <IonCheckbox
                      v-model="newProfile.nutritional_anamnesis.agua"
                      :disabled="!editProfile"
                    ></IonCheckbox>
                  </div>

                </IonItem>
              </div>
            </IonGrid>
          </IonCard>

          <!-- Allergies Tags -->
          
        </div>

        <!-- Edit Mode Controls -->
        <div v-if="editProfile" class="edit-controls">
          <IonButton class="guardar-button" @click="updateProfile()">Guardar Cambios</IonButton>
          <IonButton class="cancelar-button" @click="editProfileToggle()">Cancelar</IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.header {
  padding: 0.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-sandi {
  width: 20%;
}
.label-spacing {
  margin-bottom: 1rem;
}

.progreso-btn{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--light-violet);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--dark-violet);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}
.plan-btn{
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--light-violet);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--dark-violet);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.button-icon {
  --background: var(--dark-red);
  --color: var(--white);
  --box-shadow: none;
  --border-radius: 0.5rem;

  /* Padding settings */
  --padding-start: 1rem; /* Left padding */
  --padding-end: 1rem;   /* Right padding */
  --padding-top: 0.5rem; /* Top padding */
  --padding-bottom: 0.5rem; /* Bottom padding */
  
  /* Optional gap for spacing elements inside */
  --gap: 3rem;
}

.button-icon ion-icon {
  margin-right: 0.5rem; /* Adds specific spacing for the icon */
}
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
}

.profile-left-column {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 160px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin-bottom: 0.5rem;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color:  var(--neutral-beige);
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--light-green);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--dark-green);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.edit-profile-btn:hover {
  background-color: var(--white);
  transform: translateY(-1px);
}

.profile-right-column {
  flex-grow: 1;
}

.profile-card {
  background:  var(--white);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 1rem;
}

.essential-info {
  padding: 1rem;
}

.accordion-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  color: var(--dark-green);
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.accordion-toggle:hover {
  background-color: #f5f5f5;
}

.additional-info {
  margin-top: 1rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.profile-tag {
  background-color: var(--light-green);
  color: var(--dark-green);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  transition: transform 0.2s;
  text-align: center;
}

.profile-tag:hover {
  transform: translateY(-1px);
}

.edit-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--white);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  z-index: 100;
}

.tag-selected {
  background-color: var(--dark-green); /* Green for selected */
  color:var(--white);
}

.tag-unselected {
  background-color: var(--white); /* White for unselected */
  color:  var(--dark-green); /* Green text for unselected */
  border: 1px solid #4CAF50;
}

.profile-item {
  --ion-item-background: transparent;
  gap: 0.5rem;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.guardar-button{
  --background: var(--dark-green);
  --color: var(--white);
  --border-radius: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
}
.cancelar-button{
  --background: var(--dark-red);
  --color: var(--white);
  --border-radius: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .profile-left-column {
    width: 100%;
    max-width: 200px;
  }

  .profile-right-column {
    width: 100%;
  }

  .profile-tags {
    justify-content: center;
  }
  
}



ion-checkbox {
  --checkmark-color: var(--white); /* Dark green checkmark */
  --background-checked: var(--dark-green);
  --border-color: var(--dark-green); /* Light green border */
  --border-color-checked: var(--dark-green);
  --checkbox-background-checked: var(--dark-green);

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
  --color: var(--dark-green);
}

.datetime-modal {
  --height: auto;
  --width: 90%;
  --max-width: 400px;
  --border-radius: 16px;
  --background: var(--white);
}

ion-datetime {
  margin: auto;
  --background: var(--white);
  --ion-color-primary: var(--dark-green);
  --ion-color-primary-contrast: var(--white);
  --ion-color-medium: var(--light-green);
  --ion-color-medium-contrast: var(--dark-green);
}

ion-datetime::part(calendar-day-active) {
  background: var(--light-green);
  color: var(--dark-green);
}

ion-datetime::part(calendar-day-today) {
  border: 1px solid var(--dark-green);
}

ion-modal ion-toolbar {
  --background: var(--dark-green);
  --color: var(--white);
}

ion-modal ion-title {
  color: var(--white);
}

ion-modal ion-button {
  --color: var(--white);
}

</style>