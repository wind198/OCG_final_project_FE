import app from './app.js';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';

app.use(VueAxios, axios);
app.use(store).use(router).mount('#app');

router.beforeEach((to, from) => {
    console.log("beforeeach",to,from);
  })
export default app;