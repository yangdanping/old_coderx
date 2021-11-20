<template>
  <el-tiptap v-model="content" :extensions="extensions" placeholder="请输入内容..." height="100vh"></el-tiptap>
</template>

<script>
// 需要的 extensions
import extensions from './config';
export default {
  name: 'Editor',
  components: {},
  props: {},
  data() {
    return {
      extensions: extensions,
      content: ''
    };
  },
  watch: {
    content(newVal) {
      this.$emit('onListen', newVal);
    }
  }
};
</script>

<style lang="less" scoped></style>

