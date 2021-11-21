<template>
  <div class="article">
    <nav-bar />
    <div class="article-wrapper">
      <template v-if="articles.length">
        <el-container>
          <el-main>
            <article-list :articles="articles" :likedId="likedId" />
          </el-main>
        </el-container>
      </template>
      <template v-else>
        <div class="skeleton">
          <el-skeleton animated />
        </div>
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
    ...mapState({
      articles: (state) => state.a.articles,
      likedId: (state) => state.a.likedId
    })
  },
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
      width: 1000px;
      height: calc(100vh - 120px);
    }
  }
}

.el-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  transition: background-color 1s;
  color: #333;
  // margin-right: 30px;
  border-radius: 10px;
  animation: moveDown 1s forwards;
}
.el-main::before {
  content: '';
  background: var(--bg);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  filter: blur(15px);
  z-index: -1;
}

// .el-aside {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(255, 255, 255, 0.7);
//   border-radius: 10px;
//   color: #333;
// }
@import url('@/assets/css/theme/dark.less');
</style>
