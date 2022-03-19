<template>
  <div class="comment-tools">
    <el-dropdown trigger="click" @command="handleCommand">
      <i class="el-icon-more"></i>
      <template v-if="isUser(userId)">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showDiglog">
            <i class="el-icon-edit">修改</i>
            <el-dialog width="50%" title="修改我的评论" :visible.sync="dialogVisible" append-to-body>
              <Editor @onListen="onListen" :editComment="editData" :isComment="true" :height="190" />
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
          <el-dropdown-item @click.native="showReport = true">
            <i class="el-icon-warning-outline">举报</i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <report-dialog @submit="submitReport" @cancel="cancelReport" :show="showReport" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Editor from '@/components/editor/Editor.vue';
import ReportDialog from '@/components/dialog/ReportDialog.vue';
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
  data() {
    return {
      dialogVisible: false,
      content: '',
      showReport: false
      // reportOptions: [],
      // otherReport: '',
      // reportList: ['垃圾广告', '辱骂攻击', '涉嫌违法犯罪', '时政信息不实']
    };
  },
  computed: {
    ...mapState({ article: (state) => state.a.article }),
    ...mapGetters({ isUser: 'u/isUser' })
  },
  components: { Editor, ReportDialog },
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
      this.$confirm(`是否删除评论`, '提示', {
        confirmButtonText: `删除`,
        cancelButtonText: `取消`,
        type: 'info'
      }).then(() => {
        this.$store.dispatch('c/removeCommentAction', { articleId: this.article.id, commentId: this.commentId });
      });
    },
    //举报
    submitReport(reportOptions, otherReport) {
      if (reportOptions.length) {
        otherReport && reportOptions.push(otherReport);
        const report = { commentId: this.commentId, reportOptions };
        this.$store.dispatch('u/reportAction', { userId: this.userId, report });
        this.showReport = false;
      } else {
        this.$showInfo('您没有提交任何举报信息');
        this.showReport = false;
      }
    },
    cancelReport() {
      this.showReport = !this.showReport;
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
