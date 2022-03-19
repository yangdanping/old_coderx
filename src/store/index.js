import Vue from 'vue';
import Vuex from 'vuex';
import { cache } from '@/utils';
import userModule from './modules/user';
import articleModule from './modules/article';
import commentModule from './modules/comment';
//1.安装插件
Vue.use(Vuex);
//2.创建对象(一旦在state里定义数据,数据都会加入到Vue的响应式系统里了,所以之后vue会观察所有这些数据的变化,state所有东西都在我们观察范围之内)
const store = new Vuex.Store({
  state() {
    return {
      isDark: false,
      showDialog: false,
      pageNum: 1,
      pageSize: 5,
      pageHeight: 3000
    };
  },
  mutations: {
    getMode(state, isDark) {
      state.isDark = isDark;
    },
    changeMode(state) {
      state.isDark = !state.isDark;
      cache.setCache('isDark', state.isDark);
      console.log(state.isDark);
    },
    changeDialog(state) {
      console.log('changeDialog');
      state.showDialog = !state.showDialog;
    },
    changePageNum(state, pageNum) {
      state.pageNum = pageNum;
    },
    changePageSize(state, pageSize) {
      state.pageSize = pageSize;
    },
    initPage(state) {
      state.pageNum = 1;
      state.pageSize = 5;
    }
  },
  //异步操作必须要通过actions,类似Mutation,但是是用来代替Mutation进行异步操作的
  actions: {
    //官网不建议直接在state中改数据,所以最好不要在state中获取localStorage
    //固定每隔()小时检查一次是否请求过期
    async loadLoginAction({ commit }) {
      const token = cache.getCache('token');
      token && commit('u/changeToken', token);
      const userInfo = cache.getCache('userInfo');
      userInfo && commit('u/changeUserInfo', userInfo);
      const isDark = cache.getCache('isDark');
      isDark && commit('getMode', isDark);
    }
  },
  //modules放入划分好的模块,针对不同的模块在里面做一些相关数据的保存
  modules: {
    u: userModule, //用户模块
    a: articleModule, //文章模块
    c: commentModule //评论模块
  }
});

//3.导出store对象
export default store;
