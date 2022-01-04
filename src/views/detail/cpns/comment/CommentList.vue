<template>
  <div ref="list" class="comment-list">
    <span class="comment-title">最近评论({{ article.commentCount }})</span>
    <template v-for="(item, index) in commentInfo">
      <comment-list-item :item="item" :floor="commentInfo.length - index" />
    </template>
  </div>
</template>

<script>
import { eventBus } from '@/utils';
import { mapState } from 'vuex';
import CommentListItem from './CommentListItem.vue';
export default {
  name: 'CommentList',
  props: {
    commentInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  mounted() {
    eventBus.$off('gotoCom');
    eventBus.$on('gotoCom', () => this.$refs.list.scrollIntoView({ behavior: 'smooth' }));
  },
  computed: {
    ...mapState({ article: (state) => state.a.article })
  },
  components: { CommentListItem },
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-list {
  margin-bottom: 300px;
}
.comment-title {
  font-weight: 300;
  font-size: 30px;
}
</style>
