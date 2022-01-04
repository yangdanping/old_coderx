<template>
  <div class="user">
    <nav-bar />
    <user-profile :profile="profile" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '@/components/navbar/NavBar.vue';
import UserProfile from './cpns/UserProfile.vue';
export default {
  name: 'Profile',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('u/getProfileAction', parseInt(this.$route.params.userId));
    if (this.userInfo.id === parseInt(this.$route.params.userId)) {
      this.$msg(1, '获取的是登录用户的信息');
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.u.userInfo,
      profile: (state) => state.u.profile,
      articles: (state) => state.u.articles
    })
  },
  components: { NavBar, UserProfile },
  methods: {}
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg);
  transition: background-color 1s;
}

@import url('@/assets/css/theme/dark.less');
</style>
