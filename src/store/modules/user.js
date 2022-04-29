import { userRegister, userLogin, checkAuth, getUserInfo, getFollow, follow, getArticle, getComment, updateProfile, reportUser, feedback } from '@/service/user/user.request.js';
import { getCollect, addCollect, addToCollect } from '@/service/user/collect.request.js';
import { uploadAvatar, loadAvatar } from '@/service/file/file.request.js';
import { cache, eventBus, timeFormat, Msg } from '@/utils';
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
  getters: {
    isUser(state) {
      return (userId) => state.token && userId === state.userInfo.id; //判断是否是当前已登陆用户
    }
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
      payload.forEach((collect) => (collect.createAt = timeFormat(collect.createAt)));
      state.collects = payload;
      console.log(state.collects);
    },
    logOut(state, refresh = true) {
      state.token = '';
      state.userInfo = {};
      cache.removeCache('token'); //退出登录要清除token和用户信息
      cache.removeCache('userInfo');
      refresh && router.go(0);
    },
    initProfile(state) {
      state.profile = {};
    }
  },
  actions: {
    async registerAction({ commit, dispatch }, payload) {
      const { name, password } = payload;
      const res = await userRegister(name, password);
      console.log(res);
      if (res.code === 0) {
        console.log('registerAction!!!!!!!!!!', res.data);
        dispatch('loginAction', payload); //注册成功后自动登陆
        // eventBus.$emit('registerSuccess');
      } else {
        Msg.showFail(res.msg);
      }
    },
    async loginAction({ commit }, payload) {
      // 1.实现登录逻辑----------------------
      const { name, password } = payload;
      console.log('loginAction!!!!!!!!!!!!!!', payload);
      const res1 = await userLogin(name, password);
      if (res1.code === 0) {
        const { id } = res1.data; //拿到id,后面要根据该id查询是谁登录了,以获取该用户的信息
        const { token } = res1;
        // 2.根据登录后获取到的用户id请求用户信息
        const res2 = await getUserInfo(id);
        if (res2.code === 0) {
          commit('changeUserInfo', res2.data);
          cache.setCache('userInfo', res2.data);
          commit('changeToken', token);
          cache.setCache('token', token); //注意拿到token第一时间先做缓存,然后就可以在axios实例拦截器中getCache了
          // 3.成功登录后刷新页面-----------------------------------------------------
          cache.getCache('token') ? router.go(0) : console.log('登录(授权)失败');
        } else {
          Msg.showFail('请求登录用户信息失败'); //若是登录用户信息则不用再请求了
        }
      } else {
        Msg.showFail(res1.msg); //若是登录用户信息则不用再请求了
      }
    },
    async checkAuthAction({ commit }) {
      const res = await checkAuth();
      res.code && commit('logOut', false);
    },
    async getProfileAction({ commit, dispatch }, userId) {
      const res = await getUserInfo(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      if (res.code === 0) {
        commit('changeProfile', res.data);
        dispatch('getArticleAction', res.data.id);
      } else {
        Msg.showFail('请求用户信息失败');
      }
    },
    async updateProfileAction({}, payload) {
      const res = await updateProfile(payload);
      console.log(res.data);
      res.code === 0 ? router.go(0) : Msg.showFail('修改信息失败');
    },
    async getFollowAction({ commit }, userId) {
      const res = await getFollow(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      // 若改用户中的follower的id中有当前登录用户的id,则isFollowed为true
      res.code === 0 ? commit('changeFollowInfo', res.data) : Msg.showFail('请求用户关注信息失败');
    },
    async followAction({ dispatch }, userId) {
      const res = await follow(userId); //注意!这个不是登录用户的信息,而是普通用户信息
      if (res.code === 0) {
        dispatch('getFollowAction', userId); //更新关注信息
        Msg.showSuccess('关注成功');
      } else {
        dispatch('getFollowAction', userId); //更新关注信息
        Msg.showWarn('取关成功');
      }
    },
    async getArticleAction({ commit, rootState }, userId) {
      const res = await getArticle(userId, rootState.pageNum, rootState.pageSize);
      res.code === 0 ? commit('changeArticle', res.data) : Msg.showFail('获取用户发表文章失败');
    },
    async getCommentAction({ commit, rootState }, userId) {
      const res = await getComment(userId, rootState.pageNum, rootState.pageSize);
      if (res.code === 0) {
        commit('changeComment', res.data);
      } else {
        Msg.showFail('获取用户发表评论失败');
      }
    },
    async getCollectAction({ commit }, userId) {
      const res = await getCollect(userId);
      if (res.code === 0) {
        commit('changeCollect', res.data);
      } else {
        Msg.showFail('获取用户收藏夹失败');
      }
    },
    async addCollectAction({ dispatch, rootState }, collectName) {
      const userId = rootState.u.userInfo.id;
      const res = await addCollect(collectName);
      if (res.code === 0) {
        Msg.showSuccess('添加收藏夹成功');
        dispatch('getCollectAction', userId);
      } else {
        Msg.showFail(res.msg);
      }
    },
    async collectAction({ dispatch, rootState }, payload) {
      const userId = rootState.u.userInfo.id;
      const res = await addToCollect(payload);
      dispatch('getCollectAction', userId);
    },
    async uploadAvatarAction({ dispatch, commit, rootState }, payload) {
      const userId = rootState.u.userInfo.id;
      const res = await uploadAvatar(payload);
      if (res.code === 0) {
        Msg.showSuccess('更换头像成功');
        const res = await getUserInfo(userId);
        if (res.code === 0) {
          commit('changeUserInfo', res.data);
          cache.setCache('userInfo', res.data);
          router.go(0);
        } else {
          Msg.showFail('请求用户信息失败');
        }
      } else {
        Msg.showFail('更换头像失败');
      }
    },
    async reportAction({ dispatch }, payload) {
      const { userId, report } = payload;
      const res = await reportUser(userId, report);
      if (res.code === 0) {
        Msg.showSuccess('举报用户成功');
      } else {
        Msg.showFail('举报用户失败');
      }
    },
    async feedbackAction({ dispatch }, payload) {
      const { userId, content } = payload;
      const res = await feedback(userId, content);
      if (res.code === 0) {
        Msg.showSuccess('提交反馈成功');
      } else {
        Msg.showFail('提交反馈失败');
      }
    }
  }
};
