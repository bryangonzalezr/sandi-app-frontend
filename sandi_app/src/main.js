import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';

import { defineCustomElements } from '@ionic/pwa-elements/loader'

import { IonicVue } from '@ionic/vue';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";


/* Theme css */
import './theme/styles/style.css';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

defineCustomElements(window);

const pinia = createPinia()

const app = createApp(App)
  .use(IonicVue)
  .use(pinia)
  .use(router)

router.isReady().then(() => {
  app.mount('#app');
});
