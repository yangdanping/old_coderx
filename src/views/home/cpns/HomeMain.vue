<template>
  <div class="home-main">
    <main></main>
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
main {
  position: relative;
  margin-top: var(--mainMT);
  margin-bottom: var(--mainMB);
  height: var(--mainH);
  width: 1500px;
  // background-color: rgba(0, 0, 0, 0.7);
  background-color: rgba(255, 255, 255, 0.7);
}

// .header::before {
//   content: '';
//   background: var(--bg);
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   filter: blur(30px);
//   z-index: -1;
// }
</style>