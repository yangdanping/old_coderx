<template>
  <div class="comment-reply">
    <template v-for="(item, index) in commentReply(comment)">
      <template v-if="index < 2"><CommentReplyItem :item="item" :fatherComment="comment" /></template>
      <template v-if="index >= 2 && collapse"><CommentReplyItem :item="item" :fatherComment="comment" /></template>
    </template>
    <div v-if="commentReply(comment).length > 2" @click="wantMore" class="collapse">
      <span>{{ isCollapse('span') }}</span>
      <i :class="isCollapse('icon')"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentReplyItem from './CommentReplyItem.vue';
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object, //这里comment就是对文章的评论
      default: () => {}
    }
  },
  data() {
    return {
      collapse: false
    };
  },
  computed: {
    ...mapGetters({ commentReply: 'c/commentReply' }),
    isCollapse() {
      return (key) => {
        if (key === 'span') {
          return !this.collapse ? '查看更多回复' : '收起回复';
        } else if (key === 'icon') {
          return !this.collapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up';
        }
      };
    }
  },
  components: { CommentReplyItem },
  methods: {
    wantMore() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="less" scoped>
.comment-reply {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  // max-height: 600px;
  // overflow-y: scroll;
  .collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(247, 248, 250, 0.7);
  }
}
@import url('@/assets/css/theme/dark.less');
</style>
