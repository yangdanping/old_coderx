<template>
  <div class="edit">
    <el-row>
      <el-col :span="12">
        <Editor :editData="editData" @onListen="onListen" />
      </el-col>
      <el-col :span="12">
        <div class="preview">
          <div class="title"><i class="el-icon-s-platform">预览</i></div>
          <div class="content el-tiptap-editor__content" v-html="preview"></div>
        </div>
      </el-col>
    </el-row>
    <el-button class="btn" @click="drawer = true"><i class="el-icon-menu"></i><span>提交</span></el-button>
    <el-drawer title="管理您的文章" :visible.sync="drawer" direction="ltr">
      <EditForm @formSubmit="formSubmit" :draft="preview" :editData="editData" />
    </el-drawer>
  </div>
</template>

<script>
import { cache } from '@/utils';
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
        this.$showInfo('内容不能为空!');
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
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
  }
  .preview {
    .title {
      position: fixed;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(90deg, #222f3e, #03a9f4, transparent);
      color: #fff;
      font-size: 30px;
      height: 99px;
      width: 50vw;
    }
    .content {
      padding: 99px 0 0 0;
      height: 100vh;
      background: #fff;
      white-space: pre-wrap;
    }
  }

  .el-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
