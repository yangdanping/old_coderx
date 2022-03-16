<template>
  <div class="detail-panel">
    <i @click="likeClick(article.id)" class="like" :class="isLiked(article.id)"></i>
    <span>{{ article.likes }}</span>
    <i class="comment" @click="gotoComment"></i>
    <span>{{ article.commentCount }}</span>
    <i class="views"></i>
    <span>{{ article.views }}</span>
    <el-popover @show="handleShow" @after-leave="handleHide" placement="right" width="400" trigger="click" :disabled="disabled">
      <article-collect />
      <i class="el-icon-star-off collect" slot="reference" @click="showLogin"></i>
    </el-popover>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { eventBus, Msg } from '@/utils';
import ArticleCollect from './ArticleCollect.vue';
export default {
  name: 'DetailPanel',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      disabled: true
    };
  },
  components: { ArticleCollect },
  mounted() {
    this.disabled = this.isLogin ? !this.disabled : this.disabled;
  },
  computed: {
    ...mapState({ isLogin: (state) => state.u.token, userInfo: (state) => state.u.userInfo }),
    ...mapGetters({ isLiked: 'a/isArticleUserLiked' })
  },
  methods: {
    likeClick(articleId) {
      if (this.isLogin) {
        this.$store.dispatch('a/likeAction', articleId);
      } else {
        Msg.showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    },
    gotoComment() {
      eventBus.$emit('gotoCom');
    },
    handleShow() {
      console.log('handleShow');
      this.$store.dispatch('u/getCollectAction', this.userInfo.id);
    },
    handleHide() {
      console.log('handleHide');
      eventBus.$emit('hideCollect');
    },
    showLogin() {
      if (this.disabled && !this.isLogin) {
        Msg.showInfo('请先登录');
        this.$store.commit('changeDialog');
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
  .collect {
    font-size: 35px;
    color: #4e5969;
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
</style>
