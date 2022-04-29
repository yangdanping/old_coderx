<template>
  <el-tiptap v-model="content" :extensions="extensions" :charCounterCount="false" placeholder="请输入内容..." :height="height"></el-tiptap>
</template>

<script>
import { extensions, commentExt } from './config';
import { cache, eventBus } from '@/utils';
export default {
  name: 'Editor',
  // 由外界用props决定编辑器的使用
  props: {
    editData: {
      type: Object,
      default: () => {}
    },
    isComment: {
      type: Boolean,
      default: false
    },
    editComment: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: '100vh'
    }
  },
  data() {
    return {
      content: ''
    };
  },
  computed: {
    extensions() {
      return this.isComment ? commentExt : extensions;
    }
  },
  mounted() {
    // 来到编辑器首先查看是否是继续写/编辑文章/编辑评论
    // console.log(cache.getCache('draft'), this.editData, this.editComment);
    if (cache.getCache('draft') && !this.editData && !this.isComment) {
      const { draft } = cache.getCache('draft');
      this.content = draft;
    } else if (this.editData) {
      const { content } = this.editData;
      this.content = content;
    } else if (this.editComment) {
      this.content = this.editComment;
    }
    eventBus.$on('cleanContent', () => (this.content = ''));
  },
  watch: {
    content: {
      handler(newVal) {
        this.$emit('onListen', newVal);
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped></style>
