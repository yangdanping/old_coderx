<template>
  <div class="avatar">
    <el-popover :disabled="disabled" placement="top-start" trigger="hover" :open-delay="400">
      <div class="user">
        <el-avatar :src="avatarUrl" :size="60"></el-avatar>
        <div>
          <div class="user-info">
            <h2>{{ info.name }}</h2>
            <img :src="userSex" alt="" />
          </div>
          <span class="follow">关注:{{ isFollow('following') }}</span>
          <span>粉丝:{{ isFollow('follower') }}</span>
        </div>
      </div>
      <div class="user-profile">
        <span>{{ info.career ? info.career : 'Coder' }}</span>
        <template v-if="!isUser">
          <el-button :type="!isFollowed ? 'primary' : ''" @click="follow" size="mini">
            {{ !isFollowed ? '关注' : '已关注' }}
          </el-button>
        </template>
      </div>
      <el-avatar @mouseenter.native="mouseenter" @click.native="goProfile" :src="avatarUrl" :size="size" slot="reference"></el-avatar>
    </el-popover>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { debounce } from '@/utils';
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
  components: {},
  computed: {
    ...mapState({
      isLogin: (state) => state.u.token, //根据是否有token判断是否登录(授权)
      userInfo: (state) => state.u.userInfo, //判断是否是当前用户
      isFollowed: (state) => state.u.isFollowed,
      followInfo: (state) => state.u.followInfo
    }),
    isUser() {
      return this.isLogin && this.info.id === this.userInfo.id;
    },
    avatarUrl() {
      const { avatarUrl } = this.info;
      return avatarUrl ?? require('@/assets/img/user/avatar.png');
    },
    userSex() {
      const { sex } = this.info;
      return require(`@/assets/img/user/${sex === '女' ? 'female' : 'male'}.webp`);
    },
    isFollow() {
      return (type) => (this.followInfo[type] ? this.followInfo[type].length : 0);
    }
  },
  methods: {
    // mouseenter() {}, //改完bug后记得注释掉这行
    mouseenter: debounce(
      function () {
        !this.disabled ? this.$store.dispatch('u/getFollowAction', this.info.id) : null;
      },
      400,
      true
    ),
    goProfile() {
      if (!this.disabled) {
        this.$router.push({ path: `/user/${this.info.id}` });
      }
    },
    follow() {
      if (this.isLogin) {
        this.$store.dispatch('u/followAction', this.info.id);
      } else {
        this.$msg(2, '请先登录');
        this.$store.commit('showLogin');
      }
    }
  }
};
</script>

<style lang="less">
.avatar {
  .el-avatar {
    cursor: pointer;
  }
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
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;
    .el-button {
      border: 1px solid rgb(112, 182, 255) !important;
    }
  }
}
</style>
