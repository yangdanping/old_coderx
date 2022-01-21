import { userRegister, userLogin, checkAuth, getUserInfo, getFollow, follow, getArticle, getComment } from '@/network/user/user.request.js';
import { getCollect, addCollect } from '@/network/user/collect.request.js';
import { cache, eventBus, showMsg, timeFormat } from '@/utils';
import router from '@/router'; //拿到router对象,进行路由跳转
export default {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}, //登录用户信息,有读和写权限
      profile: {}, //其他用户信息,只有读权限
      isFollowed: false,
      followInfo: '',
      articles: [],
      comments: [],
      collects: []
    };
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
      state.token && console.log('已保存token到login模块');
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload; //有待考虑
    },
    changeProfile(state, payload) {
      state.profile = payload;
    },
    changeFollowInfo(state, payload) {
      state.followInfo = payload;
      const { follower } = payload;
      // 若follower为null说明该用户无关注者,isFollowed设为false
      state.isFollowed = follower ? follower.some((item) => item.id === state.userInfo.id) : false;
    },
    changeArticle(state, payload) {
      payload.forEach((article) => (article.createAt = timeFormat(article.createAt)));
      state.articles = payload;
    },
    changeComment(state, payload) {
      payload.forEach((comment) => (comment.createAt = timeFormat(comment.createAt)));
      state.comments = payload;
      console.log(state.comments);
    },
    changeCollect(state, payload) {
      state.collects = payload;
      console.log(state.collects);
    },
    logOut(state, refresh = true) {
      state.token = '';
      state.userInfo = {};
      cache.removeCache('token'); //退出登录要清除token和用户信息
      cache.removeCache('userInfo');
      refresh && router.go(0);
    }
  },
  actions: {
    async registerAction({ commit }, payload) {
      const { name, password } = payload;
      const res = await userRegister(name, password); //在Register.vue中判断是否注册成功
      if (res.code === '0') {
        showMsg(1, '注册成功');
        eventBus.$emit('registerSuccess', { name, password });
      } else {
        showMsg(3, '注册失败');
      }
    },
    async loginAction({ commit }, payload) {
      // 1.实现登录逻辑----------------------
      const { name, password } = payload;
      const res1 = await userLogin(name, password);
      if (res1.code === '0') {
        const { id } = res1.data; //拿到id,后面要根据该id查询是谁登录了,以获取该用户的信息
        const { token } = res1;
        // 2.根据登录后获取到的用户id请求用户信息
        const res2 = await getUserInfo(id);
        if (res2.code === '0') {
          commit('changeUserInfo', res2.data);
          cache.setCache('userInfo', res2.data);
          commit('changeToken', token);
          cache.setCache('token', token); //注意拿到token第一时间先做缓存,然后就可以在axios实例拦截器中getCache了
          // 3.成功登录后刷新页面-----------------------------------------------------
          cache.getCache('token') ? router.go(0) : console.log('登录(授权)失败');
        } else {
          showMsg(3, '请求登录用户信息失败'); //若是登录用户信息则不用再请求了
        }
      } else {
        showMsg(3, '授权失败'); //若是登录用户信息则不用再请求了
      }
    },
    async checkAuthAction({ commit }) {
      const res = await checkAuth();
      if (res.code !== '0') {
        commit('logOut', false);
        // showMsg(3, `${res.code}:${res.msg}`);
      }
    },
    async getProfileAction({ commit, dispatch }, userId) {
      const res = await getUserInfo(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      if (res.code === '0') {
        commit('changeProfile', res.data);
        dispatch('getArticleAction', res.data.id);
      } else {
        showMsg(3, '请求用户信息失败');
      }
    },
    async getFollowAction({ commit }, userId) {
      const res = await getFollow(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      // 若改用户中的follower的id中有当前登录用户的id,则isFollowed为true
      res.code === '0' ? commit('changeFollowInfo', res.data) : showMsg(3, '请求用户关注信息失败');
    },
    async followAction({ dispatch }, userId) {
      const res = await follow(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      if (res.code === '0') {
        dispatch('getFollowAction', userId); //更新关注信息
        showMsg(1, '关注成功');
      } else {
        dispatch('getFollowAction', userId); //更新关注信息
        showMsg(2, '取关成功');
      }
    },
    async getArticleAction({ commit, rootState }, userId) {
      const res = await getArticle(userId, rootState.pageNum, rootState.pageSize);
      res.code === '0' ? commit('changeArticle', res.data) : showMsg(3, '获取用户发表文章失败');
    },
    async getCommentAction({ commit, rootState }, userId) {
      const res = await getComment(userId, rootState.pageNum, rootState.pageSize);
      if (res.code === '0') {
        commit('changeComment', res.data);
      } else {
        showMsg(3, '获取用户发表评论失败');
      }
    },
    async getCollectAction({ commit }) {
      const res = await getCollect();
      if (res.code === '0') {
        commit('changeCollect', res.data);
      } else {
        showMsg(3, '获取用户收藏夹失败');
      }
    },
    async collectAction({ dispatch }, collectName) {
      const res = await addCollect(collectName);
      if (res.code === '0') {
        showMsg(1, '添加收藏夹成功');
        dispatch('getCollectAction');
      } else {
        showMsg(3, res.msg);
      }
    }
  }
};
