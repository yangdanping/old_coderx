<template>
  <div class="article-nav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="综合" name="综合"></el-tab-pane>
      <el-tab-pane v-for="item in tags" :key="tags.name" :label="item.name" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ArticleNav',
  data() {
    return {
      activeName: '综合'
    };
  },
  created() {
    this.$store.dispatch('a/getTagsAction');
  },
  components: {},
  computed: {
    ...mapState({
      tags: (state) => state.a.tags
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.el-tabs {
  ::v-deep .el-tabs__content {
    display: none;
  }
  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
  ::v-deep .el-tabs__item {
    font-size: 20px;
    width: 150px;
    text-align: center;
  }
}
</style>
