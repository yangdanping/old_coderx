<template>
  <div class="form">
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="goBack">退出编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  data() {
    return {
      title: ''
    };
  },
  components: {},
  methods: {
    goBack() {
      this.$router.push('/article');
    },
    onSubmit() {
      console.log('submit!');
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
