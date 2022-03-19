<template>
  <div class="child-reply">
    <template v-for="(reply, index) in replyInfo">
      <!-- 若replyId为null,说明是fatherReply的回复,其他的就是回复的回复 -->
      <template v-if="index < 2">
        <template v-if="!reply.replyId"><ChildReplyItem :reply="reply" /></template>
        <template v-if="reply.replyId"><ChildReplyItem :reply="reply" :replyInfo="replyInfo" /></template>
      </template>
      <template v-if="index >= 2 && collapse">
        <template v-if="!reply.replyId"><ChildReplyItem :reply="reply" /></template>
        <template v-if="reply.replyId"><ChildReplyItem :reply="reply" :replyInfo="replyInfo" /></template>
      </template>
    </template>
    <div v-if="replyInfo.length > 2" @click="wantMore" class="collapse">
      <span>{{ isCollapse('span') }}</span>
      <i :class="isCollapse('icon')"></i>
    </div>
  </div>
</template>

<script>
import ChildReplyItem from './ChildReplyItem.vue';
export default {
  name: 'CommentChildReply',
  props: {
    replyInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { collapse: false };
  },
  components: { ChildReplyItem },
  computed: {
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
  methods: {
    wantMore() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="less" scoped>
.child-reply {
  background: rgba(240, 240, 240, 0.7);
  .collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(247, 248, 250, 0.7);
  }
}
</style>
