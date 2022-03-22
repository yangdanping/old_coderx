<template>
  <div class="form">
    <el-form :rules="rules" :model="form" ref="editForm" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="form.tags" multiple filterable default-first-option clearable :multiple-limit="5" placeholder="添加文章标签(最多5个)">
          <span class="tip">你还能添加{{ 5 - form.tags.length }}个标签</span>
          <el-option v-for="(item, index) in tags" :key="item.id" :label="item.name" :value="item.name"> </el-option>
        </el-select>
      </el-form-item>
      <!-- ---------------------------------------------------------------------------------- -->
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">{{ this.editData ? '修改' : '创建' }}</el-button>
        <el-button @click="goBack">退出{{ this.editData ? '修改' : '编辑' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { cache } from '@/utils';
import { mapState } from 'vuex';
export default {
  name: 'EditForm',
  props: {
    editData: {
      type: Object,
      default: () => {}
    },
    draft: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        title: '',
        tags: []
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      oldTags: []
    };
  },
  components: {},
  computed: {
    ...mapState({ tags: (state) => state.a.tags })
  },
  mounted() {
    this.$store.dispatch('a/getTagsAction');
    if (this.editData) {
      const { title, tags } = this.editData;
      this.form.title = title;
      tags.forEach((tag) => this.oldTags.push(tag.name));
      tags.forEach((tag) => this.form.tags.push(tag.name));
      console.log('得到了要修改的数据!!!!', this.form);
    } else if (cache.getCache('draft')) {
      this.form = cache.getCache('draft');
    }
  },
  methods: {
    onSubmit() {
      const articleDraft = {
        title: this.form.title,
        tags: this.form.tags,
        oldTags: this.oldTags
      };
      this.$emit('formSubmit', articleDraft);
    },
    goBack() {
      this.$confirm(`是否${this.editData ? '取消修改' : '退出并保存草稿'}`, '提示', {
        type: 'info',
        distinguishCancelAndClose: true,
        confirmButtonText: `${this.editData ? '取消修改' : '保存退出'}`,
        cancelButtonText: `${this.editData ? '再想想' : '不保存退出'}`
      })
        .then(() => {
          if (!this.editData) {
            this.$router.push('/article');
            const draftObj = { ...this.form, draft: this.draft };
            cache.setCache('draft', draftObj);
            this.$showSuccess('已保存并退出文章编辑!');
          } else {
            this.$router.back();
          }
        })
        .catch((action) => {
          if (action === 'cancel' && !this.editData) {
            cache.removeCache('draft');
            cache.removeCache('pictures');
            this.$router.push('/article');
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding: 0 10px;
  .btn {
    display: flex;
    justify-content: space-around;
  }
}
.tip {
  display: flex;
  justify-content: center;
  color: #c9cdd4;
}
</style>
