<template>
  <div class="article-list">
    <template v-for="item in articles.result"><ArticleListItem :item="item" /></template>
    <Page @changePage="changePage" :total="articles.total" />
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
      type: [Object, Number],
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
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
