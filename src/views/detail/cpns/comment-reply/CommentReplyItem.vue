<template>
  <div class="reply" :key="item.id">
    <avatar :info="item.user" :size="35" />
    <div class="reply-box">
      <div class="user-info-box">
        <span class="name">{{ item.user.name }}</span>
        <el-tag v-if="isAuthor(item.user.id)" color size="small">作者</el-tag>
        <span>回复:</span><span class="name">{{ fatherComment.user.name }}</span>
        <span class="created">{{ item.createAt }}</span>
      </div>
      <div class="reply-content">
        <p v-html="item.content"></p>
        <comment-action :comment="item" />
      </div>
      <comment-form v-if="replythis(item.id)" :commentId="commentId" />
      <comment-child-reply v-if="childReply(item)" :replyInfo="childReply(item)" />
    </div>
    <comment-tools :editData="item.content" :commentId="item.id" :userId="item.user.id" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
import CommentTools from '../comment/CommentTools.vue';
import CommentAction from '../comment/CommentAction.vue';
import CommentForm from '../comment/CommentForm.vue';
import CommentChildReply from '../comment-child-reply/CommentChildReply.vue';
export default {
  name: 'CommentReplyItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    fatherComment: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isReply: false,
      commentId: '',
      userId: ''
    };
  },
  mounted() {
    eventBus.$on('collapse', (commentId) => {
      if (commentId) {
        eventBus.$emit('collapseReply', null); //把其他所有打开的子评论折叠
        this.commentId = commentId; //每次点击回复传来的commentId,而watch监控了这个commentId,当该form为打开状态时点击其他回复(旧值有,新旧值不同且!this.isReply为true),则折叠其他form,并打开这个form
        this.isReply = !this.isReply; //一点击isReply就取反,isReply控制form的显示
        console.log('一点击isReply就取反,isReply控制编辑器的显示');
      } else {
        this.commentId = commentId;
      }
    });
  },
  watch: {
    commentId(newV, oldV) {
      if (oldV !== '' && newV !== oldV && !this.isReply) {
        this.isReply = !this.isReply; //折叠其他form,并打开这个form
      }
    }
  },
  computed: {
    ...mapGetters({ isAuthor: 'a/isAuthor' }),
    replythis() {
      return (itemId) => (this.commentId !== itemId ? false : this.isReply);
    },
    childReply() {
      return (comment) => comment.replyInfo;
    }
  },
  components: { Avatar, CommentTools, CommentAction, CommentForm, CommentChildReply },
  methods: {}
};
</script>

<style lang="less" scoped>
.reply {
  display: flex;
  background-color: rgba(247, 248, 250, 0.7);
  padding: 15px 15px;
  .reply-box {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    width: 100%;
    .user-info-box {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-right: 8px;
      }
      .name {
        font-weight: 700;
        font-size: 15px;
      }
      .created {
        font-size: 13px;
      }
    }
    .reply-content {
      display: flex;
      flex-direction: column;
      p {
        margin-bottom: 12px;
      }
    }
  }
}
.reply:hover {
  .comment-tools {
    display: block;
  }
}
@media screen and (max-width: 760px) {
  .comment-tools {
    display: block;
  }
}
</style>
