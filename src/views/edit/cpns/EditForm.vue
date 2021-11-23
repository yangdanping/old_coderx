<template>
  <div class="form">
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">{{ this.editData ? '修改' : '创建' }}</el-button>
        <el-button @click="goBack">退出{{ this.editData ? '修改' : '编辑' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import localCache from '@/utils/cache';
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
      title: ''
    };
  },
  components: {},
  mounted() {
    if (this.editData) {
      const { title } = this.editData;
      this.title = title;
    } else if (localCache.getCache('draft')) {
      const { title } = localCache.getCache('draft');
      this.title = title;
    }
  },
  methods: {
    goBack() {
      this.$confirm(`是否${this.editData ? '取消修改' : '退出并保存草稿'}`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: `${this.editData ? '取消修改' : '保存退出'}`,
        cancelButtonText: `${this.editData ? '再想想' : '不保存退出'}`,
        type: 'info'
      })
        .then(() => {
          if (!this.editData) {
            this.$router.push('/article');
            localCache.setCache('draft', { title: this.title, draft: this.draft });
            this.$msg(1, '已保存并退出文章编辑!');
          } else {
            this.$router.back();
          }
        })
        .catch((action) => {
          if (action === 'cancel' && !this.editData) {
            localCache.removeCache('draft');
            this.$router.push('/article');
          }
        });
    },
    onSubmit() {
      this.$emit('formSubmit', {
        title: this.title
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding-right: 30px;
  .btn {
    display: flex;
    justify-content: space-around;
  }
}
</style>
