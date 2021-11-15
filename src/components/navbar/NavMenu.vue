<template>
  <div class="nav-menu">
    <el-menu @select="handleSelect" :default-active="activeIndex" active-text-color="#0597ff" mode="horizontal">
      <el-menu-item v-for="item in menus" :index="item.path" :key="item.name">{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      menus: [
        { name: '首页', path: '/main/home' },
        { name: '专栏', path: '/main/article' }
        // { name: '收藏', path: '/main/collection' },
        // { name: '发现', path: '/main/discover' }
      ],
      activeIndex: '0'
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.activeIndex = this.$route.path;
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
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
