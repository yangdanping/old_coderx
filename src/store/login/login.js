import { userLogin } from '@/network/login/login.request.js';
import { getUserInfo } from '@/network/user/user.request.js';
import localCache from '@/utils/cache';
import router from '@/router'; //拿到router对象,进行路由跳转(.push)
export default {
  namespaced: true,
  state: {
    Mdname: '登陆',
    token: localCache.getCache('token') ?? '',
    userInfo: localCache.getCache('userInfo') ?? ''
  },
  mutations: {
    changeToken(state, token) {
      if (!state.token) {
        state.token = token;
        state.token && console.log('我是changeToken,我已保存token到login模块');
      } else {
        localCache.removeCache('token'); //退出登陆要清除token和用户信息
        localCache.removeCache('userInfo');
        state.token = null;
        state.userInfo = null;
      }
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload;
      console.log(state.userInfo);
    }
  },
  actions: {
    async loginAction(context, payload) {
      // 1.实现登录逻辑----------------------
      const { name, password } = payload;
      const loginResult = await userLogin(name, password);
      console.log(loginResult);
      const { token, id } = loginResult; //拿到id,后面要根据该id查询是谁登陆了,以获取该用户的信息
      context.commit('changeToken', token);
      localCache.setCache('token', token); //注意拿到token第一时间先做缓存,然后就可以在axios实例拦截器中getCache了
      // 2.根据登录后获取到的用户id请求用户信息
      const userResult = await getUserInfo(id);
      if (userResult.statusCode) {
        const { ...args } = userResult.data;
        localCache.setCache('userInfo', { ...args });
        context.commit('changeUserInfo', { ...args });
      } else {
        console.log('请求用户信息失败');
      }
      // 4.正式用路由跳转跳到首页-----------------------------------------------------
      if (localCache.getCache('token')) {
        router.push('/');
      } else {
        console.log('登陆(授权)失败');
      }
    }
  }
};
