<template>
  <div class="register">
    <div class="register-panel">
      <h2 class="title">{{ $store.state.r.Mdname }}</h2>
      <el-form status-icon ref="registerForm" label-width="65px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="userInfo.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="register">注册</el-button>
          <router-link to="/home"><el-button>返回</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
    },
    increment() {
      this.$store.commit('r/increment');
    }
  }
};
</script>

<style lang="less" scoped>
.register {
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

.register-panel {
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
