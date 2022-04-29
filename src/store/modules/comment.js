import { getComment, addComment, updateComment, removeComment, addReply, like } from '@/service/comment/comment.request.js';
import { getLiked } from '@/service/user/user.request.js';
import { timeFormat, eventBus, Msg } from '@/utils';
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
    getCommentLikedId(state, commentLiked) {
      state.commentLikedId = commentLiked;
      console.log(state.commentLikedId);
    },
    initComment(state) {
      state.commentInfo = [];
      state.replyInfo = [];
    }
  },
  actions: {
    async getCommentAction({ commit, dispatch }, articleId) {
      // 1.获取文章的评论列表信息
      console.log(articleId);
      const res = await getComment(articleId);
      res.code === 0 ? commit('getCommentInfo', res.data) : Msg.showFail('获取文章评论失败');
      // 2.若用户登录获取登录用户点赞过哪些评论
      dispatch('refreshLikeAction');
    },
    async refreshLikeAction({ commit, rootState }) {
      const userId = rootState.u.userInfo.id;
      const res = await getLiked(userId);
      res.code === 0 && commit('getCommentLikedId', res.data.commentLiked); //重新获取评论数据
    },
    async commentAction({ dispatch }, payload) {
      const { articleId, commentId, replyId } = payload;
      if (!commentId && !replyId) {
        console.log('我是一条即将发出的对文章的普通评论');
        const res = await addComment(payload);
        if (res.code === -1) {
          Msg.showFail(`发布评论失败 ${res.msg}`);
        } else if (res.code === 0) {
          eventBus.$emit('cleanContent');
          Msg.showSuccess('发表评论成功');
          dispatch('getCommentAction', articleId);
        } else {
          Msg.showFail('发表评论失败');
        }
      } else {
        const res = await addReply(payload);
        if (res.code === -1) {
          Msg.showFail(`发布回复失败 ${res.msg}`);
        } else if (res.code === 0) {
          eventBus.$emit('cleanContent');
          eventBus.$emit('collapse', null); //关闭评论框
          eventBus.$emit('collapseReply', null); //关评论框闭
          Msg.showSuccess('发表回复成功');
          dispatch('getCommentAction', articleId);
        } else {
          Msg.showFail('发表回复失败');
        }
      }
    },
    async updateCommentAction({ commit }, payload) {
      const res1 = await updateComment(payload);
      if (res1.code === 0) {
        Msg.showSuccess('修改评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.code === 0 ? commit('getCommentInfo', res2.data) : Msg.showFail('获取评论列表失败');
      } else {
        Msg.showFail('修改评论失败');
      }
    },
    async removeCommentAction({ commit }, payload) {
      const { commentId } = payload;
      const res1 = await removeComment(commentId);
      if (res1.code === 0) {
        Msg.showSuccess('删除评论成功');
        const { articleId } = payload;
        const res2 = await getComment(articleId); //重新获取评论数据
        res2.code === 0 ? commit('getCommentInfo', res2.data) : Msg.showFail('获取评论列表失败');
      } else {
        Msg.showFail('删除评论失败');
      }
    },
    async likeAction({ dispatch }, payload) {
      const { articleId } = payload;
      const res = await like(payload);
      if (res.code === 0) {
        dispatch('getCommentAction', articleId);
        Msg.showSuccess('点赞评论成功');
      } else {
        dispatch('getCommentAction', articleId);
        Msg.showSuccess('取消点赞成功');
      }
    }
  }
};
