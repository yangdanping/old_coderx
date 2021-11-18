<template>
  <div class="comment-list">
    <span class="comment-title">最近评论({{ article.commentCount }})</span>
    <div v-for="item in commentInfo" :key="item.id" class="list">
      <div class="user">
        <template v-if="item.user"><el-avatar :src="item.user.avatarUrl"></el-avatar></template>
        <template v-else><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></template>
        <div class="user-info-box">
          <span class="name">{{ item.user.name }}</span>
          <div class="floor">
            <span>{{ item.id }}楼</span>
            <span>{{ item.updateAt }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <span>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'CommentList',
  props: {
    commentInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ article: (state) => state.a.article })
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-title {
  font-weight: 300;
  font-size: 30px;
}
.list {
  display: flex;
  flex-direction: column;
  height: 130px;
  margin-top: 30px;
  border-bottom: 1px solid #e5e6eb;
  .user {
    display: flex;
    align-items: center;
    .user-info-box {
      display: flex;
      flex-direction: column;
      margin: 0 15px;

      .name {
        font-weight: 700;
        font-size: 20px;
      }
      .floor span {
        margin-right: 12px;
      }
    }
  }
  .content {
    display: flex;
    justify-content: left;
    margin: 20px 0 0 55px;
  }
}
</style>
