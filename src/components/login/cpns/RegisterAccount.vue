<template>
  <div class="login-account">
    <el-form :rules="rules" :model="form" status-icon ref="registerForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" clearable prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" clearable show-password type="password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm">
        <el-input v-model="form.confirm" clearable show-password type="password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="register">注册并登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterAccount',
  data() {
    return {
      form: { name: '', password: '', confirm: '' },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirm: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  components: {},
  methods: {
    register() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.confirm) {
            this.$msg(3, '两次密码输入不一致');
          } else {
            this.$store.dispatch('u/registerAction', this.form);
          }
        } else {
          this.$msg(2, '请输入正确的用户名和密码');
        }
      });
      // this.$store.dispatch('u/registerAction', this.form).then((res) => {
      //   if (res) {
      //     this.$router.replace('/login'); // 拿到res表示注册成功 --> 跳到登录页面登录
      //     console.log(res); //拿到了服务器返回的真实数据
      //   } else {
      //     console.log('注册失败', res);
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.login-account {
  margin-top: 40px;
  .el-form {
    .el-input {
      width: 100%;
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
