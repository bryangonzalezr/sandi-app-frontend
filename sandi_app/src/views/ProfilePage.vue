<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox } from '@ionic/vue';
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores";

const profileStore = useProfileStore();
const { Profile } = storeToRefs(profileStore);

const ejercicio = ref('');

const newProfile = ref({ 
  nombre: '', 
  fechaNacimiento: '',
  edad: 0,
  sexo: '', 
  peso: 0, 
  intolerancias: '', 
  tabaco: '',
  alcohol: '',
  estatura: 0,
  imc: 0,
  tipo_actividad: '',
  nivel_actividad: '',
  agua: '',
  seguimiento_planes: '',
  });

const saveData = () => {
  newProfile.value.imc = newProfile.value.peso / (newProfile.value.estatura * newProfile.value.estatura)
  profileStore.CreateProfile(newProfile.value);
  console.log(Profile);
};

const logout = () => {
  localStorage.removeItem("user");
}

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Perfil Nutricional</IonTitle>
      </IonToolbar>
      <IonButton @click="logout()">Cerrar sesión</IonButton>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard color="success">
      <IonCardHeader>
        <h1>Antecedentes Personales</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <label>Nombre</label>
              <IonInput v-model="newProfile.nombre" placeholder="Ingrese su nombre completo"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <label>Sexo</label>
              <IonSelect v-model="newProfile.sexo" placeholder="Selecciona tu sexo">
                <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                <IonSelectOption value="Femenino">Femenino</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <label>Edad</label>
              <IonInput v-model.number="newProfile.edad" placeholder="Ingrese su edad" type="number"></IonInput>
            </IonCol>
            <IonCol>
              <label>Fecha de nacimiento</label>
              <IonInput v-model="newProfile.fechaNacimiento" placeholder="Ingrese su fecha de nacimiento" type="date"></IonInput>
            </IonCol>
          </IonRow>
          <!-- <IonRow>
            <IonCol>
              <label>Estatura:</label>
              <IonInput v-model.number="newProfile.estatura" placeholder="Ingrese su estatura, ej:1.6"></IonInput>
            </IonCol>
            <IonCol>
              <label>Peso:</label>
              <IonInput v-model.number="newProfile.peso" placeholder="Ingrese su peso"></IonInput>
            </IonCol>
          </IonRow> -->
           <IonRow>
            <IonCol>
              <label>Objetivos</label>
              <IonInput placeholder="Ingresa tus objetivos"></IonInput>
            </IonCol>
           </IonRow>
        </IonGrid>
      </IonItem>
      <IonCardHeader>
        <h1>Actividad física y hábitos</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <label>Consumo de alcohol</label>
              <IonSelect v-model="newProfile.alcohol" placeholder="Frecuencia">
                <IonSelectOption value="No">No</IonSelectOption>
                <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
                <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
                <IonSelectOption value="Ambos">Ambos</IonSelectOption>
              </IonSelect>
            </IonCol>
            <IonCol>
              <label>Consumo de tabaco</label>
              <IonSelect v-model="newProfile.tabaco" placeholder="Frecuencia">
                <IonSelectOption value="No">No</IonSelectOption>
                <IonSelectOption value="Tabaco">Tabaco</IonSelectOption>
                <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
                <IonSelectOption value="Ambos">Ambos</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <label>¿Realizas actividades físicas?</label>
              <IonSelect v-model="ejercicio" placeholder="Selecciona opción">
                <IonSelectOption value="Si">Si</IonSelectOption>
                <IonSelectOption value="No">No</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <template v-if="ejercicio == 'Si'">
              <IonRow>
                <label>¿Hace cuanto tiempo realizas actividad fisica?</label>
                <IonInput placeholder="Ingresa el tiempo"></IonInput>
              </IonRow>
              <IonRow>
                <label>Frecuencia de actividad fisica</label>
                <IonSelect v-model="newProfile.nivel_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="moderada">1-2 veces a la semana</IonSelectOption>
                  <IonSelectOption value="pesada">3-5 veces a la semana</IonSelectOption>
                </IonSelect>
              </IonRow>
              <IonRow>
                <label>Duracion del entrenamiento</label>
                <IonInput placeholder="Ingresa una duracion"></IonInput>
              </IonRow>
              <IonRow>
                <label>Tipo de entrenamiento</label>
                <IonSelect v-model="newProfile.tipo_actividad" placeholder="Selecciona opción">
                  <IonSelectOption value="leve">Cardio</IonSelectOption>
                  <IonSelectOption value="moderada">Pesas</IonSelectOption>
                </IonSelect>
              </IonRow>
          </template>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonCardHeader>
        <h1>Anamnesis Alimentaria</h1>
      </IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <label>Intolerancia o alergias:</label>
              <IonInput v-model="newProfile.intolerancias" placeholder="Ingrese sus intolerancias o alergias"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <label>Consumo de agua</label>
              <IonSelect v-model="newProfile.agua" placeholder="Selecciona consumo">
                <IonSelectOption value="baja">Bajo consumo</IonSelectOption>
                <IonSelectOption value="media">Medio consumo</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <label>¿Has seguido planes con anterioridad?</label>
              <IonSelect v-model="newProfile.seguimiento_planes" placeholder="Selecciona una opcion">
                <IonSelectOption value="nunca">Nunca</IonSelectOption>
                <IonSelectOption value="si">Si</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard color="warning">
      <IonCardHeader>Antecedentes Morbidos</IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow> <IonCol> <label>Diabetes tipo 2 </label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Insulino resistencia </label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Hipertension arterial</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Tiroides</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Dislpidemia</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow>
            <IonCol>
                <label>Otros antecedentes</label>  
                <IonInput placeholder="Ingrese antecedentes"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <label>Cirugias</label>  
                <IonInput placeholder="Ingrese antecedentes"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <label>Farmacos</label>  
                <IonInput placeholder="Ingrese antecedentes"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <label>Examenes de laboratorio</label>  
                <IonInput placeholder="Ingrese antecedentes"></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Antecedentes Familiares</IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow> <IonCol> <label>Diabetes tipo 2 </label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Hipertension arterial</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Tiroides</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow> <IonCol> <label>Dislpidemia</label> </IonCol> <IonCol> <IonCheckbox></IonCheckbox> </IonCol> </IonRow>
          <IonRow>
            <IonCol>
                <label>Otros antecedentes</label>  
                <IonInput placeholder="Ingrese antecedentes"></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonCardHeader>Valoracion subjetiva y digestion</IonCardHeader>
      <IonItem>
        <IonGrid>
          <IonRow> <IonCol><label>Peso habitual</label> <IonInput placeholder="Ingrese peso habitual"type="number"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Sintomas Gastrointestinales</label> <IonInput placeholder="Ingrese sintomas"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Variacion del peso</label> <IonInput placeholder="Ingrese variacion peso"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Apetito</label> <IonInput placeholder="Descripcion apetito"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Digestion</label> <IonInput placeholder="Descripcion digestion"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Frecuencia digestion</label> <IonInput placeholder="Frecuencia digestion"></IonInput></IonCol> </IonRow>
          <IonRow> <IonCol><label>Medidas para la digestion</label> <IonInput placeholder="Medidas digestion"></IonInput></IonCol> </IonRow>
        </IonGrid>
      </IonItem>
    </IonCard>
    <IonCard>
      <IonItem>
        <ion-button expand="full" @click="saveData()">
          Guardar
        </ion-button>
      </IonItem>
    </IonCard>
    </IonContent>
  </IonPage>
</template>

<style scoped>
label {
  font-weight: bold;
  margin-right: 10px;
}
IonItem {
  margin-bottom: 10px;
}
ion-grid {
  --ion-grid-padding: 5px;
}

</style>
