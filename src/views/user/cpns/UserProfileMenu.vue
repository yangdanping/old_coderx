<template>
  <div class="user-profile-menu">
    <el-tabs class="user-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="1">
        <UserArticle />
      </el-tab-pane>
      <el-tab-pane label="回答" name="2">
        <UserComment />
      </el-tab-pane>
      <el-tab-pane label="收藏" name="3">
        <UserCollect />
      </el-tab-pane>
      <el-tab-pane label="关注" name="4">
        <UserFollow />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserArticle from './UserArticle.vue';
import UserCollect from './UserCollect.vue';
import UserComment from './UserComment.vue';
import UserFollow from './UserFollow.vue';
export default {
  name: 'UserProfileMenu',
  data() {
    return {
      activeName: '1'
    };
  },
  components: { UserArticle, UserComment, UserCollect, UserFollow },
  methods: {
    handleClick(tab, event) {
      this.$emit('tabClick', tab.name);
    }
  }
};
</script>

<style lang="less" scoped>
.user-tabs {
  ::v-deep .el-tabs__item {
    font-size: 20px;
    width: 300px;
    text-align: center;
  }
}
</style>
