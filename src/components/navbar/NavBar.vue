<template>
  <div class="header">
    <header>
      <NavBarMoblie style="display: none" />
      <div class="header-l">
        <router-link to="/home"><img class="logo" :src="logo" /></router-link>
        <slot name="left"><nav-menu /></slot>
      </div>
      <div class="header-r">
        <div class="search-box">
          <form class="search" action="">
            <el-input class="search-input" v-model="searchValue" @input="debounceInput" clearable placeholder="探索Coder X" />
          </form>
          <el-card class="box-card" v-if="showCard">
            <div slot="header" class="clearfix">
              <span>搜索:"{{ searchValue }}"</span>
            </div>
            <template v-if="searchResults.length">
              <div v-for="item in searchResults" @click="handleSelect(item.id)" :key="item.id" class="search-item">{{ item.title }}</div>
            </template>
          </el-card>
        </div>
        <el-button @click="changeMode" class="change-mode">切换主题</el-button>
        <slot name="right">
          <template v-if="!isLogin"><el-button @click="changeDialog" class="register-btn">Hello CoderX</el-button></template>
          <template v-else><NavBarUser /></template>
        </slot>
      </div>
    </header>
    <UserDialog />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { debounce } from '@/utils';
import NavMenu from './cpns/NavMenu.vue';
import NavBarMoblie from './cpns/NavBarMoblie.vue';
import NavBarUser from './cpns/NavBarUser.vue';
import UserDialog from '../user/UserDialog.vue';

export default {
  name: 'NavBar',
  data() {
    return {
      searchValue: '',
      showCard: false
    };
  },
  components: {
    NavMenu,
    NavBarMoblie,
    NavBarUser,
    UserDialog
  },
  watch: {
    searchValue(newV, oldV) {
      if (newV) {
        this.showCard = !this.showCard;
      } else {
        this.showCard = false;
        this.$store.commit('a/clearResults');
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.u.token, //根据是否有token判断是否登录(授权)
      isDark: (state) => state.isDark,
      searchResults: (state) => state.a.searchResults
    }),
    logo() {
      return require(`@/assets/img/logo${this.isDark ? '-fff' : ''}.png`);
    }
  },
  methods: {
    ...mapMutations(['changeMode', 'changeDialog']),
    debounceInput: debounce(function () {
      if (this.searchValue) {
        this.$store.dispatch('a/searchAction', this.searchValue);
      }
    }, 1000),
    handleSelect(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
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
    justify-content: space-around;
    align-items: center;
    min-width: 1220px;
    .header-l {
      display: flex;
      align-items: center;
      .logo {
        width: 174px;
        height: 60px;
      }
    }
    .header-r {
      display: flex;
      font-family: Georgia, 'Times New Roman', Times, serif;

      .search-box {
        position: relative;
        .search {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 15px;
          ::v-deep .el-input__inner {
            padding: 20px 10px !important;
          }
          .search-input ::placeholder {
            color: #f1f1f1;
          }
        }
        .box-card {
          position: absolute;
          bottom: 70;
          width: 200px;
          z-index: 99;
          .search-item {
            padding: 15px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          .search-item:hover {
            border-bottom: 1px solid #ccc;
            color: #03a9f4;
          }
        }
      }

      .change-mode {
        background: transparent;
        padding: 0 25px;
      }
      .change-mode:hover {
        color: rgb(170, 32, 104);
        background: #f8eff8;
      }
      .register-btn {
        position: relative;
        padding: 0 35px;
        border-radius: 50px;
        color: #fff;
        font-size: 16px;
        background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        background-size: 400%;
        transition: all 0.3s;
        font-weight: 100;
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
        text-shadow: 0px 2px 8px rgb(255, 255, 255);
        animation: flow 3s infinite;
        transform: scale(1.05);
      }
      .register-btn:hover ::before {
        animation: flow 3s infinite;
      }
    }
  }
  @media screen and (max-width: 760px) {
    header {
      justify-content: left;
      min-width: 0;
    }
    div[class^='header-'] {
      display: none;
    }
    .nav-dropdown {
      display: block !important;
      margin: 10px 0 0 15px;
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
