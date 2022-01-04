import router from '@/router'; //拿到router对象,进行路由跳转(.push)
import { showMsg, timeFormat } from '@/utils';
import { createArticle, getList, getDetail, likeArticle, updateArticle, removeArticle, addView } from '@/network/article/article.request.js';
import { getLiked } from '@/network/user/user.request.js';
export default {
  namespaced: true,
  state() {
    return {
      articles: [],
      article: {},
      pageNum: 1,
      pageSize: 5,
      total: null,
      articleLikedId: [] //该用户点赞过的文章id,通过computed计算是否有点赞
    };
  },
  getters: {
    isAuthor(state) {
      return (userId) => (state.article.author ? state.article.author.id === userId : false);
    },
    isArticleUserLiked(state) {
      return (articleId) => {
        return { liked: state.articleLikedId.some((id) => id === articleId) };
      };
    }
  },
  mutations: {
    getListMutation(state, payload) {
      const { data, total } = payload;
      data.forEach((article) => (article.createAt = timeFormat(article.createAt)));
      state.articles = data;
      state.total = total;
    },
    getDetail(state, article) {
      article.createAt = timeFormat(article.createAt);
      article.updateAt = timeFormat(article.updateAt);
      state.article = article;
    },
    changePageNum(state, newPageNum) {
      state.pageNum = newPageNum; //改变页数
    },
    changePageSize(state, newPageSize) {
      state.pageSize = newPageSize; //改变每页显示条目个数
    },
    getArticleLikedId(state, payload) {
      const { articleLiked } = payload;
      state.articleLikedId = articleLiked;
    }
  },
  actions: {
    async getListAction({ commit, rootState, dispatch }) {
      const res = await getList(rootState.pageNum, rootState.pageSize); //获取文章列表信息以及文章数
      if (res.code === '0') {
        commit('getListMutation', { ...res });
        dispatch('refreshLikeAction'); //若用户登录获取登录用户点赞过哪些文章
        // router.push({ path: '/article', query: { page: rootState.pageNum } });
      } else {
        showMsg(3, '获取文章列表失败');
      }
    },
    async refreshLikeAction({ commit, rootState }) {
      const userId = rootState.u.userInfo.id;
      const res = await getLiked(userId);
      res.code === '0' && commit('getArticleLikedId', res.data);
    },
    async getDetailAction({ commit, dispatch }, articleId) {
      const res1 = await addView(articleId);
      if (res1.code === '0') {
        const res2 = await getDetail(articleId);
        if (res2.code === '0') {
          commit('getDetail', res2.data);
          dispatch('c/getCommentAction', articleId, { root: true });
        } else {
          showMsg(3, '获取文章详情失败');
        }
      } else {
        showMsg(3, '浏览量增加失败');
      }
    },
    async likeAction({ dispatch }, articleId) {
      const res = await likeArticle(articleId);
      if (res.code === '0') {
        dispatch('getListAction');
        showMsg(1, '点赞文章成功');
      } else {
        dispatch('getListAction');
        showMsg(1, '取消点赞成功');
      }
    },
    async editAction({ dispatch }, payload) {
      const res = await createArticle(payload);
      if (res.code === '0') {
        console.log(res);
        router.replace(`/article/${res.data.insertId}`);
        dispatch('getDetailAction', res.data.insertId);
        showMsg(1, '发布文章成功!');
      } else {
        console.log(res);
        showMsg(3, '发布文章失败!');
      }
    },
    async updateAction({}, payload) {
      const res = await updateArticle(payload);
      if (res.code === '0') {
        showMsg(1, '修改文章成功!');
        const { articleId } = payload;
        router.push({ path: `/article/${articleId}` });
      } else {
        showMsg(3, '修改文章失败!');
        console.log(res);
      }
    },
    async removeAction({ state }, articleId) {
      const res = await removeArticle(articleId);
      if (res.code === '0') {
        showMsg(1, '删除文章成功!');
        state.articles.length ? router.push({ path: `/article` }) : router.go(0);
      } else {
        showMsg(3, '删除文章失败!');
        console.log(res);
      }
    }
  }
};
