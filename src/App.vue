<template>
  <div id="app" :class="isDark">
    <router-view :class="isDark" />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isDark() {
      return { darktheme: this.$store.state.isDark };
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
