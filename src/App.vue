<template>
  <div id="app">
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
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
