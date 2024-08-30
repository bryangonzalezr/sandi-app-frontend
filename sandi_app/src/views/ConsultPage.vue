<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCheckbox } from '@ionic/vue';
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Consulta</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonCard color="secondary">
        <IonCardHeader><h1>Datos comunes</h1></IonCardHeader>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol><label>Estatura</label><IonInput placeholder="Ingresar estatura" type="number"></IonInput></IonCol>
              <IonCol><label>Peso</label><IonInput placeholder="Ingresar peso" type="number"></IonInput></IonCol>
            </IonRow>
            <IonRow></IonRow>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Plieges</h1></IonCardHeader>
        <IonItem>
          <IonGrid>
            <IonRow><IonCol><label>Biciptal</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Triciptal</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Sub Escap</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Supraespinal</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Supra Cres</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Muslo medio</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Pantorilla</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Abdomen</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
          </IonGrid>
        </IonItem>
        <IonCardHeader><h1>Perimetros</h1></IonCardHeader>
        <IonItem>
          <IonGrid>
            <IonRow><IonCol><label>Pb Relajado</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Pb contraido</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Antebrazo</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Muslo medio</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Pantorrilla</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol><IonCol><label>Cintura</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
            <IonRow><IonCol><label>Torax</label><IonInput placeholder="Medida" type="number"></IonInput></IonCol></IonRow>
          </IonGrid>
        </IonItem>
        <IonButton>Finalizar consulta</IonButton>
      </IonCard>
    </IonContent>
  </IonPage>
</template>