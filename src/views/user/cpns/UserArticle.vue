<template>
  <div class="article-list">
    <div class="list-header">
      <h2>{{ sex }}的文章({{ profile.articleCount }})</h2>
    </div>
    <template v-if="articles.length">
      <template v-for="item in articles">
        <div class="content-wrapper">
          <div class="content-main">
            <div class="content" @click="goDetail(item.id)">
              <a class="title">{{ item.title }}</a>
              <div>
                <span>{{ item.createAt }}</span>
                <p class="abstract">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <Page @changePage="changePage" :total="profile.articleCount" />
    </template>
    <template v-else><span>这个人未发表过文章</span></template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Page from '@/components/Page.vue';
export default {
  name: 'UserArticle',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      articles: (state) => state.u.articles,
      profile: (state) => state.u.profile
    }),
    sex() {
      return this.profile.sex === '男' ? '他' : '她';
    }
  },
  components: { Page },
  methods: {
    changePage() {
      this.$store.dispatch('u/getArticleAction', this.profile.id);
    },
    goDetail(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
    }
  }
};
</script>

<style lang="less" scoped>
.list-header {
  border-bottom: 1px solid #ccc;
}
.content-wrapper {
  display: flex;
  border-bottom: 1px solid #e5e6eb;
  padding-bottom: 15px;

  .content-main {
    margin: 20px 0 20px 20px;
    .content {
      cursor: pointer;
    }
    .title {
      font-weight: 700;
      font-size: 24px;
    }
    .abstract {
      height: 20px;
      width: 800px;
      padding: 15px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
