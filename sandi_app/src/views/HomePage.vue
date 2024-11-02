<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonContent, 
  onIonViewWillEnter, 
  IonItem, 
  IonItemDivider,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon,
  IonItemGroup,
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useConvertersStore, useAuthStore, useContactCardsStore, useProfileStore } from "@/stores";
import { logOut } from "ionicons/icons";
import { Swiper, SwiperSlide } from 'swiper/vue';
import LogoMonocromatic from '@/theme/images/Logo_sandi_m.svg'

const router = useRouter();

const converseStore = useConvertersStore();
const authStore = useAuthStore();
const contactCardsStore = useContactCardsStore();
const profileStore = useProfileStore();

const rol = ref('')
const contactCards = ref([])
const pauta = ref({})

const Logout = () => {
  authStore.Logout();
}

const goToContact = () => {
  console.log('click')
  router.push({ name: "ContactCards" });
}

const goToPauta = () => {
  router.push({ name: "PautaDetail", params: {id: authStore.userInfo.id}});
}

const getPlan = async () => {
  if(rol.value == 'paciente'){
    await profileStore.ShowPauta(authStore.userInfo.id);
    pauta.value = profileStore.GetPauta;
  }
}

const getData = async () => {
  if(rol.value == 'usuario_basico'){
    await contactCardsStore.IndexContactCards(true)
    contactCards.value = contactCardsStore.GetContactCards.data;
  }
}

onIonViewWillEnter(() => {
  rol.value = authStore.rolUser
  getData()
  getPlan()
  converseStore.PermissionsRecordingVoice();
});
</script>


<template>
  <IonPage>
    <IonHeader :translucent="true" >
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
    <IonContent :fullscreen="true">
      <IonItemGroup v-if="pauta != null && rol == 'paciente'">
        <div class="section-header">
          <IonLabel class="section-title">Plan Nutricional</IonLabel>
          <IonButton class="section-button" @click="goToPauta">Ver todos</IonButton>
        </div> 
        <IonItem class="section-body">
          <swiper
            :slidesPerView="'auto'"
            :spaceBetween="10"
          >
            <template v-for="(service, index) in ['desayuno', 'almuerzo', 'colacion','once', 'cena' ]" :key="index">
              <swiper-slide 
                v-if="pauta[service] != null"
                class="pauta-swiper"
              >
                <div class="font-PoppinsBold text-base capitalize">{{ service }}</div>
                <div class="text-xs overflow-hidden text-ellipsis line-clamp-4">{{ pauta[service] }}</div>
              </swiper-slide>
            </template>
          </swiper>
        </IonItem>
      </IonItemGroup>
      <IonItemGroup v-if="rol != 'paciente'">
        <div class="section-header">
          <IonLabel class="section-title">Nutricionistas</IonLabel>
          <IonButton class="section-button" @click="goToContact">Ver todos</IonButton>
        </div>
        <IonItem class="section-body">
          <swiper
            :slidesPerView="'auto'"
            :spaceBetween="10"
          >
            <swiper-slide 
              v-for="card in contactCards" :key="card.id"
              class="contact-swiper"
            >
              <div class="card-title">{{ card.nutritionist_id.name }}  {{ card.nutritionist_id.last_name }}</div>
              <div class="card-description">{{ card.specialties }} </div>
            </swiper-slide>
          </swiper>
        </IonItem>
      </IonItemGroup>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel class="section-title">Recetas Guardadas</IonLabel>
        </IonItemDivider>
        <IonItem></IonItem>
      </IonItemGroup>
      <IonItemGroup v-if="rol == 'paciente'">
        <IonItemDivider>
          <IonLabel class="section-title">Lista de compras</IonLabel>
        </IonItemDivider>
        <IonItem></IonItem>
      </IonItemGroup>
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

.logo-sandi{
  width: 20%;
}

.section-header{
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title{
  font-family: 'PoppinsBold';
  font-size: 1.5rem;
  color: var(--black)
}

.section-button{
  --background: var(--mid-green);
  --color: var(--dark-green);
  font-family: 'PoppinsBold';
  font-size: 0.75rem;
}

.section-body{
  --inner-padding-end: 0px;
}

.pauta-body{
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: row dense;
}

.card-title{
  font-size: 1rem;
  font-family: 'PoppinsBold';
  color: var(--black)
}

.card-description{
  font-size: 0.75rem;
  font-family: 'Poppins';
  color: var(--black)
}

.swiper {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.contact-swiper {
  background-color: var(--neutral-beige);
  border-radius: 0.5rem;
  box-shadow: 0rem 0.375rem 0.75rem rgba(0, 0, 0, 0.15), 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
  text-align: center;
  font-size: 1.125rem;
  display: grid;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0.625rem 0rem;
}

.pauta-swiper{
  background-color: var(--light-violet);
  border-radius: 0.5rem;
  box-shadow: 0rem 0.375rem 0.75rem rgba(0, 0, 0, 0.15), 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.08);
  display: grid;
  width: 80%;
  height: 6.875rem;
  padding: 0.625rem 0.875rem;
}

.button-icon {
  --background: var(--dark-red);
  --color: var(--white);
  --box-shadow: none;
  --border-radius: 0.5rem;
}

.button-icon ion-icon {
  margin-right: 0.5rem; 
}
</style>
