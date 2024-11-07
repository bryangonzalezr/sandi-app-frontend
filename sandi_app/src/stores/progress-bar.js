import { APIAxios } from "./baseURL";
import { defineStore } from 'pinia';

export const useProgressBarStore = defineStore('progress-bar', {
    state: () => ({
        progress: 0,
        status: 'inactive',
        progressInterval: 0,
      }),
    
    actions: {
        checkProgress(menu_id) {
            this.progressInterval = setInterval(async () => {
            await APIAxios.get(`api/progress-bar/${menu_id}`).then((res) => {
              this.progress = res.data.progress.progress;
              this.status = res.data.progress.status;
              if (this.progress >= 100 && this.status == 'inactive') {
                this.status = 'inactive';
                clearInterval(this.progressInterval);
              }
            }).catch(() => {
              clearInterval(this.progressInterval);
            });
          }, 500); // Consulta cada segundo
        },
    }
})