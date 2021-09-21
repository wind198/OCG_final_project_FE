import app from './app.js';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

app.use(VueAxios, axios);
app.use(store).use(router).mount('#app');

export default app;