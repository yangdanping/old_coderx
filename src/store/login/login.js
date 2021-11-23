import { userLogin } from '@/network/login/login.request.js';
import { getUserInfo } from '@/network/user/user.request.js';
import localCache from '@/utils/cache';
import router from '@/router'; //拿到router对象,进行路由跳转(.push)
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: ''
  },
  mutations: {
    login(state, token) {
      state.token = token;
      state.token && console.log('已保存token到login模块');
    },
    logOut(state) {
      state.token = null;
      state.userInfo = null;
      localCache.removeCache('token'); //退出登陆要清除token和用户信息
      localCache.removeCache('userInfo');
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
      const res1 = await userLogin(name, password);
      const { token, id } = res1; //拿到id,后面要根据该id查询是谁登陆了,以获取该用户的信息
      context.commit('login', token);
      localCache.setCache('token', token); //注意拿到token第一时间先做缓存,然后就可以在axios实例拦截器中getCache了
      // 2.根据登录后获取到的用户id请求用户信息
      const res2 = await getUserInfo(id);
      if (res2.statusCode) {
        const { ...args } = res2.data;
        localCache.setCache('userInfo', { ...args });
        context.commit('changeUserInfo', { ...args });
      } else {
        console.log('请求用户信息失败');
      }
      // 4.正式用路由跳转跳到首页-----------------------------------------------------
      localCache.getCache('token') ? router.go(0) : console.log('登陆(授权)失败');
      console.log(context);
    },
    // 官网不建议直接在state中改数据,所以最好不要在state中获取localStorage
    async loadLoginAction({ commit }) {
      const token = localCache.getCache('token');
      token && commit('login', token);
      const userInfo = localCache.getCache('userInfo');
      userInfo && commit('changeUserInfo', userInfo);
    }
  }
};
