<template>
  <el-upload action="avatar" :http-request="avatarUpLoad" :disabled="!isUser(info.id)" :show-file-list="false" :before-upload="beforeAvatarUpload">
    <Avatar :disabled="true" :info="info" :size="200" :showSet="true" />
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex';

import Avatar from '@/components/avatar/Avatar.vue';
export default {
  name: 'UserAvatar',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  components: {
    Avatar
  },
  computed: {
    ...mapGetters({ isUser: 'u/isUser' })
  },
  methods: {
    avatarUpLoad(content) {
      this.$store.dispatch('u/uploadAvatarAction', content);
    },
    // handleAvatarSuccess(res, file) {
    //   this.$showSuccess('上传头像成功!');
    // },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      !isLt2M && this.$showInfo('上传头像图片大小不能超过 2MB!');
      return isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-set {
  font-size: 50px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
