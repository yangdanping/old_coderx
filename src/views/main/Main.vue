<template>
  <div class="main">
    <nav-bar />
    <transition name="ydp" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Main',
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
.main {
  display: flex;
  justify-content: center;
  // height: calc(100vh + var(--mainH) + var(--mainMT));
  // vh:相对于视窗的高度,视窗被均分为100单位的vh;
  width: 100%;
  transition: background-color 1s;
  background: var(--bg);
  padding-bottom: var(--pb);
}
.ydp-enter-from,
.ydp-leave-to {
  opacity: 0;
}

.ydp-enter-active,
.ydp-leave-active {
  transition: opacity 0.5s;
}

@import url('@/assets/css/theme/dark.less');
</style>
