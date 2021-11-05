import Vue from 'vue';
import App from './App.vue';
import registerEl from './global/element-ui-register';
import 'normalize.css';
import './assets/css/base.less';
import router from './router';
import store from './store';
Vue.use(router);
Vue.config.productionTip = false;
registerEl.call(Vue);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
