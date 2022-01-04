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
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    return {};
  },
  computed: {
    // this.$route拿到的是我们当前处于活跃状态的路由
    ...mapState({
      isLogin: (state) => state.u.token
    })
  },
  components: {},
  methods: {
    goBack() {
      this.$router.push('/article');
    },
    goEdit() {
      const id = this.article.id;
      const title = this.article.title;
      const content = this.article.content;
      this.$router.push({
        path: '/edit',
        query: {
          editData: { id, title, content }
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
  .el-icon-delete {
    cursor: pointer;
    transition: all 0.3s;
    margin-left: 25px;
  }
  .el-icon-edit:hover,
  .el-icon-back:hover,
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
}
</style>
