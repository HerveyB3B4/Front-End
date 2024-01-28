import { createApp } from 'vue'
import './style.css';
import App from './App.vue';

// setup vue-router
import router from './routers/';

// setup pinia
import pinia from './stores/';

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')