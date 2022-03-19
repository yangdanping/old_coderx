<template>
  <ActionList :isComment="true">
    <template #reply>
      <ul class="reply-action">
        <li @click="likeReply(reply.id)" class="item like">
          <i></i><span>{{ reply.likes ? reply.likes : '点赞' }}</span>
        </li>
        <li @click="wantReply(reply.id)" class="item comment"><i></i><span>回复</span></li>
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
    reply: {
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
      article: (state) => state.a.article
    })
  },
  components: { ActionList },
  methods: {
    wantReply(replyId) {
      if (this.isLogin) {
        eventBus.$emit('collapseReply', replyId); //replyId非常重要,控制编辑器的切换
      } else {
        this.$showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    },
    likeReply(replyId) {
      console.log(replyId);
      if (this.isLogin) {
        this.$store.dispatch('c/likeAction', { replyId, articleId: this.article.id });
      } else {
        this.$showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
