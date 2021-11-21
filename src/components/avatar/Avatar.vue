<template>
  <div class="avatar">
    <el-popover :disabled="disabled" placement="top-start" trigger="hover">
      <div class="user">
        <el-avatar :src="avatarUrl" :size="60"></el-avatar>
        <div>
          <div class="user-info">
            <h2>{{ info.name }}</h2>
            <img :src="gender" alt="" />
          </div>
          <span class="follow">关注:0</span>
          <span>粉丝:0</span>
        </div>
      </div>
      <div class="user-profile">
        <span>前端工程师</span>
      </div>
      <el-avatar slot="reference" :src="avatarUrl" :size="size"></el-avatar>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    size: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    avatarUrl() {
      const { avatarUrl } = this.info;
      return avatarUrl ?? require('@/assets/img/avatar.png');
    },
    gender() {
      const { gender } = this.info;
      return require(`@/assets/img/${gender ? 'female' : 'male'}.webp`);
    }
  },
  components: {},
  methods: {}
};
</script>

<style lang="less">
.avatar {
  cursor: pointer;
}
.el-popover {
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  .user {
    display: flex;
    align-items: center;
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        margin: 4px 0 0 4px;
        height: 20px;
        width: 20px;
      }
    }
    .follow,
    .el-avatar {
      margin-right: 10px;
    }
  }
  .user-profile {
    display: flex;
    margin-top: 15px;
  }
}
</style>
