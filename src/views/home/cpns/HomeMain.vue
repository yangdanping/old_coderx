<template>
  <div class="home-main">
    <hr />
    <div class="box">
      <div>Power By ⚡⚡yangdanping⚡⚡</div>
      <div>Email📧:1240645840@qq.com</div>
      <div>GitHub😺:https://github.com/yangdanping</div>
    </div>
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
.home-main {
  width: 90%;
  z-index: 99;
  hr {
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }

  .box {
    height: 500px;
    display: flex;
    flex-direction: column;
    font-size: 30px;
    justify-content: center;
    align-items: center;
    color: rgb(95, 95, 95);
    div {
      padding: 20px 0;
      transition: all 0.3s;
    }
  }
}

@media screen and (max-width: 880px) {
  .box div {
    font-size: 25px;
  }
}
@media screen and (max-width: 630px) {
  .box div {
    font-size: 20px;
  }
}
</style>
