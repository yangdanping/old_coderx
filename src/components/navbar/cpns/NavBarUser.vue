<template>
  <div class="nav-bar-user">
    <el-tooltip class="item" effect="dark" content="反馈中心" placement="bottom">
      <i @click="showFeedBack = true" class="el-icon-message"></i>
    </el-tooltip>
    <el-button class="editbtn" @click="goEdit" type="primary">写文章</el-button>
    <el-dropdown>
      <Avatar :disabled="true" :info="userInfo"></Avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="goProfile">我的空间</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <FeedbackDialog @submit="submitFeedback" @cancel="showFeedBack = false" :show="showFeedBack" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Avatar from '@/components/avatar/Avatar.vue';
import FeedbackDialog from '@/components/dialog/FeedbackDialog.vue';
export default {
  name: 'NavBarUser',
  data() {
    return {
      showFeedBack: false
    };
  },
  components: { Avatar, FeedbackDialog },
  computed: {
    ...mapState({
      userInfo: (state) => state.u.userInfo
    })
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    }
  },
  methods: {
    logOut() {
      this.$store.commit('u/logOut');
    },
    goEdit() {
      this.$router.push({ path: '/edit' });
    },
    goProfile() {
      this.$router.push(`/user/${this.userInfo.id}`);
    },
    //提交反馈
    submitFeedback(content) {
      if (content) {
        this.$store.dispatch('u/feedbackAction', { userId: this.userInfo.id, content });
        this.showFeedBack = false;
      } else {
        this.$showInfo('您没有提交任何反馈');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nav-bar-user {
  display: flex;
  .el-icon-message {
    font-size: 30px;
    margin: 7px 10px 0 10px;
    cursor: pointer;
  }
  .editbtn {
    margin-right: 10px;
    padding: 0 25px;
  }
  .el-dropdown {
    cursor: pointer;
  }
}
</style>
