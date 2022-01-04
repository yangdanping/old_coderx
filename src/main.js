import Vue from 'vue';
import App from './App.vue';
import init from '@/global';
import router from '@/router';
import store from '@/store';

init.call(Vue);
new Vue({ router, store, render: (h) => h(App) }).$mount('#app');
