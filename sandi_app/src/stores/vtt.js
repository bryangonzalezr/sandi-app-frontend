import { defineStore } from 'pinia'
import { ScreenReader } from "@capacitor/screen-reader";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";


export const useConvertersStore = defineStore('converters', {
    state: () => ({
        recordingvoice: false,
        pushrecording: '',
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
            console.log(this.currentTextweb )
            console.log(this.currentTextweb )
            console.log("LEER MENSAJE:", this.currentTextweb )
        },

        async VoicetoTextmob(message){
            await TextToSpeech.speak({
                text: message,
                lang: 'en-US',
                rate: 1.0,
                pitch: 1.0,
                volume: 1.0
              })
        },

        PermissionsRecordingVoice(){
          SpeechRecognition.available()
          SpeechRecognition.requestPermissions()
        },

        ResetVariablesvoice(){
          this.recognitionText = '';
          this.recordingvoice = false;
          this.pushrecording = '';
        },
        // Función para iniciar y detener la grabación de voz
        RecordingVoice() {
          if(!this.recordingvoice){
            // Listener para capturar resultados parciales o finales
            SpeechRecognition.addListener("partialResults", (data) => {
              this.recognitionText = data.matches[0]; // Toma el primer resultado
            });
          
            SpeechRecognition.addListener("listeningState", (state) => {
              if(state.status == "started"){
                this.pushrecording = state.status;
              }else{
                SpeechRecognition.stop();
                this.pushrecording = state.status;
              }
            });
          
            this.recordingvoice = true;
          }

          // Iniciar el reconocimiento de voz
          SpeechRecognition.start({
              language: "es-CL",
              partialResults: true,  // Permite recibir resultados parciales
              prompt: "Di algo",
              popup: false,
          });
          
        },
      },

    },
)