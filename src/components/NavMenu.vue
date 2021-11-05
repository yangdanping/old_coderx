<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" active-text-color="#0597ff">
      <el-menu-item @click="homeClick" index="1">首页</el-menu-item>
      <el-menu-item @click="articleClick" index="2">专栏</el-menu-item>
      <el-menu-item index="3">收藏</el-menu-item>
      <el-menu-item index="4">发现</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      activeIndex: '1'
    };
  },
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    homeClick() {
      this.$router.push({
        path: '/home/main'
      });
    },
    articleClick() {
      this.$router.push({
        path: '/home/article'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.nav-menu {
  user-select: none;
  .el-menu {
    display: flex;
    background: none;
    border: 0;
    .el-menu-item {
      height: 100%;
      background: none;
      padding: 0 35px; //上下0,左右55
      font-size: 22px;
    }
    .el-menu-item.is-active {
      background: none;
    }
  }
}
</style>
