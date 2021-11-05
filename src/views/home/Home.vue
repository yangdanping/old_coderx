<template>
  <div class="home" ref="home">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    NavBar
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: center;
  height: calc(100vh + var(--mainH) + var(--mainMT));
  width: calc(100%);
  transition: background-color 1s;
  background: var(--bg);
}
@import url('@/assets/css/home/theme-dark.less');
</style>
