<template>
  <div class="detail">
    <nav-bar>
      <template #left><detail-tools :article="article" /></template>
    </nav-bar>
    <div class="article-detail">
      <el-container>
        <el-main>
          <div class="author-info-block">
            <avatar :size="90" :info="article.author" />
            <div class="author-info-box">
              <h2>{{ article.author.name }}</h2>
              <span>{{ article.updateAt }}</span>
            </div>
          </div>
          <hr />
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="el-tiptap-editor__content" v-html="article.content"></div>
          <hr />
          <template v-if="isLogin"><comment-form /></template>
          <template v-else>
            <div class="showLogin">
              <h1>请先登陆后评论</h1>
              <el-button @click="showLogin" type="primary">登陆</el-button>
            </div>
          </template>
          <template v-if="commentInfo.length">
            <comment-list :commentInfo="commentInfo" />
          </template>
          <template v-else-if="!noComment">
            <div class="skeleton"><el-skeleton animated /></div>
          </template>
          <template v-else>
            <div class="skeleton"><h1>评论区暂时为空~发表你的第一条评论吧~</h1></div>
          </template>
        </el-main>
      </el-container>
    </div>
    <div class="article-panel">
      <i class="like"></i>
      <span>{{ article.likes }}</span>
      <i class="comment"></i>
      <span>{{ commentInfo.length }}</span>
    </div>
    <!-- <login :show="isShow" @close="isShow = false" /> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import NavBar from '@/components/navbar/NavBar.vue';
import Avatar from '@/components/avatar/Avatar.vue';
import CommentList from './cpns/CommentList.vue';
import CommentForm from './cpns/CommentForm.vue';
import DetailTools from './cpns/DetailTools.vue';
export default {
  name: 'Detail',
  data() {
    return {
      noComment: false
    };
  },
  computed: {
    // this.$route拿到的是我们当前处于活跃状态的路由
    ...mapState({
      isLogin: (state) => state.l.token, //根据是否有token判断是否登陆(授权)
      userInfo: (state) => state.l.userInfo,
      article: (state) => state.a.article,
      commentInfo: (state) => state.a.commentInfo
    })
  },
  created() {
    this.$store.dispatch('a/getDetailAction', this.$route.params.articleId);
    setTimeout(() => (this.noComment = !this.noComment), 2000);
  },
  components: { NavBar, Avatar, CommentList, CommentForm, DetailTools },
  methods: {
    ...mapMutations(['showLogin'])
  }
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
      .showLogin {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        h1 {
          padding-bottom: 20px;
        }
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
