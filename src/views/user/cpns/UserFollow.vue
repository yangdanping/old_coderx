<template>
  <div class="">
    <el-tabs class="follow-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="他的关注" name="他的关注">
        <div v-for="item in followInfo.following" :key="item.id">
          <div class="content-wrapper">
            <div class="content" @click="goDetail(item.id)">
              <Avatar :info="item" disabled />
              <a class="name">{{ item.name }}</a>
              <el-tag v-if="isFollowerMutual(item.id)">互关</el-tag>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="他的粉丝" name="second">
        <div v-for="item in followInfo.follower" :key="item.id">
          <div class="content-wrapper">
            <div class="content-main">
              <div class="content" @click="goDetail(item.id)">
                <Avatar :info="item" disabled />
                <a class="name">{{ item.name }}</a>
                <el-tag v-if="isFollowingMutual(item.id)">互关</el-tag>
              </div>
            </div>
          </div>
        </div>
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
      activeName: '他的关注'
    };
  },
  computed: {
    ...mapState({
      followInfo: (state) => state.u.followInfo,
      profile: (state) => state.u.profile
    }),
    isFollowerMutual() {
      return (itemId) => {
        return this.followInfo.follower.some((item) => item.id === itemId);
      };
    },
    isFollowingMutual() {
      return (itemId) => {
        return this.followInfo.following.some((item) => item.id === itemId);
      };
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
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
