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
            await ScreenReader.speak({ language:"es", value: this.currentTextweb })
            console.log(this.currentTextweb )
            console.log(this.currentTextweb )
            console.log("LEER MENSAJE:", this.currentTextweb )
        },

        async VoicetoTextmob(){
            await TextToSpeech.speak({
                text: this.currentText,
                lang: 'es-CL',
                rate: 1.0,
                pitch: 1.0,
                volume: 1.0
              })
        },
        PermissionsRecordingVoice(){
          SpeechRecognition.available()
          SpeechRecognition.requestPermissions()
        },
        RecordingVoice(){
          this.recordingvoice = !this.recordingvoice
          SpeechRecognition.addListener("partialResults", (data: any) => {
            this.recognitionText = data.matches;
          })
          if(this.recordingvoice){
            console.log("Empezar grabación");
            SpeechRecognition.start({
              language: "es-CL",
              maxResults: 2,
              prompt: "Say something",
              partialResults: true,
              popup: false,
            });
          } else{
            console.log("Detener grabación");
            SpeechRecognition.stop();
          }
        }
      },

    },
)