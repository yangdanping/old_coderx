<template>
  <div class="home">
    <NavBar />
    <HomeTitle />
    <HomeTop />
    <HomeMain />
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue';
import HomeTop from './cpns/HomeTop.vue';
import HomeTitle from './cpns/HomeTitle.vue';
import HomeMain from './cpns/HomeMain.vue';
export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    NavBar,
    HomeTitle,
    HomeTop,
    HomeMain
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg);
  transition: background-color 1s;
  box-shadow: 5px 2px 10px rgba(100, 100, 100, 0.7);
}
@import url('@/assets/css/theme/dark.less');
</style>
