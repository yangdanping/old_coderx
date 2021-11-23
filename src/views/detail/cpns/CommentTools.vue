<template>
  <div>
    <template v-if="isUser">
      <el-tooltip class="item" effect="dark" content="修改我的评论" placement="bottom">
        <i @click="showDiglog" class="el-icon-edit"></i>
      </el-tooltip>
      <el-dialog width="750px" title="修改我的评论" :visible.sync="dialogVisible">
        <editor @onListen="onListen" :editComment="editData" :isComment="true" :height="190" :width="700" />
        <el-button class="update" @click="update" type="primary">修改</el-button>
      </el-dialog>
      <el-tooltip class="item" effect="dark" content="删除我的评论" placement="bottom">
        <i @click="remove" class="el-icon-delete"></i>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Editor from '@/components/editor/Editor.vue';
export default {
  name: 'CommentTools',
  props: {
    editData: {
      type: String,
      default: ''
    },
    userId: {
      type: Number
    },
    commentId: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.l.token, //根据是否有token判断是否登陆(授权)
      userInfo: (state) => state.l.userInfo,
      article: (state) => state.a.article
    }),
    isUser() {
      return this.isLogin && this.userId === this.userInfo.id;
    }
  },
  data() {
    return {
      dialogVisible: false,
      content: ''
    };
  },
  components: { Editor },
  methods: {
    showDiglog() {
      this.dialogVisible = !this.dialogVisible;
    },
    onListen(content) {
      this.content = content;
    },
    update() {
      this.$store.dispatch('a/updateCommentAction', { articleId: this.article.id, commentId: this.commentId, content: this.content });
      this.dialogVisible = !this.dialogVisible;
    },
    remove() {
      this.$confirm(`是否删除评论`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: `删除`,
        cancelButtonText: `取消`,
        type: 'info'
      })
        .then(() => {
          this.$store.dispatch('a/removeCommentAction', { articleId: this.article.id, commentId: this.commentId });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
.el-icon-delete,
.el-icon-edit {
  cursor: pointer;
  font-size: 24px;
  margin-left: 15px;
}
.update {
  margin-top: 10px;
}
</style>
