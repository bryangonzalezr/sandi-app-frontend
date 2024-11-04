import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useProgressBarStore = defineStore('progress-bar', {
    state: () => ({
        progress: 0,
        status: 'active',
        progressInterval: 0,
        statusInterval: 0,
        showProgress: false,
        isLoading: false
      }),
    
    actions: {
        checkProgress(menu_id) {
            this.progressInterval = setInterval(async () => {
              const res = await APIAxios.get(`api/progress-bar/${menu_id}`);
              this.progress = res.data.progress;
              console.log(res.data)
      
              if (this.progress >= 100 || this.progress == 0) {
                clearInterval(this.progressInterval);
              }
            }, 1000); // Consulta cada segundo
          },
        
        checkStatus(menu_id){
          this.statusInterval = setInterval(async () => {
         /*  const res = await APIAxios.get(`api/progress-bar-status/${menu_id}`)
          console.log(res.data) */
          this.status = 'active';
          if (this.status === 'completed') {
            clearInterval(this.statusInterval);
          }

          }, 2000);
        }
    }
})