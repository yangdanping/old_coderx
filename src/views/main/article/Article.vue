<template>
  <div class="article-main">
    <h1>Article</h1>
    <el-container>
      <el-main>
        <article-list :articles="articles" :likedId="likedId" />
      </el-main>
      <!-- <el-aside>aside</el-aside> -->
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
  components: { ArticleList },
  methods: {
    getArticles() {
      this.$store.dispatch('a/getListAction');
    }
  }
};
</script>

<style lang="less" scoped>
.article-main {
  margin-top: 60px;
  width: 1500px;
  animation: moveDown 1s forwards;
}

.el-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(233, 238, 243);
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
  // margin-right: 30px;
  border-radius: 10px;
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
</style>
