<template>
  <div id="app" class="wrapper" :class="isDark">
    <router-view :class="isDark" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    isDark() {
      return { dark: this.$store.state.isDark };
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  background: var(--bg);
  transition: background-color 1s;
}
</style>
