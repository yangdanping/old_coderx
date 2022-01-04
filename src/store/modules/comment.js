import { getComment, addComment, updateComment, removeComment, addReply, like } from '@/network/comment/comment.request.js';
import { getLiked } from '@/network/user/user.request.js';
import { showMsg, timeFormat, eventBus } from '@/utils';
export default {
  namespaced: true,
  state() {
    return {
      commentInfo: [],
      replyInfo: [],
      commentLikedId: [] //该用户点赞过的评论id,通过computed计算是否有点赞
    };
  },
  getters: {
    isCommentUserLiked(state) {
      return (commentId) => {
        return { liked: state.commentLikedId.some((id) => id === commentId) };
      };
    },
    commentReply(state) {
      return (comment) => state.replyInfo.filter((reply) => reply.commentId === comment.id);
    },
    commentReplyCount(state, getters) {
      return (comment) => {
        const totalChildReply = [];
        getters.commentReply(comment).forEach((reply) => (reply.replyInfo ? totalChildReply.push(...reply.replyInfo) : null));
        const count = getters.commentReply(comment).length + totalChildReply.length;
        return count ? count : '回复'; //若没点击回复按钮,则显示评论数或回复
      };
    }
  },
  mutations: {
    getCommentInfo(state, commentInfo) {
      commentInfo.forEach((comment) => (comment.createAt = timeFormat(comment.createAt)));
      state.commentInfo = commentInfo.filter((comment) => !comment.commentId);
      state.replyInfo = commentInfo.filter((comment) => comment.commentId);
      state.replyInfo.forEach((reply) => (reply.replyInfo ? reply.replyInfo.forEach((childReply) => (childReply.createAt = timeFormat(childReply.createAt))) : null));
    },
    getCommentLikedId(state, payload) {
      const { commentLiked } = payload;
      state.commentLikedId = commentLiked;
    }
  },
  actions: {
    async getCommentAction({ commit, dispatch }, articleId) {
      // 1.获取文章的评论列表信息
      console.log(articleId);
      const res = await getComment(articleId);
      res.code === '0' ? commit('getCommentInfo', res.data) : showMsg(3, '获取文章评论失败');
      // 2.若用户登录获取登录用户点赞过哪些评论
      dispatch('refreshLikeAction');
    },
    async refreshLikeAction({ commit, rootState }) {
      const userId = rootState.u.userInfo.id;
      const res = await getLiked(userId);
      res.code === '0' && commit('getCommentLikedId', res.data); //重新获取评论数据
    },
    async commentAction({ commit, dispatch }, payload) {
      const { articleId, commentId, replyId } = payload;
      if (!commentId && !replyId) {
        console.log('我是一条即将发出的对文章的普通评论');
        const res = await addComment(payload);
        if (res.code === '0') {
          eventBus.$emit('cleanContent');
          showMsg(1, '发表评论成功');
          dispatch('getCommentAction', articleId);
        } else {
          showMsg(3, '发表评论失败');
        }
      } else {
        const res = await addReply(payload);
        if (res.code === '0') {
          eventBus.$emit('cleanContent');
          eventBus.$emit('collapse', null); //关闭评论框
          eventBus.$emit('collapseReply', null); //关评论框闭
          showMsg(1, '发表回复成功');
          dispatch('getCommentAction', articleId);
        } else {
          showMsg(3, '发表回复失败');
        }
      }
    },
    async updateCommentAction({ commit }, payload) {
      const res1 = await updateComment(payload);
      if (res1.code === '0') {
        showMsg(1, '修改评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.code === '0' ? commit('getCommentInfo', res2.data) : showMsg(3, '获取评论列表失败');
      } else {
        showMsg(3, '修改评论失败');
      }
    },
    async removeCommentAction({ commit }, payload) {
      const { commentId } = payload;
      const res1 = await removeComment(commentId);
      if (res1.code === '0') {
        showMsg(1, '删除评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.code === '0' ? commit('getCommentInfo', res2.data) : showMsg(3, '获取评论列表失败');
      } else {
        showMsg(3, '删除评论失败');
      }
    },
    async likeAction({ dispatch }, payload) {
      const { articleId } = payload;
      const res = await like(payload);
      if (res.code === '0') {
        dispatch('getCommentAction', articleId);
        showMsg(1, '点赞评论成功');
      } else {
        dispatch('getCommentAction', articleId);
        showMsg(1, '取消点赞成功');
      }
    }
  }
};
