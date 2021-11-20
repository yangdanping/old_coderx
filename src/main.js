import Vue from 'vue';
import App from './App.vue';
import initialize from '@/global/initialize.js';
import router from '@/router';
import store from '@/store';

initialize.call(Vue);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
