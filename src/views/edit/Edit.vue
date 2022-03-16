<template>
  <div class="edit">
    <el-row>
      <el-col class="editor-box" :span="12">
        <editor :editData="editData" @onListen="onListen" />
      </el-col>
      <el-col :span="12">
        <div class="block">
          <i class="el-icon-s-platform">预览</i>
        </div>
        <div class="preview el-tiptap-editor__content" v-html="preview"></div>
        <div class="btn">
          <el-button @click="drawer = true"><i class="el-icon-menu"></i></el-button>
        </div>
        <el-drawer title="管理您的文章" :visible.sync="drawer" direction="ltr">
          <edit-form @formSubmit="formSubmit" :draft="preview" :editData="editData" />
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { cache, Msg } from '@/utils';
import Editor from '@/components/editor/Editor.vue';
import EditForm from './cpns/EditForm.vue';

export default {
  name: 'Edit',
  data() {
    return {
      tinymceFlag: 1,
      drawer: false,
      preview: ''
    };
  },
  components: { Editor, EditForm },
  mounted() {
    if (cache.getCache('draft')) {
      const { draft } = cache.getCache('draft');
      this.preview = draft;
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', () => {
      console.log('destroyed');
    });
  },
  computed: {
    editData() {
      return this.$route.query.editData; //只有修改操作才能得到该数据
    }
  },
  methods: {
    onListen(content) {
      this.preview = content; //content是editor中watch监听到的最新文章内容
    },
    formSubmit(payload) {
      const { title } = payload;
      if (!title || !this.preview || this.preview === '<p></p>') {
        Msg.showInfo('内容不能为空!');
      } else {
        if (!this.editData) {
          //创建文章
          const sumbitPayload = { content: this.preview, ...payload };
          this.$store.dispatch('a/editAction', sumbitPayload);
        } else {
          //修改文章
          const { id } = this.editData;
          const updatedPayload = { articleId: id, content: this.preview, ...payload };
          this.$store.dispatch('a/updateAction', updatedPayload);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
  .editor-box {
    background: var(--bg);
  }
  .btn {
    position: fixed;
    bottom: 30px;
    right: 0;
  }
  .block {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(90deg, #222f3e, #03a9f4, transparent);
    color: #fff;
    font-size: 30px;
    height: 99px;
  }
  .preview {
    padding: 0 20px;
    white-space: pre-wrap;
  }
  .el-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
