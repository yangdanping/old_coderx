<template>
  <div class="detail-tool">
    <el-tooltip class="item" effect="dark" content="返回文章列表" placement="bottom">
      <i @click="goBack" class="el-icon-back"></i>
    </el-tooltip>
    <template v-if="isLogin && article.author.id === userInfo.id">
      <el-tooltip class="item" effect="dark" content="修改我的文章" placement="bottom">
        <i @click="goEdit" class="el-icon-edit"></i>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DetailTool',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.l.token, //根据是否有token判断是否登陆(授权)
      userInfo: (state) => state.l.userInfo
    })
  },
  components: {},
  methods: {
    goBack() {
      this.$router.back();
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
    }
  }
};
</script>

<style lang="less" scoped>
.detail-tool {
  display: flex;
  align-items: center;
  .el-icon-back {
    font-size: 40px;
    margin-left: 20px;
    cursor: pointer;
  }
  .el-icon-edit {
    margin-left: 30px;
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
