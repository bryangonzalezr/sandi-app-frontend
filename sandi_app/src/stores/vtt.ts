import { defineStore } from 'pinia'
import { ScreenReader } from "@capacitor/screen-reader";
import { TextToSpeech } from '@capacitor-community/text-to-speech';


export const useConvertersStore = defineStore('converters', {
    state: () => ({
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
                volume: 1.0,
                category: 'ambient',
              })
        },
      },

    },
)