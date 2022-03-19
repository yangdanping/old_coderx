<template>
  <div class="article">
    <NavBar />
    <div class="article-wrapper">
      <div class="article-nav">
        <ArticleNav />
      </div>
      <ArticleList ref="list" v-if="articles.length" :articles="articles" />
      <div v-else class="skeleton">
        <el-skeleton animated />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import NavBar from '@/components/navbar/NavBar.vue';
import ArticleList from './cpns/ArticleList.vue';
import ArticleNav from './cpns/ArticleNav.vue';

export default {
  name: 'Article',
  components: { NavBar, ArticleList, ArticleNav },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('a/getListAction');
  },
  computed: {
    ...mapState({ articles: (state) => state.a.articles })
  },
  methods: {
    getPageHeight() {
      console.log(document.body.offsetHeight);
      console.log(this.$refs.list.offsetHeight);
    }
  }
};
</script>
<style lang="less" scoped>
.article {
  background: var(--bg);
  transition: background-color 1s;

  .article-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;

    .article-nav {
      position: fixed;
      left: 10vw;
      top: 200px;

      .test {
        height: 200px;
        width: 200px;
        background: #000;
      }
    }

    .skeleton {
      width: 50vw;
      height: calc(100vh - 120px);
    }
  }
}

@import url('@/assets/css/theme/dark.less');
</style>
