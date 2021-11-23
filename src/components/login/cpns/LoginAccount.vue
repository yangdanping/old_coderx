<template>
  <div class="login-account">
    <el-form status-icon ref="loginForm" label-width="65px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="userInfo.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import localCache from '@/utils/cache.js';

export default {
  name: 'LoginAccount',
  data() {
    return {
      userInfo: {
        name: localCache.getCache('name') ?? '',
        password: localCache.getCache('password') ?? ''
      }
    };
  },
  components: {},
  methods: {
    submit() {
      localCache.setCache('name', this.userInfo.name);
      localCache.setCache('password', this.userInfo.password);
      this.$store.dispatch('l/loginAction', this.userInfo);
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
