import { createApp } from 'vue'
import App from './Options.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createApp(App)
    .use(PrimeVue, {
        ripple: true,
        theme: { preset: Aura }
    })
    .mount('#app')
