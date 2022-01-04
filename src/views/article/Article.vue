<template>
  <div class="article">
    <nav-bar />
    <div class="article-wrapper">
      <template v-if="articles.length"><article-list :articles="articles" /></template>
      <template v-else>
        <div class="skeleton"><el-skeleton animated /></div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '@/components/navbar/NavBar.vue';
import ArticleList from './cpns/ArticleList.vue';
export default {
  name: 'Article',
  data() {
    return {};
  },
  created() {
    this.getArticles();
  },
  computed: {
    ...mapState({ articles: (state) => state.a.articles })
  },
  mounted() {},
  components: { NavBar, ArticleList },
  methods: {
    getArticles() {
      this.$store.dispatch('a/getListAction');
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg);
  transition: background-color 1s;
  .article-wrapper {
    margin-top: 120px;
    .skeleton {
      width: 50vw;
      height: calc(100vh - 120px);
    }
  }
}

@import url('@/assets/css/theme/dark.less');
</style>
