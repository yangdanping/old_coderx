import { userRegister } from '@/network/register/register.request.js';
export default {
  namespaced: true,
  state: {
    Mdname: '我是注册模块',
    counter: 100
  },
  mutations: {
    increment(state) {
      return state.counter++;
    }
  },
  /* 异步操作必须要通过actions,类似Mutation,但是是用来代替Mutation进行异步操作的
  Promise非常非常重要,是异步的基础,有必要把 Promise的实现原理弄懂. */
  actions: {
    async registerAction(context, payload) {
      const { name, password } = payload;
      return await userRegister(name, password); //在Register.vue中判断是否注册成功
    }
  },
  getters: {}
};
