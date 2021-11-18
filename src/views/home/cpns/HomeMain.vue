<template>
  <div class="home-main">
    <el-container>
      <el-main>Main</el-main>
      <el-aside>Aside</el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.home-main {
  width: 1200px;
  height: 600px;
  .el-container {
    height: 100%;
  }
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9eef3;
  color: #333;
  margin-right: 30px;
}
.el-aside {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3dce6;
  color: #333;
}
</style>
