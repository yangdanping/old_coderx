<template>
  <el-tabs tab-position="right" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="综合" name="综合"></el-tab-pane>
    <el-tab-pane v-for="item in tags" :key="tags.id" :data-id="tags.id" :label="item.name" :name="item.name"></el-tab-pane>
  </el-tabs>
</template>

<script>
import { eventBus } from '@/utils';
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
  mounted() {
    eventBus.$on('changeTag', ({ id, name }) => {
      console.log('tagId!!!!!!!!!!!!!!!', id);
      this.activeName = name;
      this.$store.commit('changeTag', id);
      this.$store.dispatch('a/getListAction');
    });
  },
  computed: {
    ...mapState({ tags: (state) => state.a.tags })
  },
  methods: {
    handleClick(tab, e) {
      if (tab.index) {
        console.log('handleClick!!!!', tab);
        this.$store.commit('initPage');
        if (tab.index === '0') {
          tab.index = '';
        }
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
    padding: 0 20px;
    text-align: center;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #fff;
  }

  ::v-deep .el-tabs__active-bar {
    padding: 0 80px;
    z-index: -99;
  }
}
</style>
