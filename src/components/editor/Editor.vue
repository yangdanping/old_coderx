<template>
  <el-tiptap v-model="content" :extensions="extensions" placeholder="请输入内容..." :height="height" :width="width"></el-tiptap>
</template>

<script>
import { extensions, commentExt } from './config';
import localCache from '@/utils/cache';
export default {
  name: 'Editor',
  components: {},
  props: {
    editData: {
      type: Object,
      default: () => {}
    },
    isComment: {
      type: Boolean,
      default: false
    },
    emoji: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: '100vh'
    },
    width: {
      type: [Number, String]
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
    console.log(this.editData, localCache.getCache('draft'));
    if (this.editData) {
      const { content } = this.editData;
      this.content = content;
    } else if (localCache.getCache('draft')) {
      const { draft } = localCache.getCache('draft');
      this.content = draft;
    }
  },
  watch: {
    emoji(newVal) {
      this.content += newVal;
    },
    content(newVal) {
      if (this.emoji) {
        console.log(this.emoji);
      }
      this.$emit('onListen', newVal);
    }
  }
};
</script>

<style lang="less" scoped></style>

