<template>
  <div class="child-reply-item">
    <div class="child-reply-box">
      <Avatar :info="reply.user" :size="28"></Avatar>
      <div class="user-info-box">
        <span class="name"> {{ reply.user.name }}</span>
        <el-tag v-if="isAuthor(reply.user.id)" color size="small">作者</el-tag>
        <template v-if="reply.replyId">
          <span class="reply">回复:</span><span class="name">{{ childReply(reply.replyId).user.name }}</span>
          <el-tag v-if="isAuthor(childReply(reply.replyId).user.id)" color size="small">作者</el-tag>
        </template>
        <span class="created">{{ reply.createAt }}</span>
      </div>
    </div>
    <div class="reply-content">
      <p v-html="reply.content"></p>
      <child-reply-action :reply="reply" />
    </div>
    <CommentForm v-if="replythis(reply.id)" :commentId="reply.fatherComment" :replyId="reply.id" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
import CommentForm from '../comment/CommentForm.vue';
import ChildReplyAction from './ChildReplyAction.vue';

export default {
  name: 'ChildReplyItem',
  props: {
    replyInfo: {
      type: Array,
      default: () => []
    },
    reply: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isReply: false,
      replyId: ''
    };
  },
  mounted() {
    eventBus.$on('collapseReply', (replyId) => {
      if (replyId) {
        eventBus.$emit('collapse', null); //把其他所有打开的父评论除去
        this.replyId = replyId; //每次点击回复传来的replyId,而watch监控了这个replyId,当该form为打开状态时点击其他回复(旧值有,新旧值不同且!this.isReply为true),则折叠其他form,并打开这个form
        this.isReply = !this.isReply; //一点击isReply就取反,isReply控制form的显示
      } else {
        this.replyId = replyId; //此时this.replyId为传入的null
      }
    });
  },
  watch: {
    replyId(newV, oldV) {
      if (oldV !== '' && newV !== oldV && !this.isReply) {
        this.isReply = !this.isReply; //折叠其他form,并打开这个form
      }
    }
  },
  computed: {
    ...mapGetters({ isAuthor: 'a/isAuthor' }),
    // 若是对回复的回复
    childReply() {
      return (byReplyId) => this.replyInfo.find((reply) => reply.id === byReplyId);
    },
    replythis() {
      return (itemId) => (this.replyId !== itemId ? false : this.isReply);
    }
  },
  components: { Avatar, CommentForm, ChildReplyAction },
  methods: {}
};
</script>

<style lang="less" scoped>
.child-reply-item {
  padding: 8px 0 0 8px;
  .child-reply-box {
    display: flex;
    align-items: center;
    .user-info-box {
      display: flex;
      align-items: center;
      margin-left: 8px;
      span {
        margin-right: 8px;
      }
      .name {
        font-weight: 700;
        font-size: 15px;
      }
      .reply,
      .created {
        font-size: 10px;
      }
    }
  }
  .reply-content {
    display: flex;
    flex-direction: column;
    p {
      margin-bottom: 15px;
    }
  }
}
</style>
