<template>
  <div class="login-account">
    <el-form status-icon ref="registerForm" label-width="65px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="userInfo.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="register">注册并登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterAccount',
  data() {
    return {
      userInfo: { name: '', password: '' }
    };
  },
  components: {},
  methods: {
    register() {
      this.$store.dispatch('r/registerAction', this.userInfo).then((res) => {
        if (res) {
          this.$router.replace('/login'); // 拿到res表示注册成功 --> 跳到登陆页面登陆
          console.log(res); //拿到了服务器返回的真实数据
        } else {
          console.log('注册失败', res);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-account {
  margin-top: 40px;
  .el-form {
    .el-input {
      width: 200px;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    ::v-deep .el-form-item__label {
      font-size: 17px;
    }
    .btn-box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

