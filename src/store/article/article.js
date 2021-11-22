import { createArticle, getList, getDetail, getComment, getLiked, likeArticle, updateArticle, addComment, updateComment } from '@/network/article/article.request.js';
import router from '@/router'; //拿到router对象,进行路由跳转(.push)
import timeFormat from '@/utils/format';
import showMsg from '@/utils/showMsg';
export default {
  namespaced: true,
  state: {
    articles: [],
    article: '',
    commentInfo: '',
    total: null,
    pageNum: 1,
    pageSize: 5,
    isLiked: false,
    likedId: [] //获取该用户点赞过的文章id,通过computed计算是否有点赞
  },
  mutations: {
    getListMutation(state, payload) {
      const { data, total } = payload;
      data.forEach((article) => (article.updateAt = timeFormat(article.updateAt)));
      state.articles = data;
      state.total = total;
    },
    getDetail(state, article) {
      article.updateAt = timeFormat(article.updateAt);
      state.article = article;
    },
    getCommentInfo(state, commentInfo) {
      commentInfo.forEach((comment) => (comment.updateAt = timeFormat(comment.updateAt)));
      state.commentInfo = commentInfo;
    },
    changePageNum(state, newPageNum) {
      state.pageNum = newPageNum; //改变页数
    },
    changePageSize(state, newPageSize) {
      state.pageSize = newPageSize; //改变每页显示条目个数
    },
    getLikedId(state, payload) {
      state.likedId = payload;
    },
    changeLike(state) {
      state.isLiked = !state.isLiked;
    }
  },
  actions: {
    async getListAction({ commit, state, rootState }) {
      // 1.获取文章列表信息以及文章数
      const res1 = await getList(state.pageNum, state.pageSize);
      if (res1.statusCode) {
        commit('getListMutation', { ...res1 });
      }
      // 2.若用户登陆获取登陆用户点赞过哪些文章
      if (rootState.l.userInfo.id) {
        const userId = rootState.l.userInfo.id;
        const res2 = await getLiked(userId);
        if (res2.statusCode) {
          commit('getLikedId', res2.data.liked);
        }
      }
    },
    async getDetailAction({ commit }, articleId) {
      const res1 = await getDetail(articleId);
      if (res1.statusCode) {
        commit('getDetail', res1.data);
      }
      const res2 = await getComment(articleId);
      if (res2.statusCode) {
        commit('getCommentInfo', res2.data);
      }
    },
    async likeAction({ commit, dispatch }, articleId) {
      console.log('点赞的文章id:', articleId);
      const res = await likeArticle(articleId);
      console.log(res);
      if (res.statusCode) {
        commit('changeLike');
        dispatch('getListAction');
        showMsg(1, '点赞文章成功');
      } else {
        commit('changeLike');
        dispatch('getListAction');
        showMsg(1, '取消点赞成功');
      }
    },
    async editAction({ commit }, payload) {
      const res = await createArticle(payload);
      if (res.statusCode) {
        console.log(res);
        showMsg(1, '发布文章成功!');
      } else {
        console.log(res);
        showMsg(3, '发布文章失败!');
      }
    },
    async updateAction({ commit }, payload) {
      const res = await updateArticle(payload);
      if (res.statusCode) {
        showMsg(1, '修改文章成功!');
        const { articleId } = payload;
        router.push({ path: `/article/${articleId}` });
      } else {
        showMsg(3, '修改文章失败!');
        console.log(res);
      }
    },
    // 评论相关
    async commentAction({ commit }, payload) {
      const res1 = await addComment(payload);
      if (res1.statusCode) {
        showMsg(1, '发表评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.statusCode ? commit('getCommentInfo', res2.data) : showMsg(3, '获取评论列表失败');
      } else {
        showMsg(3, '发表评论失败');
      }
    },
    async updateCommentAction({ commit }, payload) {
      const res1 = await updateComment(payload);
      if (res1.statusCode) {
        showMsg(1, '修改评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.statusCode ? commit('getCommentInfo', res2.data) : showMsg(3, '获取评论列表失败');
      } else {
        showMsg(3, '修改评论失败');
      }
    }
  }
};
