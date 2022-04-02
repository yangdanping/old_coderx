<template>
  <el-dialog :visible.sync="showDialog" @close="hindDialog" @closed="closedDialog" :modal-append-to-body="false" center>
    <LoginPanel v-if="!showProfile" />
    <CompleteProfile v-else :editForm="editForm" />
  </el-dialog>
</template>

<script>
import { eventBus, Msg } from '@/utils';
import CompleteProfile from './profile/CompleteProfile.vue';
import LoginPanel from './login/LoginPanel.vue';
export default {
  name: 'UserDialog',
  data() {
    return {
      showProfile: false,
      editForm: {},
      insertId: null,
      preLogin: {}
    };
  },
  components: { LoginPanel, CompleteProfile },
  mounted() {
    // eventBus.$on('registerSuccess', () => {
    // this.showProfile = !this.showProfile;
    // this.$showSuccess('注册成功!,请完善您的信息');
    // });
    eventBus.$on('updateProfile', (payload) => {
      this.showProfile = !this.showProfile;
      this.editForm = payload;
    });
  },
  computed: {
    showDialog: {
      get() {
        return this.$store.state.showDialog;
      },
      set() {}
    }
  },
  methods: {
    hindDialog() {
      this.$store.commit('changeDialog');
      // if (this.preLogin && this.showProfile) {
      //   console.log('用户选择了跳过用户补全用户信息,直接登陆');
      //   this.$store.dispatch('u/loginAction', this.preLogin);
      // }
    },
    closedDialog() {
      this.showProfile = false;
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  max-width: 900px;
  min-width: 800px;
  animation: fadeShow 1s forwards;
  border-radius: 10px;
}
</style>
