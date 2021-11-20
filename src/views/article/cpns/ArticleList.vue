<template>
  <div class="article-container">
    <template v-for="item in articles">
      <div class="article" :key="item.id">
        <div class="banner">
          <template v-if="item.author.avatarUrl"><el-avatar :src="item.author.avatarUrl"></el-avatar></template>
          <template v-else><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></template>
          <span class="name">{{ item.author.name }}</span>
          <span class="update">{{ item.updateAt }}</span>
          <el-tag color v-for="tag in item.tags" size="small" :key="tag.name" type="success">{{ tag.name }}</el-tag>
        </div>
        <div class="content-wrapper">
          <div class="content-main">
            <a @click="onDetail(item.id)">
              <h2 class="title">{{ item.title }}</h2>
            </a>
            <div class="abstract">
              <p>{{ item.content }}</p>
            </div>
            <ul class="action-list">
              <li class="item like" @click="likeClick(item.id)" :class="{ liked: likedId.some((id) => id === item.id) ? true : false }">
                <i></i><span>{{ item.likes }}</span>
              </li>
              <li class="item comment" @click="onDetail(item.id)">
                <i></i><span>{{ item.commentCount }}</span>
              </li>
            </ul>
          </div>
          <div class="img"><img src="~@/assets/img/test.jpg" /></div>
        </div>
      </div>
    </template>
    <article-page />
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import ArticlePage from './ArticlePage.vue';
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: [Array, Number],
      default: () => []
    },
    likedId: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      likeIndex: null
    };
  },
  components: { ArticlePage },
  // computed: {
  //   ...mapState({ isLiked: (state) => state.a.isLiked })
  // },
  methods: {
    likeClick(articleId) {
      this.likeIndex = articleId;
      this.$store.dispatch('a/likeAction', articleId);
    },
    onDetail(aID) {
      this.$router.push({ path: `/article/${aID}` });
    }
  }
};
</script>

<style lang="less" scoped>
// .article-container {
//   width: 100%;
// }
.article {
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  padding: 20px 15px 0;
  margin: 15px 0;
  border-radius: 10px;
  .banner {
    display: flex;
    align-items: center;
    span {
      margin-right: 15px;
    }
    .name,
    .update {
      color: var(--fc);
    }
  }

  .content-wrapper {
    display: flex;
    border-bottom: 1px solid #e5e6eb;
    .content-main {
      margin: 10px 0;
      .title {
        cursor: pointer;
      }
      .abstract {
        height: 20px;
        width: 800px;
        padding: 15px 0;
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .action-list,
      .action-list > .item {
        display: flex;
        align-items: center;
        i {
          width: 20px;
          height: 20px;
          background-size: contain;
        }
        span {
          margin-left: 4px;
          color: var(--fc);
        }
        .like i {
          background-image: url('~@/assets/img/like.png');
        }
        .comment i {
          background-image: url('~@/assets/img/comment.png');
        }
        .like:hover i {
          background-image: url('~@/assets/img/like-active.png');
        }
        .comment:hover i {
          background-image: url('~@/assets/img/comment-active.png');
        }
        .like:hover,
        .comment:hover {
          span {
            color: #509afb;
          }
        }
      }
      .action-list > .item {
        margin-right: 30px;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .img {
      width: 150px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.article:hover {
  transform: scale(1.01);
  box-shadow: 3px 3px 8px rgba(100, 100, 100, 0.7);
}

.liked {
  span {
    color: #509afb !important;
  }
  i {
    background-image: url('~@/assets/img/like-active.png') !important;
  }
}
</style>
