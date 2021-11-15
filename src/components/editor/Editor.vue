<template>
  <div id="tinymce"></div>
</template>
<script>
import './config';
import { BASE_URL } from '@/global/config';

export default {
  name: 'Editor',
  props: {
    flag: Number
  },
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    tinymce.init({
      selector: `#tinymce`,
      language: 'zh_CN',
      height: '100vh',
      branding: false,
      // 工具栏
      // toorbar: 'preview',
      // 插件 预览插件
      plugins: ['preview', 'image', 'imagetools', 'wordcount', 'code', 'table', 'codesample'],
      images_upload_url: `${BASE_URL}/upload/picture?articleId=1`,
      // 监听 初始化完成事件
      setup: (editor) => {
        editor.on('init', (e) => {
          editor.setContent(this.content);
        });
      },
      // 监听input和change事件,实时更新value
      init_instance_callback: (editor) => {
        editor.on('input', (e) => {
          this.$emit('input', e.target.innerHTML);
        });
        editor.on('change', (e) => {
          this.$emit('input', e.level.content);
        });
      }
    });
  },

  components: {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
