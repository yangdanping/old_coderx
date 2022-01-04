<template>
  <div class="comment-list-item" :key="item.id">
    <avatar :info="item.user" />
    <div class="comment-box">
      <div class="user-info-box">
        <div class="user-info">
          <span class="name">{{ item.user.name }}</span>
          <el-tag v-if="isAuthor(item.user.id)" color size="small">作者</el-tag>
        </div>
        <div class="floor">
          <span>{{ floor }}楼</span>
          <span>{{ item.createAt }}</span>
        </div>
      </div>
      <div class="comment-content">
        <div class="content" v-html="item.content"></div>
        <comment-action :comment="item" />
      </div>
      <comment-form v-if="replythis(item.id)" :commentId="commentId" :isReply="true" />
      <comment-reply :comment="item" />
      <!-- comment-reply里面也有comment-form -->
    </div>
    <comment-tools :editData="item.content" :commentId="item.id" :userId="item.user.id" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
import Editor from '@/components/editor/Editor.vue';
import CommentTools from './CommentTools.vue';
import CommentAction from './CommentAction.vue';
import CommentReply from '../comment-reply/CommentReply.vue';
import CommentForm from './CommentForm.vue';
export default {
  name: 'CommentListItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    floor: {
      type: Number
    }
  },
  data() {
    return {
      isReply: false,
      commentId: ''
    };
  },
  mounted() {
    eventBus.$on('collapse', (commentId) => {
      this.commentId = commentId;
      this.isReply = !this.isReply; //一点击isReply就取反
      console.log('一点击isReply就取反,isReply控制编辑器的显示');
    });
  },
  watch: {
    commentId(newV, oldV) {
      if (oldV !== '' && newV !== oldV && !this.isReply) {
        this.isReply = !this.isReply; //只有评论区某form处于打开情况下,点击其他回复才会来到这里,折叠其他form,并打开这个form
      }
    }
  },
  computed: {
    ...mapState({ commentInfo: (state) => state.c.commentInfo }),
    ...mapGetters({ isAuthor: 'a/isAuthor' }),
    replythis() {
      return (itemId) => (this.commentId !== itemId ? false : this.isReply);
    }
  },
  components: { Avatar, Editor, CommentTools, CommentAction, CommentReply, CommentForm },
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-list-item {
  position: relative;
  display: flex;
  margin-top: 30px;
  border-bottom: 1px solid #e5e6eb;
}
.comment-list-item:hover {
  .comment-tools {
    display: block;
  }
}
@media screen and (max-width: 760px) {
  .comment-tools {
    display: block;
  }
}

.comment-box {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
  .user-info-box {
    display: flex;
    flex-direction: column;
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      .name {
        font-weight: 700;
        font-size: 20px;
        margin-right: 8px;
      }
    }

    .floor span {
      margin-right: 12px;
    }
  }
}
.comment-content {
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    justify-content: left;
    padding: 20px 0;
  }
}
</style>
