<template>
  <div class="header">
    <header>
      <div class="header-l">
        <a href="javascript:scrollTo(0,0);"><span class="logo"></span></a>
        <nav-menu />
      </div>
      <div class="header-r">
        <input class="search" v-model="input" placeholder="探索Coder X" />
        <el-button @click="changeMode" class="change-mode">切换主题</el-button>
        <el-button @click="loginClick" class="login-btn">登陆</el-button>
        <el-button @click="registerClick" class="register-btn">注册</el-button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import NavMenu from './NavMenu.vue';
export default {
  name: 'NavBar',
  data() {
    return {
      input: ''
    };
  },
  components: {
    NavMenu
  },
  methods: {
    // changeMode() { this.$store.commit('changeMode'); }
    ...mapMutations(['changeMode']),
    loginClick() {
      this.$router.push('/login');
    },
    registerClick() {
      this.$router.push('/register');
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 80px rgba(0, 0, 0, 0.1);
  header {
    display: flex;
    // justify-content: center;
    justify-content: space-around;
    align-items: center;
    min-width: 1220px;
    // max-width: 1500px;
    .header-l {
      display: flex;
      align-items: center;
      .logo {
        padding: 32px 90px 20px 90px;
        background: var(--logo);
        background-size: 185px 60px;
      }
    }
    .header-r {
      display: flex;
      font-family: Georgia, 'Times New Roman', Times, serif;
      .search {
        margin: 0 10px 0 30px;
        width: 200px;
        border: 0;
        outline: 0;
        background: none;
        transition: width 0.3s;
      }
      .search:focus {
        border-bottom: 1px solid #e6e6e6;
        width: 260px;
      }
      .search ::placeholder {
        color: #f1f1f1;
      }
      .change-mode {
        background: transparent;
      }
      .change-mode:hover {
        color: rgb(170, 32, 104);
        background: #f8eff8;
      }
      .login-btn {
        margin: 0 15px;
        font-size: 20px;
        background: transparent;
        color: rgb(170, 32, 104);
      }

      .register-btn {
        position: relative;
        padding: 10px 35px;
        border-radius: 50px;
        color: #fff;
        font-size: 20px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 400%;
        transition: all 0.3s;
        z-index: 1;
      }
      .register-btn::before {
        content: '';
        position: absolute;
        left: -5px;
        right: -5px;
        top: -5px;
        bottom: -5px;
        border-radius: 50px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 400%;
        filter: blur(15px);
        z-index: -1;
      }
      .register-btn:hover {
        color: #fff;
        text-shadow: 0px 2px 8px rgb(255, 255, 255);
        animation: flow 3s infinite;
      }
      .register-btn:hover ::before {
        animation: flow 3s infinite;
      }
    }
  }
}

.header::before {
  content: '';
  background: var(--bg);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  filter: blur(30px);
  z-index: -1;
}
</style>