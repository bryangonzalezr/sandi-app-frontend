import { defineStore } from 'pinia'
import { ScreenReader } from "@capacitor/screen-reader";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";


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
        /* RecordingVoice(){
          this.recordingvoice = !this.recordingvoice
          SpeechRecognition.addListener("listeningState", (data) => {
            this.recognitionText = data.matches;
          })
          if(this.recordingvoice){
            console.log("Empezar grabación");
            SpeechRecognition.start({
              language: "es-CL",
              prompt: "Say something",
              popup: false,
            });
          } else{
            console.log("Detener grabación");
            SpeechRecognition.stop();
          }
        } */
        // Iniciar reconocimiento de voz continuo
        startContinuousRecognition() {
          this.recordingvoice = true;
        
          // Listener para detectar los resultados del reconocimiento de voz
          SpeechRecognition.addListener('partialResults', (data) => {
            this.recognitionText = data.matches[0]; // Toma el primer resultado coincidente
            console.log('Texto reconocido:', this.recognitionText);

            // Comprobar si el texto reconocido contiene el comando de activación
            if (this.recognitionText.toLowerCase().includes('oye sandy') || this.recognitionText.toLowerCase().includes('hey sandy') || this.recognitionText.toLowerCase().includes('oye sandi') || this.recognitionText.toLowerCase().includes('hey sandi')) {
              // Aquí activas la funcionalidad del asistente
              console.log('¡Asistente activado!');
              this.VoicetoTextmob('¿En qué puedo ayudarte?');
              // Detener el reconocimiento de voz para evitar escuchar comandos adicionales durante la respuesta
              SpeechRecognition.stop();
              // Reiniciar después de un breve tiempo para continuar escuchando
              setTimeout(() => {
                if (this.recordingvoice) {
                  this.startContinuousRecognition();
                }
              }, 3000); // Espera 3 segundos antes de reiniciar
            }
          });
        
          // Inicia el reconocimiento de voz
          SpeechRecognition.start({
            language: 'es-CL',
            partialResults: true,
            popup: false,
          });
        },
      
        // Detener el reconocimiento de voz continuo
        stopContinuousRecognition() {
          this.recordingvoice = false;
          SpeechRecognition.stop();
        },
      },

    },
)