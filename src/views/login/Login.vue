<template>
  <div class="login">
    <div class="login-panel">
      <h2 class="title">{{ $store.state.l.Mdname }}</h2>
      <el-form status-icon ref="loginForm" label-width="65px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="userInfo.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submit">登陆</el-button>
          <router-link to="/register"><el-button>注册</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>您已成功登陆</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import localCache from '@/utils/cache.js';

export default {
  name: 'Login',
  data() {
    return {
      userInfo: {
        name: localCache.getCache('name') ?? '',
        password: localCache.getCache('password') ?? ''
      },
      dialogVisible: false,
      isLogin: false
    };
  },
  created() {
    if (this.isLogin) {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  components: {},
  methods: {
    submit() {
      console.log('登陆');
      localCache.setCache('name', this.userInfo.name);
      localCache.setCache('password', this.userInfo.password);
      this.$store.dispatch('l/loginAction', this.userInfo);
    },
    handleClose(done) {
      this.$confirm('确认关闭?')
        .then((_) => {
          done();
        })
        .catch((_) => {});
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  // 注意把上一层app高度调成100%
  background: var(--bg);
  background-color: #181818;
}

.login-panel {
  .title {
    margin-left: 85px;
  }

  .el-form {
    .el-input {
      width: 200px;
    }

    ::v-deep .el-form-item__label {
      color: #fff;
      font-size: 17px;
    }
  }

  .btn-box .el-button {
    margin-left: 20px;
  }
}
</style>
