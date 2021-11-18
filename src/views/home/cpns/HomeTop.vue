<template>
  <div class="home-top">
    <div class="home-top-wrapper"></div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'HomeTop',
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.home-top {
  .home-top-wrapper {
    width: 1200px;
    height: 700px;
    // background: pink;
    margin: 200px auto 0;
  }
  hr {
    margin: 80px auto;
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
}
</style>
