<template>
  <div class="edit">
    <el-row>
      <el-col :span="12">
        <editor v-model="content" />
      </el-col>
      <el-col :span="12">
        <!-- <pre v-highlightjs><code class="lua" v-html="content"></code></pre> -->
        <div class="block">
          <i class="el-icon-s-platform">预览</i>
        </div>
        <div class="preview" v-html="content"></div>
        <div class="btn">
          <el-button @click="drawer = true"><i class="el-icon-menu"></i></el-button>
        </div>
        <el-drawer title="管理您的文章" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
          <edit-form @formSubmit="formSubmit" />
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/editor/Editor.vue';
import EditForm from '@/components/form/EditForm.vue';
export default {
  name: 'Edit',
  data() {
    return {
      tinymceFlag: 1,
      //防止组件缓存导致编辑器不能正常使用,每次切换来都更改key,使其重新渲染
      // modal: null,
      drawer: false,
      direction: 'ltr',
      content: '<h2>请输入内容</h2>'
    };
  },
  components: { Editor, EditForm },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭?')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    formSubmit(payload) {
      const sumbitPayload = { ...payload, content: this.value };
      this.$store.dispatch('a/editAction', sumbitPayload);
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
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
    height: 79px;
  }
  .preview {
    padding-top: 21px;
  }

  .el-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
