<template>
  <div class="user-profile">
    <div class="profile-header">
      <UserAvatar :info="profile" />
      <div class="profile-info">
        <div class="profile-1">
          <span class="name">{{ profile.name }}</span>
          <img :src="userSex" alt="" />
          <el-tag v-if="isUser(profile.id)" @click="updateProfile" type="info" size="mini"><i class="el-icon-edit"></i>修改个人信息</el-tag>
        </div>
        <div class="profile-2">
          <i class="el-icon-coin"></i>
          <span>年龄:{{ profile.age ?? '无' }}</span>
        </div>
        <div class="profile-3">
          <i class="el-icon-suitcase"></i>
          <span>职业:{{ profile.career ?? 'Coder' }}</span>
        </div>
        <div class="profile-4">
          <i class="el-icon-coordinate"></i>
          <span>居住地:{{ profile.address ?? 'CoderX星球' }}</span>
        </div>
        <div class="profile-5">
          <i class="el-icon-takeaway-box"></i>
          <span>邮箱:{{ profile.email ?? '无' }}</span>
        </div>
        <div class="follow" v-if="!isUser(profile.id)">
          <el-button @click="follow" :type="!isFollowed ? 'primary' : ''" :icon="!isFollowed ? 'el-icon-plus' : ''">
            {{ !isFollowed ? '关注' : '已关注' }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="profile-main">
      <UserProfileMenu @tabClick="tabClick" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
import UserProfileMenu from './UserProfileMenu.vue';
import UserAvatar from './UserAvatar.vue';
export default {
  name: 'UserSpace',
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  components: { Avatar, UserProfileMenu, UserAvatar },
  computed: {
    ...mapState({
      isFollowed: (state) => state.u.isFollowed,
      followInfo: (state) => state.u.followInfo,
      userInfo: (state) => state.u.userInfo
    }),
    userSex() {
      const { sex } = this.profile;
      return require(`@/assets/img/user/${sex === '女' ? 'female' : 'male'}-icon.webp`);
    },
    ...mapGetters({ isUser: 'u/isUser' })
  },
  methods: {
    updateProfile() {
      this.$store.commit('changeDialog');
      eventBus.$emit('updateProfile', JSON.parse(JSON.stringify(this.profile))); //深拷贝
    },
    follow() {
      if (this.userInfo.id) {
        this.$store.dispatch('u/followAction', this.profile.id);
      } else {
        this.$showFail('请先登录');
        this.$store.commit('changeDialog');
      }
    },
    tabClick(index) {
      const userId = this.profile.id;
      switch (index) {
        case '2':
          this.$store.dispatch('u/getCommentAction', userId);
          break;
        case '3':
          this.$store.dispatch('u/getCollectAction', userId);
          break;
        case '4':
          this.$store.dispatch('u/getFollowAction', userId);
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  margin-top: 80px;
  // height: 100vh;//高度是个坑!!!不要设置高度!!!
  width: 60%;
  .profile-header,
  .profile-main {
    display: flex;
  }
  .profile-header {
    .profile-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 15px 0 0 30px;
      .name {
        font-weight: 700;
        font-size: 35px;
      }
      .el-tag {
        font-size: 17px;
        cursor: pointer;
      }
      [class^='profile-'] {
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-size: 25px;
      }
      .follow {
        display: flex;
        justify-content: right;
        .el-button {
          width: 120px;
          font-size: 20px;
        }
      }
    }
  }
  .profile-main {
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }
}
</style>
