<template>
  <div class="login-account">
    <el-form :rules="rules" :model="form" status-icon ref="loginForm" label-width="90px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" type="password" clearable show-password></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <div class="valid-code">
          <el-input prefix-icon="el-icon-key" v-model="form.validCode" placeholder="请输入验证码"></el-input>
          <valid-code @input="createValidCode" />
        </div>
      </el-form-item> -->
      <el-form-item class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { cache } from '@/utils';
import ValidCode from '@/components/ValidCode.vue';

export default {
  name: 'LoginAccount',
  data() {
    return {
      form: {
        name: cache.getCache('user') ? cache.getCache('user').name : '',
        password: cache.getCache('user') ? cache.getCache('user').password : '',
        validCode: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      currentValidCode: ''
    };
  },
  components: { ValidCode },
  methods: {
    createValidCode(code) {
      this.currentValidCode = code;
    },
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('u/loginAction', this.form);
          console.log('测试时将验证码关闭');
          // if (!this.form.validCode) {
          //   this.$showFail('请输入验证码');
          //   return;
          // } else if (this.form.validCode.toLowerCase() !== this.currentValidCode.toLowerCase()) {
          //   this.$showFail('验证码错误');
          //   return;
          // } else {
          //   this.$store.dispatch('u/loginAction', this.form);
          // }
        } else {
          this.$showInfo('请输入正确的用户名和密码');
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
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    ::v-deep .el-form-item__label {
      font-size: 17px;
    }
    .valid-code {
      display: flex;
      justify-content: space-around;
      .el-input {
        width: 50%;
      }
    }
    .btn-box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
