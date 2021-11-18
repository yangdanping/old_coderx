<template>
  <div class="home-main">
    <hr />
    <el-container>
      <el-main>Main</el-main>
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
  width: 100%;
  hr {
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
}

.el-container {
  height: 800px;
  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #e9eef3;
    color: #333;
  }
}
</style>
