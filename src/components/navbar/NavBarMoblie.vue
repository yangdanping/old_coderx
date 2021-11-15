<template>
  <div class="nav-dropdown">
    <el-dropdown>
      <el-button><i class="el-icon-arrow-down el-icon--center"></i></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in menus" :key="item.name">{{ item.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'NavBarMoblie',
  data() {
    return {
      menus: [
        { name: '首页', path: '/main/home' },
        { name: '专栏', path: '/main/article' },
        { name: '收藏', path: '/main/collection' },
        { name: '发现', path: '/main/discover' }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.el-dropdown {
  vertical-align: top;
  i {
    font-size: 20px;
  }
  .el-button {
    width: 100px;
  }
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
