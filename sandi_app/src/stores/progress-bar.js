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
            const res = await APIAxios.get(`api/progress-bar/${menu_id}`);
            this.progress = res.data.progress.progress;
            this.status = res.data.progress.status;
            console.log(res.data)
    
            if (this.progress >= 100 || this.status == 'inactive') {
              clearInterval(this.progressInterval);
            }
          }, 500); // Consulta cada segundo
        },
    }
})