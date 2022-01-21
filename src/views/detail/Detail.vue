<template>
  <div class="detail">
    <nav-bar>
      <template #left><detail-tools :article="article" :isAuthor="isAuthor(userInfo.id)" /></template>
    </nav-bar>
    <detail-content :article="article" />
    <comment :commentInfo="commentInfo" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import NavBar from '@/components/navbar/NavBar.vue';
import DetailTools from './cpns/detail/DetailTools.vue';
import DetailContent from './cpns/detail/DetailContent.vue';
import Comment from './cpns/comment/Comment.vue';
export default {
  name: 'Detail',
  data() {
    return {};
  },
  computed: {
    // this.$route拿到的是我们当前处于活跃状态的路由
    ...mapState({
      article: (state) => state.a.article,
      commentInfo: (state) => state.c.commentInfo,
      isLogin: (state) => state.u.token, //根据是否有token判断是否登录(授权)
      userInfo: (state) => state.u.userInfo //用于作是否是作者的比较
    }),
    ...mapGetters({ isAuthor: 'a/isAuthor' })
  },
  created() {
    this.$store.dispatch('a/getDetailAction', this.$route.params.articleId);
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(from, to);
  //   next((vm) => vm.$store.dispatch('a/getDetailAction', parseInt(to.params.articleId)));
  // },
  components: { NavBar, DetailTools, DetailContent, Comment },
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
}
@import url('@/assets/css/theme/dark.less');
</style>
