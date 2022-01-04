<template>
  <div class="user-profile">
    <div class="profile-header">
      <avatar :disabled="true" :info="profile" :size="200" />
      <div class="profile-info">
        <div class="profile-1">
          <span class="name">{{ profile.name }}</span>
          <img :src="userSex" alt="" />
        </div>
        <div class="profile-2">
          <i class="el-icon-suitcase"></i>
          <span>职业:{{ profile.career ? profile.career : 'Coder' }}</span>
        </div>
        <div class="profile-3">
          <i class="el-icon-coordinate"></i>
          <span>居住地:{{ profile.province ? profile.province : 'CoderX星球' }}</span>
        </div>
        <div class="profile-4">
          <i class="el-icon-price-tag"></i>
          <span>个人简介:{{ profile.sign ? profile.sign : '这个人没有填简介啊~~~' }}</span>
        </div>
      </div>
    </div>
    <div class="profile-main">
      <user-profile-menu @tabClick="tabClick" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar/Avatar.vue';
import UserProfileMenu from './UserProfileMenu.vue';
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
  components: { Avatar, UserProfileMenu },
  computed: {
    userSex() {
      const { sex } = this.profile;
      return require(`@/assets/img/user/${sex === '女' ? 'female' : 'male'}.webp`);
    }
  },
  methods: {
    tabClick(index) {
      if (index === '2') {
        this.$store.dispatch('u/getCommentAction', this.profile.id);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  margin-top: 80px;
  height: 100vh;
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
      [class^='profile-'] {
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-size: 25px;
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
