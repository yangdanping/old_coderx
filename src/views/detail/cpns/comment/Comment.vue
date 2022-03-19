<template>
  <div class="comment">
    <template v-if="isLogin"><CommentForm /></template>
    <template v-else>
      <div class="showLogin">
        <h1>请先登录后评论</h1>
        <el-button @click="changeDialog" type="primary">登录</el-button>
      </div>
    </template>
    <!-- -------------------------------------------------------------------- -->
    <template v-if="commentInfo.length"><comment-list :commentInfo="commentInfo" /></template>
    <template v-else-if="!noComment"><el-skeleton animated /></template>
    <template v-else><h1 class="skeleton">评论区暂时为空~发表你的第一条评论吧~</h1></template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CommentList from '../comment/CommentList.vue';
import CommentForm from '../comment/CommentForm.vue';

export default {
  name: 'Comment',
  props: {
    commentInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      noComment: false
    };
  },
  created() {
    setTimeout(() => (this.noComment = !this.noComment), 2000);
  },
  computed: {
    ...mapState({ isLogin: (state) => state.u.token }) //根据是否有token判断是否登录(授权)
  },
  components: { CommentList, CommentForm },
  methods: {
    ...mapMutations(['changeDialog'])
  }
};
</script>

<style lang="less" scoped>
.comment {
  width: 81%;
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
.skeleton {
  display: flex;
  justify-content: center;
  height: calc(50vh);
}
</style>
