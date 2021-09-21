import { createApp } from '@vue/runtime-dom';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
const app = createApp(App);
app.use(VueAxios,axios);
export default app;