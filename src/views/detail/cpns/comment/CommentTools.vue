<template>
  <div class="comment-tools">
    <el-dropdown trigger="click" @command="handleCommand">
      <i class="el-icon-more"></i>
      <template v-if="isUser">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showDiglog">
            <i class="el-icon-edit">修改</i>
            <el-dialog width="50vh" title="修改我的评论" :visible.sync="dialogVisible" append-to-body>
              <editor @onListen="onListen" :editComment="editData" :isComment="true" :height="190" />
              <el-button class="update" @click="update" type="primary">修改</el-button>
            </el-dialog>
          </el-dropdown-item>
          <el-dropdown-item command="remove">
            <i class="el-icon-delete">删除</i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
      <template v-else>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-warning-outline">举报</i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
      isLogin: (state) => state.u.token, //根据是否有token判断是否登录(授权)
      userInfo: (state) => state.u.userInfo,
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
    handleCommand(command) {
      command === 'showDiglog' ? this.showDiglog() : null;
      command === 'remove' ? this.remove() : null;
    },
    showDiglog() {
      this.dialogVisible = !this.dialogVisible;
    },
    onListen(content) {
      this.content = content;
    },
    update() {
      this.$store.dispatch('c/updateCommentAction', { articleId: this.article.id, commentId: this.commentId, content: this.content });
      this.dialogVisible = !this.dialogVisible;
    },
    remove() {
      console.log('remove');
      this.$confirm(`是否删除评论`, '提示', {
        confirmButtonText: `删除`,
        cancelButtonText: `取消`,
        type: 'info'
      }).then(() => {
        this.$store.dispatch('c/removeCommentAction', { articleId: this.article.id, commentId: this.commentId });
      });
    }
  }
};
</script>

<style lang="less">
.comment-tools {
  display: none;
  position: absolute;
  right: 10px;
  .el-icon-more {
    cursor: pointer;
    font-size: 20px;
  }
}
.update {
  margin-top: 10px;
}
</style>
