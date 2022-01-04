<template>
  <div class="action-list" :class="{ comment: isComment }">
    <slot name="article"></slot>
    <slot name="comment"></slot>
    <slot name="reply"></slot>
  </div>
</template>

<script>
export default {
  name: 'ActionList',
  props: {
    isComment: Boolean
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.comment {
  [class^='comment'] {
    padding: 0 0 10px 0;
  }
}
.action-list {
  ::v-deep [class$='-action'],
  ::v-deep [class$='-action'] > .item {
    display: flex;
    align-items: center;
    user-select: none;
    i {
      width: 20px;
      height: 20px;
      background-size: contain;
    }
    span {
      margin-left: 4px;
      color: var(--fc);
    }
    .view i {
      background-image: url('~@/assets/img/article/view.png');
    }
    .like i {
      background-image: url('~@/assets/img/article/like.png');
    }
    .comment i {
      background-image: url('~@/assets/img/article/comment.png');
    }
    .like:hover i {
      background-image: url('~@/assets/img/article/like-active.png');
    }
    .comment:hover i {
      background-image: url('~@/assets/img/article/comment-active.png');
    }
    .like:hover,
    .comment:hover {
      span {
        color: #509afb;
      }
    }
  }
  ::v-deep [class$='-action'] > .item {
    margin-right: 30px;
    font-size: 16px;
    cursor: pointer;
  }
  ::v-deep .liked {
    span {
      color: #509afb !important;
    }
    i {
      background-image: url('~@/assets/img/article/like-active.png') !important;
    }
  }
}
</style>
