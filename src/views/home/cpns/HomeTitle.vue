<template>
  <div class="title" :class="{ isHind, isShow }" ref="one" :c="title">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'HomeTitle',
  data() {
    return {
      title: `Welcome to CoderX`,
      isHind: false,
      isShow: false
    };
  },
  components: {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollY = window.pageYOffset;
      if (!this.isHind && scrollY > 50) {
        // if (this.isShow) this.isShow = false; //isShow变为false
        this.isHind = !this.isHind; //isHind变为true
      } else if (this.isHind && scrollY <= 50) {
        // this.isShow = !this.isShow; //isShow变为true
        this.isHind = !this.isHind; //isHind变为false
      }
      // const sc = this.$refs.scrollOne.style;
      // console.log(scrollY);
      // if (scrollY) {
      //   let fz = 200 + scrollY;
      //   sc.fontSize = `${fz}px`;
      //   sc.opacity = fz >= 280 ? 0 : 1;
      // } else {
      //   sc.fontSize = '100px';
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  position: fixed; //注意!fixed的父元素不能有transform,否则会相对于父元素
  left: 50%;
  top: 400px;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.7);
  color: transparent;
  font-size: 100px;
  font-family: monospace;
  overflow: hidden;
  transition: all 0.5s;
  user-select: none;
  // width: 7ch;
  // animation: typing steps(17, jump-none) 2s forwards;
  animation: titleDown 1s forwards;
}

.title::before {
  content: attr(c);
  position: absolute;
  color: transparent;
  left: 0;
  top: 0;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-clip: text;
  clip-path: circle(100px at 0% 50%);
  animation: light 7s infinite;
}

.isHind {
  animation: titleFade 1.5s forwards;
}
.isShow {
  animation: titleFade 2s forwards reverse;
}
</style>
