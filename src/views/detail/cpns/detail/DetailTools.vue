<template>
  <div class="detail-tool">
    <el-tooltip class="item" effect="dark" content="返回文章列表" placement="bottom">
      <i @click="goBack" class="el-icon-back"></i>
    </el-tooltip>
    <template v-if="isLogin && isAuthor">
      <el-tooltip class="item" effect="dark" content="修改我的文章" placement="bottom">
        <i @click="goEdit" class="el-icon-edit"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除我的文章" placement="bottom">
        <i @click="goDelete" class="el-icon-delete"></i>
      </el-tooltip>
    </template>
    <template v-else-if="isLogin">
      <el-tooltip class="item" effect="dark" content="举报文章" placement="bottom">
        <i @click="showReport = true" class="el-icon-warning-outline"></i>
      </el-tooltip>
    </template>
    <report-dialog @submit="submitReport" @cancel="cancelReport" :show="showReport" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ReportDialog from '@/components/dialog/ReportDialog.vue';

export default {
  name: 'DetailTool',
  props: {
    isAuthor: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showReport: false
    };
  },
  computed: {
    // this.$route拿到的是我们当前处于活跃状态的路由
    ...mapState({
      isLogin: (state) => state.u.token
    })
  },
  components: { ReportDialog },
  methods: {
    goBack() {
      this.$router.push('/article');
    },
    //举报
    submitReport(reportOptions, otherReport) {
      if (reportOptions.length) {
        otherReport && reportOptions.push(otherReport);
        const report = { articleId: this.article.id, reportOptions };
        console.log('文章submitReport!!!!!!!!', report);
        this.$store.dispatch('u/reportAction', { userId: this.article.author.id, report });
        this.showReport = false;
      } else {
        this.$showInfo('您没有提交任何举报信息');
        this.showReport = false;
      }
    },
    cancelReport() {
      this.showReport = !this.showReport;
    },
    goEdit() {
      const id = this.article.id;
      const title = this.article.title;
      const content = this.article.content;
      const tags = this.article.tags;
      this.$router.push({
        path: '/edit',
        query: {
          editData: { id, title, content, tags }
        }
      });
    },
    goDelete() {
      this.$confirm(`是否删除文章`, '提示', {
        confirmButtonText: `删除`,
        cancelButtonText: `取消`,
        type: 'info'
      }).then(() => {
        this.$store.dispatch('a/removeAction', this.article.id);
        this.$router.replace('/article');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail-tool {
  display: flex;
  align-items: center;
  .el-icon-back,
  .el-icon-edit,
  .el-icon-warning-outline,
  .el-icon-delete {
    cursor: pointer;
    transition: all 0.3s;
    margin-left: 25px;
  }
  .el-icon-edit:hover,
  .el-icon-back:hover,
  .el-icon-warning-outline:hover,
  .el-icon-delete:hover {
    transform: translate(-6px, 0);
  }
  .el-icon-back {
    font-size: 40px;
  }
  .el-icon-edit {
    font-size: 30px;
  }
  .el-icon-delete {
    font-size: 30px;
  }
  .el-icon-warning-outline {
    font-size: 30px;
  }
}
</style>
