import Vue from 'vue';
import Vuex from 'vuex';
import localCache from '@/utils/cache.js';
//1.安装插件
Vue.use(Vuex);

import registerModule from './register/register';
import loginModule from './login/login';
//2.创建对象
/* 一旦在state里定义数据,数据都会加入到Vue的响应式系统里了
  所以之后vue会观察所有这些数据的变化,state所有东西都在我们观察范围之内(每个对象和每个属性都有对应的Dep对象,Dep可以监听我们属性的变化) */
//2.创建对象
const store = new Vuex.Store({
  //modules放入划分好的模块,针对不同的模块在里面做一些相关数据的保存
  state() {
    return {
      isDark: localCache.getCache('isDark') ?? false
    };
  },
  mutations: {
    changeMode(state) {
      state.isDark = !state.isDark;
      localCache.setCache('isDark', state.isDark);
    }
  },
  modules: {
    r: registerModule, //注册模块
    l: loginModule //登陆模块
  }
});

//3.导出store对象
export default store;
