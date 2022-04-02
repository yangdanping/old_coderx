<template>
  <ActionList :isComment="true">
    <template #comment>
      <ul class="comment-action">
        <li @click="likeComment(comment.id)" class="item like" :class="isLiked(comment.id)">
          <i></i><span>{{ comment.likes ?? '点赞' }}</span>
        </li>
        <li @click="wantReply(comment.id)" class="item comment">
          <i></i><span>{{ commentReplyCount(comment) }}</span>
          <!-- <i></i><span>{{ !showmsg ? hasComment : '取消回复' }}</span> -->
        </li>
      </ul>
    </template>
  </ActionList>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { eventBus, Msg } from '@/utils';
import ActionList from '@/components/action/ActionList.vue';

export default {
  name: 'CommentAction',
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.u.token, //根据是否有token判断是否登录(授权)
      article: (state) => state.a.article,
      commentLikedId: (state) => state.a.commentLikedId
    }),
    ...mapGetters({ isLiked: 'c/isCommentUserLiked', commentReplyCount: 'c/commentReplyCount' })
  },
  components: { ActionList },
  methods: {
    wantReply(commentId) {
      if (this.isLogin) {
        eventBus.$emit('collapse', commentId); //commentId非常重要,控制编辑器的切换
      } else {
        this.$showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    },
    likeComment(commentId) {
      if (this.isLogin) {
        this.$store.dispatch('c/likeAction', { commentId, articleId: this.article.id });
      } else {
        this.$showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
