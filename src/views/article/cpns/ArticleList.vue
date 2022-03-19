<template>
  <div class="article-list">
    <template v-for="item in articles">
      <ArticleList-item :item="item" />
    </template>
    <Page @changePage="changePage" :total="total" />
    <template v-if="!articles.length">
      <div class="skeleton"><el-skeleton animated /></div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleListItem from './ArticleListItem.vue';
import Page from '@/components/Page.vue';
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: [Array, Number],
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      total: (state) => state.a.total //文章总数
    })
  },
  components: { ArticleListItem, Page },
  methods: {
    changePage() {
      this.$store.dispatch('a/getListAction');
    }
  }
};
</script>

<style lang="less" scoped>
.article-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  border-radius: 10px;
  animation: moveDown 1s forwards;
}
// .article-list::before {
//   content: '';
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   background: var(--bg);
//   filter: blur(15px);
//   z-index: -1;
// }
</style>
