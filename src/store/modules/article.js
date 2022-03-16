import router from '@/router'; //拿到router对象,进行路由跳转(.push)
import { timeFormat, Msg } from '@/utils';
import { createArticle, getList, getDetail, likeArticle, updateArticle, removeArticle, addView, getTags, addTags, search } from '@/service/article/article.request.js';
import { getLiked } from '@/service/user/user.request.js';
export default {
  namespaced: true,
  state() {
    return {
      articles: [],
      article: {},
      total: null,
      articleLikedId: [], //该用户点赞过的文章id,通过computed计算是否有点赞
      tags: [],
      searchResults: []
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
    getArticleLikedId(state, articleLiked) {
      state.articleLikedId = articleLiked;
    },
    initArticle(state) {
      state.article = {};
    },
    initTag(state, tags) {
      state.tags = tags;
    },
    changeSearchResults(state, searchResults) {
      state.searchResults = searchResults;
      console.log(state.searchResults);
    },
    clearResults(state) {
      state.searchResults = [];
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
        Msg.showFail('获取文章列表失败');
      }
    },
    async refreshLikeAction({ commit, rootState }) {
      const userId = rootState.u.userInfo.id;
      const res = await getLiked(userId);
      res.code === '0' && commit('getArticleLikedId', res.data.articleLiked);
    },
    async getDetailAction({ commit, dispatch }, articleId) {
      const res1 = await addView(articleId);
      if (res1.code === '0') {
        const res2 = await getDetail(articleId);
        if (res2.code === '0') {
          commit('getDetail', res2.data);
          dispatch('c/getCommentAction', articleId, { root: true });
        } else {
          Msg.showFail('获取文章详情失败');
        }
      } else {
        Msg.showFail('浏览量增加失败');
      }
    },
    async likeAction({ dispatch }, articleId) {
      const res = await likeArticle(articleId);
      if (res.code === '0') {
        dispatch('getListAction');
        Msg.showSuccess('已点赞文章');
      } else {
        dispatch('getListAction');
        Msg.showInfo('已取消点赞文章');
      }
    },
    async editAction({ dispatch }, payload) {
      const { title, content, tags } = payload;
      const res1 = await createArticle(title, content);
      if (res1.code === '0') {
        const articleId = res1.data.insertId;
        if (tags.length) {
          const res2 = await addTags(articleId, tags);
          res2.code === '0' && Msg.showSuccess('添加标签成功');
        }
        router.replace(`/article/${articleId}`);
        dispatch('getDetailAction', articleId);
        Msg.showSuccess('发布文章成功');
      } else {
        console.log(res);
        Msg.showFail('发布文章失败');
      }
    },
    async updateAction({}, payload) {
      console.log('updateAction!!!!!!!', payload);
      const { beforeEditTags, tags } = payload;
      if (beforeEditTags !== tags) {
        console.log('要修改tags');
      } else {
        console.log('不用修改tags');
      }
      // const res = await updateArticle(payload);
      // if (res.code === '0') {
      // Msg.showSuccess('修改文章成功');
      //   const { articleId } = payload;
      //   router.push({ path: `/article/${articleId}` });
      // } else {
      //   Msg.showFail('修改文章失败');
      //   console.log(res);
      // }
    },
    async removeAction({ state }, articleId) {
      const res = await removeArticle(articleId);
      if (res.code === '0') {
        Msg.showSuccess('删除文章成功');
        state.articles.length ? router.push({ path: `/article` }) : router.go(0);
      } else {
        console.log(res);
        Msg.showFail('删除文章失败');
      }
    },
    async getTagsAction({ commit }) {
      const res = await getTags();
      res.code === '0' && commit('initTag', res.data);
    },
    async searchAction({ commit }, keywords) {
      const res = await search(keywords);
      res.code === '0' && commit('changeSearchResults', res.data);
    }
  }
};
