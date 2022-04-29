import router from '@/router'; //拿到router对象,进行路由跳转(.push)
import { timeFormat, Msg, isArrEqual } from '@/utils';
import { createArticle, getList, getDetail, likeArticle, updateArticle, removeArticle, addView, getTags, changeTags, search } from '@/service/article/article.request.js';
import { addPictureForArticle } from '@/service/file/file.request.js';
import { getLiked } from '@/service/user/user.request.js';

export default {
  namespaced: true,
  state() {
    return {
      articles: null,
      article: {},
      articleLikedId: [], //该用户点赞过的文章id,通过computed计算是否有点赞
      tags: [],
      searchResults: [],
      uploaded: []
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
      payload.result.forEach((article) => (article.createAt = timeFormat(article.createAt)));
      state.articles = payload;
      console.log('getListMutation', state.articles);
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
    },
    changeUploaded(state, imgId) {
      if (imgId) {
        state.uploaded.push(imgId);
      } else {
        state.uploaded = [];
        console.log('changeUploaded已清0!!!!!!!!!!!!!!!!');
      }
    }
  },
  actions: {
    async getListAction({ commit, rootState, dispatch }) {
      const res = await getList(rootState.pageNum, rootState.pageSize, rootState.tagId); //获取文章列表信息以及文章数
      if (res.code === 0) {
        commit('getListMutation', res.data);
        const userId = rootState.u.userInfo.id;
        userId && dispatch('refreshLikeAction'); //若用户登录获取登录用户点赞过哪些文章
        window.scrollTo(0, 0);
      } else {
        Msg.showFail('获取文章列表失败');
      }
    },
    async refreshLikeAction({ commit, rootState }) {
      const userId = rootState.u.userInfo.id;
      const res = await getLiked(userId);
      console.log(res);
      res.code === 0 && commit('getArticleLikedId', res.data.articleLiked);
    },
    async getDetailAction({ commit, dispatch }, articleId) {
      const res1 = await addView(articleId);
      if (res1.code === 0) {
        const res2 = await getDetail(articleId);
        if (res2.code === 0) {
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
      console.log('likeAction!!!!', res);
      if (res.code === -1) {
        Msg.showFail(`点赞失败 ${res.msg}`);
      } else if (res.code === 0) {
        dispatch('getListAction');
        Msg.showSuccess('已点赞文章');
      } else {
        dispatch('getListAction');
        Msg.showInfo('已取消点赞文章');
      }
    },
    async editAction({ dispatch, commit, state }, payload) {
      const { title, content, tags } = payload;
      const res = await createArticle(title, content);
      console.log('editAction!!!!!!', res);
      if (res.code === -1) {
        Msg.showFail(`发布文章失败 ${res.msg}`);
      } else if (res.code === 0) {
        const articleId = res.data.insertId;
        if (state.uploaded.length) {
          console.log(`articleId为${articleId}的文章已创建,要为该文章添加以下图片id`, state.uploaded);
          const res = await addPictureForArticle(articleId, state.uploaded);
          res.code === 0 && console.log(`id为${articleId}的文章成功添加${res.data.affectedRows}张图片`);
          commit('changeUploaded', 0);
        }
        if (tags.length) {
          const res = await changeTags(articleId, tags);
          res.code === 0 && Msg.showSuccess('添加标签成功');
        }
        router.replace(`/article/${articleId}`);
        dispatch('getDetailAction', articleId);
        Msg.showSuccess('发布文章成功');
      } else {
        Msg.showFail('发布文章失败');
      }
    },
    async updateAction({ state, commit }, payload) {
      console.log('我要修改文章!!!!!!!!!!!!!', payload);
      const { articleId, title, content, oldTags, tags } = payload;
      if (!isArrEqual(oldTags, tags)) {
        console.log('新旧tags不相同,要修改');
        const res = await changeTags(articleId, tags, true);
        res.code === 0 && Msg.showSuccess('修改标签成功');
      } else {
        console.log('新旧tags相同,不修改');
      }
      const res = await updateArticle(articleId, title, content);
      if (res.code === 0) {
        //若新增了图片
        if (state.uploaded.length) {
          console.log(`articleId为${articleId}的文章已创建,要为该文章添加以下图片id`, state.uploaded);
          const res = await addPictureForArticle(articleId, state.uploaded);
          res.code === 0 && console.log(`id为${articleId}的文章成功添加${res.data.affectedRows}张图片`);
          commit('changeUploaded', 0);
        }
        Msg.showSuccess('修改文章成功');
        router.push({ path: `/article/${articleId}` });
      } else {
        Msg.showFail('修改文章失败');
        console.log(res);
      }
    },
    async removeAction({ state }, articleId) {
      const res = await removeArticle(articleId);
      if (res.code === 0) {
        Msg.showSuccess('删除文章成功');
        state.articles.length ? router.push({ path: `/article` }) : router.go(0);
      } else {
        console.log(res);
        Msg.showFail('删除文章失败');
      }
    },
    async getTagsAction({ commit }) {
      const res = await getTags();
      res.code === 0 && commit('initTag', res.data);
    },
    async searchAction({ commit }, keywords) {
      const res = await search(keywords);
      res.code === 0 && commit('changeSearchResults', res.data);
    }
  }
};
