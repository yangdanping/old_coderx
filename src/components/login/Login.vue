<template>
  <!-- <el-dialog :visible.sync="showDialog" @close="handleClose" :modal-append-to-body="false" center> -->
  <el-dialog :visible.sync="isShowLogin" @close="showLogin" :modal-append-to-body="false" center>
    <div class="welcome">
      <h1>登录CoderX,进入Coder世界</h1>
      <img src="../../assets/img/welcome.svg" alt="" />
    </div>
    <login-panel />
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex';
import LoginPanel from './cpns/LoginPanel.vue';
export default {
  name: 'Login',
  data() {
    return {
      showDialog: false
    };
  },
  components: { LoginPanel },
  computed: {
    isShowLogin: {
      get() {
        return this.$store.state.isShowLogin;
      },
      set() {}
    }
  },
  methods: {
    ...mapMutations(['showLogin'])
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog__body {
  display: flex;
  justify-content: center;
}

@keyframes fadeShow {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

::v-deep .el-dialog {
  animation: fadeShow 1s forwards;
}
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 70px;
  img {
    width: 300px;
  }
}
</style>
