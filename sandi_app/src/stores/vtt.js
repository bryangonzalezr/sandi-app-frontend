import { defineStore } from 'pinia'
import { ScreenReader } from "@capacitor/screen-reader";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import Swal from "sweetalert2";


export const useConvertersStore = defineStore('converters', {
    state: () => ({
        recordingvoice: false,
        recognitionText: '',
        currentTextweb: '',
        currentText: '',
  
    }),
  
    getters: {
      Gettextweb: (state) => state.currentTextweb,
      Gettext: (state) => state.currentText,
    },
  
    actions: {
        async VoicetoTextweb(){
            await ScreenReader.speak({ language:"en", value: this.currentTextweb })
            console.log("LEER MENSAJE:", this.currentTextweb )
        },

        async StopVoicetoTextmob(){
          await TextToSpeech.stop();
        },

        async VoicetoTextmob(message){
            await TextToSpeech.speak({
                text: message,
                lang: 'es-CL',
                rate: 1.0,
                pitch: 1.0,
                volume: 1.0
              })
        },

        async PermissionsRecordingVoice(){
          try{
            await SpeechRecognition.available()
            await SpeechRecognition.requestPermissions()
          }catch(error){
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              confirmButtonColor: "#e65a03",
              confirmButtonText: "Aceptar",
              heightAuto: false,
            });
          }
        },

        ResetVariablesvoice(){
          this.recognitionText = '';
          this.recordingvoice = false;
          this.pushrecording = '';
        },
        // Función para iniciar y detener la grabación de voz
        async RecordingVoice() {
          try{
            const { available } = await SpeechRecognition.available()
            if(available){
              this.recordingvoice = true;
              // Iniciar el reconocimiento de voz
              SpeechRecognition.start({
                language: "es-CL",
                partialResults: true,  // Permite recibir resultados parciales
                prompt: "Di algo",
                popup: false,
              });
                // Listener para capturar resultados parciales o finales
              SpeechRecognition.addListener("partialResults", (data) => {
                  this.recognitionText = data.matches[0]; // Toma el primer resultado
                });
              }

              SpeechRecognition.addListener("listeningState", (state) => {
                if(state.status == "stopped"){
                  SpeechRecognition.stop();
                  this.recordingvoice = false;
                }
              });

          }catch(error){
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              confirmButtonColor: "#e65a03",
              confirmButtonText: "Aceptar",
              heightAuto: false,
            });
          }
          
        },

        async StopRecordingVoice() {
          await SpeechRecognition.stop();
          this.recordingvoice = false;
        },
      },

    },
)