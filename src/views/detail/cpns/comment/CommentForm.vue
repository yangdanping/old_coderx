<template>
  <div class="comment-form">
    <avatar :info="userInfo" />
    <div class="input">
      <editor @onListen="onListen" :isComment="true" height="100%" />
      <div class="input-action">
        <el-button :disabled="disabled" @click="addComment" type="primary">{{ disabled ? '提交中' : '发表评论' }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Avatar from '@/components/avatar/Avatar.vue';
import Editor from '@/components/editor/Editor.vue';
export default {
  name: 'CommentForm',
  props: {
    commentId: {
      type: Number
    },
    isReply: {
      type: Boolean
    },
    replyId: {
      type: Number
    }
  },
  data() {
    return {
      content: '',
      showDialog: false,
      disabled: false
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.u.userInfo,
      article: (state) => state.a.article
    })
  },
  components: { Avatar, Editor },
  methods: {
    onListen(content) {
      this.content = content;
    },
    addComment() {
      if (!this.content || this.content === '<p></p>') {
        this.$msg(2, '评论内容不能为空');
      } else {
        this.disabled = !this.disabled;
        setTimeout(() => {
          // 这里的isReplyComment用作判断是否是对回复用户的回复,真正传入数据库的是当前真实回复的用户
          this.$store.dispatch('c/commentAction', {
            content: this.content,
            articleId: this.article.id,
            isReplyToComment: this.isReply ?? false,
            commentId: this.commentId ?? null,
            replyId: this.replyId ?? null
          });
          this.disabled = !this.disabled;
        }, 500);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comment-form {
  display: flex;
  justify-content: center;
  padding: 20 0;
  margin-bottom: 80px;
  .input {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    .input-action {
      position: absolute;
      bottom: -50px;
      left: 0;
    }
  }
}
</style>
