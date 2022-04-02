<template>
  <div class="avatar">
    <el-popover :disabled="disabled" placement="top-start" trigger="hover" :open-delay="400">
      <div class="user">
        <el-avatar :src="avatarUrl" :size="60" />
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
        <span>{{ info.career ?? 'Coder' }}</span>
        <template v-if="!isUser(info.id)">
          <el-button @click="follow" :type="!isFollowed ? 'primary' : ''" size="mini">
            {{ !isFollowed ? '关注' : '已关注' }}
          </el-button>
        </template>
      </div>
      <el-avatar @mouseenter.native="mouseenter" @click.native="goProfile" :src="avatarUrl" :size="size" slot="reference" />
    </el-popover>
    <div class="avatar-set" v-if="showSet && isUser(info.id)"><i class="el-icon-edit"></i></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { debounce, Msg } from '@/utils';
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
    showSet: {
      type: Boolean,
      default: false
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
      isFollowed: (state) => state.u.isFollowed,
      followInfo: (state) => state.u.followInfo,
      userInfo: (state) => state.u.userInfo
    }),
    ...mapGetters({ isUser: 'u/isUser' }),
    avatarUrl() {
      const { avatarUrl } = this.info;
      return avatarUrl ?? require('@/assets/img/user/avatar.png');
    },
    userSex() {
      const { sex } = this.info;
      return require(`@/assets/img/user/${sex === '女' ? 'female' : 'male'}-icon.webp`);
    },
    isFollow() {
      return (type) => this.followInfo[type]?.length ?? 0;
    }
  },
  methods: {
    // mouseenter() {}, //改完bug后记得注释掉这行
    mouseenter: debounce(
      function () {
        !this.disabled && this.$store.dispatch('u/getFollowAction', this.info.id);
      },
      400,
      true
    ),
    goProfile() {
      !this.disabled && this.$router.push({ path: `/user/${this.info.id}` });
    },
    follow() {
      if (this.userInfo.id) {
        this.$store.dispatch('u/followAction', this.info.id);
      } else {
        this.$showFail('请先登录');
        this.$store.commit('changeDialog');
      }
    }
  }
};
</script>

<style lang="less">
.avatar {
  position: relative;
  .el-avatar {
    cursor: pointer;
  }
  .avatar-set {
    position: absolute;
    display: none;
    top: 0;
    line-height: 200px;
    font-size: 50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    user-select: none;
  }
}
.avatar:hover {
  .avatar-set {
    display: block;
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
