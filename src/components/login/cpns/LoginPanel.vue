<template>
  <div class="login-panel">
    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <login-account />
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <register-account />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LoginAccount from './LoginAccount.vue';
import RegisterAccount from './RegisterAccount.vue';
export default {
  name: 'LoginPanel',
  data() {
    return {
      activeName: 'login'
    };
  },
  components: { LoginAccount, RegisterAccount },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.login-panel {
  width: 400px;
  ::v-deep .el-tabs__item {
    font-size: 20px;
  }
  .el-tab-pane {
    display: flex;
    justify-content: center;
  }
}
</style>
