<template>
  <div class="home-main">
    <home-title />
    <hr />
    <el-container class="home-container">
      <el-main>Main</el-main>
      <el-aside>Aside</el-aside>
    </el-container>
  </div>
</template>

<script>
import HomeTitle from './cpns/HomeTitle.vue';
export default {
  name: 'Home',
  data() {
    return {
      isShow: true
    };
  },
  activated() {
    console.log('Home activated---------------------------------');
  },
  components: {
    HomeTitle
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.home-main {
  margin-top: var(--mainMT);
  width: 1500px;
  .el-container {
    height: var(--mainH);
  }
  hr {
    margin: 80px auto;
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9eef3;
  color: #333;
  margin-right: 30px;
}
.el-aside {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3dce6;
  color: #333;
}

// main {
//   display: grid;
//   margin-top: var(--mainMT);
//   margin-bottom: var(--mainMB);
//   height: var(--mainH);
//   width: 150rem;
//   transition: all 0.3s;
//   background-color: rgba(255, 255, 255, 0.7);
// }

// @media screen and (max-width: 1550px) {
//   main {
//     width: 140rem;
//   }
// }
// @media screen and (max-width: 1450px) {
//   main {
//     width: 130rem;
//   }
// }

// @media screen and (max-width: 1350px) {
//   main {
//     width: 120rem;
//   }
// }

// @media screen and (max-width: 1250px) {
//   main {
//     width: 90rem;
//   }
// }
// @media screen and (max-width: 1150px) {
//   main {
//     width: 60rem;
//   }
// }
</style>
