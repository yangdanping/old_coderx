<template>
  <el-tabs tab-position="right" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="综合" name="综合"></el-tab-pane>
    <el-tab-pane v-for="item in tags" :key="tags.id" :data-id="tags.id" :label="item.name" :name="item.name"></el-tab-pane>
  </el-tabs>
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
  computed: {
    ...mapState({ tags: (state) => state.a.tags })
  },
  methods: {
    handleClick(tab, e) {
      if (parseInt(tab.index)) {
        this.$store.commit('initPage');
        this.$store.commit('changeTag', tab.index);
        this.$store.dispatch('a/getListAction');
      } else {
        this.$store.commit('initPage');
        this.$store.dispatch('a/getListAction');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-tabs {
  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    background: #fafafa;
    border-radius: 10px;
    overflow: hidden;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    position: static !important;
  }
  ::v-deep .el-tabs__item {
    font-size: 18px;
    width: 80px;
    text-align: center;
  }
  ::v-deep .el-tabs__item.is-active {
    color: #fff;
  }
  ::v-deep .el-tabs__active-bar {
    width: 80px;
    z-index: -99;
  }
}
</style>
