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
        <el-drawer title="管理您的文章" :visible.sync="drawer" :direction="direction">
          <edit-form @formSubmit="formSubmit" :draft="preview" :editData="editData" />
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import localCache from '@/utils/cache';
import Editor from '@/components/editor/Editor.vue';
import EditForm from '@/components/form/EditForm.vue';
export default {
  name: 'Edit',
  data() {
    return {
      tinymceFlag: 1,
      drawer: false,
      direction: 'ltr',
      preview: ''
    };
  },
  components: { Editor, EditForm },
  mounted() {
    if (localCache.getCache('draft')) {
      const { draft } = localCache.getCache('draft');
      this.preview = draft;
    }
  },
  computed: {
    editData() {
      return this.$route.query.editData; //只有修改操作才能得到该数据
    }
  },
  methods: {
    onListen(content) {
      this.preview = content; //content是watch监听到的最新文章内容
    },
    formSubmit(payload) {
      const { title } = payload;
      if (!title || !this.preview || this.preview === '<p></p>') {
        console.log('内容不能为空!');
      } else {
        if (!this.editData) {
          const sumbitPayload = { content: this.preview, ...payload };
          this.$store.dispatch('a/editAction', sumbitPayload);
        } else {
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
