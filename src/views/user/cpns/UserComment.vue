<template>
  <div class="">
    <div class="list-header">
      <h2>{{ sex }}的评论({{ profile.commentCount }})</h2>
    </div>
    <template v-if="comments.length">
      <template v-for="item in comments">
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
      <Page @changePage="changePage" :total="profile.commentCount" />
    </template>
    <template v-else><span>这个人未发表过评论</span></template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Page from '@/components/Page.vue';
export default {
  name: 'UserComment',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      comments: (state) => state.u.comments,
      profile: (state) => state.u.profile
    }),
    sex() {
      return this.profile.sex === '男' ? '他' : '她';
    }
  },
  components: { Page },
  methods: {
    changePage() {
      this.$store.dispatch('u/getCommentAction', this.profile.id);
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
