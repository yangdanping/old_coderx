import { userLogin } from '@/network/login/login.request.js';
import localCache from '@/utils/cache';
import router from '@/router'; //拿到router对象,进行路由跳转(.push)
export default {
  namespaced: true,
  state: {
    Mdname: '我是登陆模块',
    token: '',
    userInfo: {}
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
      state.token && console.log('我是changeToken,我已保存token到login模块');
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      // 1.实现登录逻辑----------------------
      const { name, password } = payload;
      const loginResult = await userLogin(name, password);
      console.log(loginResult);
      const { token } = loginResult; //拿到id,后面要根据该id查询是谁登陆了,以获取该用户的信息
      commit('changeToken', token);
      localCache.setCache('token', token); //注意拿到token第一时间先做缓存,然后就可以在axios实例拦截器中getCache了
      // 4.正式用路由跳转跳到首页-----------------------------------------------------
      // console.log(this.$router);//undefined
      router.push('/home');
    }
  }
};
