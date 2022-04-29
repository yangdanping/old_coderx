<template>
  <div class="article">
    <NavBar />
    <div class="article-wrapper">
      <div class="article-nav">
        <ArticleNav />
      </div>
      <ArticleList ref="list" v-if="hasArticles" :articles="articles" />
      <div v-else-if="!noList" class="skeleton">
        <el-skeleton animated />
      </div>
      <div v-else class="skeleton">
        <h1>该专栏暂无文章,快来发表第一篇吧~</h1>
        <el-button @click="goEdit" type="primary">发表第一篇</el-button>
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
    return {
      noList: false
    };
  },
  created() {
    this.$store.dispatch('a/getListAction');
    setTimeout(() => (this.noList = !this.noList), 2000);
  },
  computed: {
    ...mapState({
      articles: (state) => state.a.articles,
      isLogin: (state) => state.u.token //根据是否有token判断是否登录(授权)
    }),
    hasArticles() {
      return this.articles?.result.length;
    }
  },
  methods: {
    goEdit() {
      if (this.isLogin) {
        this.$router.push({ path: '/edit' });
      } else {
        this.$store.commit('changeDialog');
      }
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
      left: 8vw;
      top: 150px;
    }
    .skeleton {
      margin-top: 30vh;
      width: 50vw;
      height: calc(100vh - 120px);
    }
  }
}

@import url('@/assets/css/theme/dark.less');
</style>
