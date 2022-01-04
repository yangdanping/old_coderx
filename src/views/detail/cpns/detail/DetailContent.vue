<template>
  <div class="detail-content">
    <el-container>
      <el-main>
        <div class="author-info-block">
          <avatar :size="90" :info="article.author ? article.author : {}" />
          <div class="author-info-box">
            <h2>{{ article.author ? article.author.name : '佚名' }}</h2>
            <span>{{ article.createAt }}创建</span>
          </div>
        </div>
        <hr />
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="el-tiptap-editor__content" v-html="article.content"></div>
        <hr />
      </el-main>
    </el-container>
    <div class="detail-panel">
      <i @click="likeClick(article.id)" class="like" :class="isLiked(article.id)"></i>
      <span>{{ article.likes }}</span>
      <i class="comment" @click="gotoComment"></i>
      <span>{{ article.commentCount }}</span>
      <i class="views"></i>
      <span>{{ article.views }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
export default {
  name: 'DetailContent',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    //根据是否有token判断是否登录(授权)
    ...mapState({ isLogin: (state) => state.u.token }),
    ...mapGetters({ isLiked: 'a/isArticleUserLiked' })
  },
  components: { Avatar },
  methods: {
    likeClick(articleId) {
      if (this.isLogin) {
        this.$store.dispatch('a/likeAction', articleId);
      } else {
        this.$msg(2, '请先登录');
        this.$store.commit('showLogin');
      }
    },
    gotoComment() {
      eventBus.$emit('gotoCom');
    }
  }
};
</script>

<style lang="less" scoped>
.detail-content {
  margin-top: 80px;
  width: 80%;
  hr {
    margin: 40px auto;
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
  .el-main {
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
      align-items: center;
      font-size: 50px;
      margin-bottom: 50px;
    }
  }
  .detail-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    position: fixed;
    left: 2vw;
    top: 240px;
    // position: fixed;
    // top: 100px;
    // left: -20px;
    // left: calc((100vw - 1000px) / 2 - 400px);
    .like,
    .comment,
    .views {
      width: 35px;
      height: 35px;
      background-size: contain;
      cursor: pointer;
    }
    .like {
      background-image: url('~@/assets/img/article/like.png');
    }
    .comment {
      background-image: url('~@/assets/img/article/comment.png');
    }
    .views {
      background-image: url('~@/assets/img/article/view.png');
    }
    .like:hover {
      background-image: url('~@/assets/img/article/like-active.png');
    }
    .comment:hover {
      background-image: url('~@/assets/img/article/comment-active.png');
    }
    .like:hover,
    .comment:hover {
      span {
        color: #509afb;
      }
    }
    span {
      font-size: 15px;
    }
  }
  .liked {
    background-image: url('~@/assets/img/article/like-active.png') !important;
    color: #509afb !important;
  }
  // .el-aside {
  //   position: sticky;
  //   top: 10px;
  //   // background: pink;
  //   height: 100%;

  // }
}
</style>
