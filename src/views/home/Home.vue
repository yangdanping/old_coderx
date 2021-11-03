<template>
  <div class="home" ref="home">
    <nav-bar />
    <home-title v-show="isShow" />
    <home-main />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HomeTitle from './cpns/HomeTitle.vue';
import HomeMain from './cpns/HomeMain.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Home',
  data() {
    return {
      isShow: true
    };
  },
  components: {
    NavBar,
    HomeTitle,
    HomeMain
  },
  mounted() {
    console.log(this.$route.name);
  },
  computed: {
    ...mapState(['isDark'])
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