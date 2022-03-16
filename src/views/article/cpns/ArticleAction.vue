<template>
  <action-list>
    <template #article>
      <ul class="article-action">
        <li class="item view" @click="goDetail(article.id)">
          <i></i><span>{{ article.views }}</span>
        </li>
        <li class="item like" @click="likeClick(article.id)" :class="isLiked(article.id)">
          <i></i><span>{{ article.likes }}</span>
        </li>
        <li class="item comment" @click="goDetail(article.id)">
          <i></i><span>{{ article.commentCount }}</span>
        </li>
      </ul>
    </template>
  </action-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { Msg } from '@/utils';
import ActionList from '@/components/action/ActionList.vue';

export default {
  name: 'ArticleAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  components: { ActionList },
  computed: {
    //根据是否有token判断是否登录(授权)
    ...mapState({ isLogin: (state) => state.u.token }),
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
    goDetail(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
