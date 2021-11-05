<template>
  <div class="home-main">
    <home-title v-show="isShow" />
    <main></main>
  </div>
</template>

<script>
import HomeTitle from './HomeTitle.vue';
export default {
  name: 'HomeMain',
  data() {
    return {
      isShow: true
    };
  },
  components: {
    HomeTitle
  },
  methods: {}
};
</script>

<style lang="less" scoped>
main {
  display: grid;
  margin-top: var(--mainMT);
  margin-bottom: var(--mainMB);
  height: var(--mainH);
  width: 150rem;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.7);
}

@media screen and (max-width: 1550px) {
  main {
    width: 140rem;
  }
}
@media screen and (max-width: 1450px) {
  main {
    width: 130rem;
  }
}

@media screen and (max-width: 1350px) {
  main {
    width: 120rem;
  }
}

@media screen and (max-width: 1250px) {
  main {
    width: 90rem;
  }
}
@media screen and (max-width: 1150px) {
  main {
    width: 60rem;
  }
}
</style>
