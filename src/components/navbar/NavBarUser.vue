<template>
  <div class="nav-bar-user">
    <el-button class="editbtn" @click="goEdit" type="primary">写文章</el-button>
    <el-dropdown>
      <el-avatar :src="userInfo.avatar_url"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的空间</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'NavBarUser',
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      userInfo: (state) => state.l.userInfo
    })
  },
  methods: {
    logOut() {
      this.$store.commit('l/changeToken');
    },
    goEdit() {
      console.log('goEdit');
      this.$router.push({
        path: '/edit'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.nav-bar-user {
  display: flex;
  .editbtn {
    margin: 0 15px;
    padding: 0 25px;
  }
  .el-dropdown {
    cursor: pointer;
  }
}
</style>
