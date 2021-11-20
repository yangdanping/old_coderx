<template>
  <div class="detail">
    <nav-bar></nav-bar>
    <div class="article-detail">
      <el-container>
        <el-main>
          <div class="author-info-block">
            <template v-if="article.author.avatarUrl"><el-avatar :size="70" :src="article.author.avatarUrl"></el-avatar></template>
            <template v-else><el-avatar :size="70" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></template>
            <div class="author-info-box">
              <h2>{{ article.author.name }}</h2>
              <span>{{ article.updateAt }}</span>
            </div>
          </div>
          <hr />
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="el-tiptap-editor__content" v-html="article.content"></div>
          <hr />
          <comment-form />
          <template v-if="commentInfo.length">
            <comment-list :commentInfo="commentInfo" />
          </template>
          <template v-else>
            <div class="skeleton">
              <el-skeleton animated />
            </div>
          </template>
        </el-main>
      </el-container>
    </div>
    <div class="article-panel">
      <i class="like"></i>
      <span>{{ article.likes }}</span>
      <i class="comment"></i>
      <span>{{ article.commentCount }}</span>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue';
import { mapState } from 'vuex';
import CommentList from './cpns/CommentList.vue';
import CommentForm from './cpns/CommentForm.vue';
export default {
  name: 'Detail',
  data() {
    return {};
  },
  computed: {
    // this.$route拿到的是我们当前处于活跃状态的路由
    ...mapState({
      article: (state) => state.a.article,
      commentInfo: (state) => state.a.commentInfo
    })
  },
  created() {
    this.$store.dispatch('a/getDetailAction', this.$route.params.articleId);
  },
  components: { NavBar, CommentList, CommentForm },
  methods: {}
};
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 1s;
  background: var(--bg);
  hr {
    margin: 40px auto;
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
  .article-detail {
    margin-top: 80px;
    width: 1000px;
    .el-main {
      // background-color: rgb(233, 238, 243);
      .author-info-block {
        display: flex;
        align-items: center;

        .author-info-box {
          display: flex;
          flex-direction: column;
          height: 70px;
          justify-content: space-around;
          margin-left: 20px;
        }
      }
      .article-title {
        font-size: 50px;
        margin-bottom: 50px;
      }
    }
  }
}
.article-panel {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 310px;
  left: calc((100vw - 1000px) / 2 - 130px);
  font-size: 30px;
  .like,
  .comment {
    width: 45px;
    height: 45px;
    background-size: contain;
  }
  .like {
    background-image: url('~@/assets/img/like.png');
  }
  .comment {
    background-image: url('~@/assets/img/comment.png');
  }
  span {
    font-size: 15px;
  }
}

.skeleton {
  height: calc(50vh);
}

@import url('@/assets/css/theme/dark.less');
</style>
