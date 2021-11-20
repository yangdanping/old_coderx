<template>
  <div class="comment-form">
    <el-avatar :src="userInfo.avatar_url" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CommentForm',
  data() {
    return {
      value: ''
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.l.userInfo
    })
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-form {
  display: flex;
  padding: 20 0;
}
</style>
