<template>
  <div class="">
    <el-tabs class="follow-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`${sex}的关注`" name="first">
        <template v-if="followInfo.following">
          <div v-for="item in followInfo.following" :key="item.id">
            <div class="content-wrapper" @click="goDetail(item.id)">
              <div class="content">
                <Avatar :info="item" disabled />
                <a class="name">{{ item.name }}</a>
                <el-tag v-if="isFollowerMutual(item.id)">互关</el-tag>
              </div>
            </div>
          </div>
        </template>
        <template v-else> <span>这个人很高冷,没有关注别人</span></template>
      </el-tab-pane>
      <el-tab-pane :label="`${sex}的粉丝`" name="second">
        <template v-if="followInfo.follower">
          <div v-for="item in followInfo.follower" :key="item.id">
            <div class="content-wrapper" @click="goDetail(item.id)">
              <div class="content">
                <Avatar :info="item" disabled />
                <a class="name">{{ item.name }}</a>
                <el-tag v-if="isFollowingMutual(item.id)">互关</el-tag>
              </div>
            </div>
          </div>
        </template>
        <template v-else> <span>这个人还没有被别人关注过~</span></template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getFollow } from '@/service/user/user.request';
import Avatar from '@/components/avatar/Avatar.vue';
export default {
  name: 'UserFollow',
  components: { Avatar },
  data() {
    return {
      activeName: 'first'
    };
  },
  computed: {
    ...mapState({
      followInfo: (state) => state.u.followInfo,
      profile: (state) => state.u.profile
    }),
    sex() {
      return this.profile.sex === '男' ? '他' : '她';
    },
    isFollowerMutual() {
      return (itemId) => {
        return this.followInfo.follower?.some((item) => item.id === itemId);
      };
    },
    isFollowingMutual() {
      return (itemId) => {
        return this.followInfo.following?.some((item) => item.id === itemId);
      };
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    goDetail(userId) {
      console.log('goDetail', userId);
      this.$router.push(`/user/${userId}`);
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-tabs__item {
  font-size: 20px;
  width: 100px !important;
  text-align: center;
}
.content-wrapper {
  display: flex;
  border-bottom: 1px solid #e5e6eb;
  padding: 15px;
  cursor: pointer;
  .content {
    display: flex;
    .name {
      margin: 0 30px;
      font-weight: 700;
      font-size: 24px;
    }
  }
}
</style>
