<template>
  <div class="comment-list">
    <span class="comment-title">最近评论({{ article.commentCount }})</span>
    <div v-for="item in commentInfo" :key="item.id" class="list">
      <div class="user">
        <avatar :info="item.user" />
        <div class="user-info-box">
          <span class="name">{{ item.user.name }}</span>
          <div class="floor">
            <span>{{ item.id }}楼</span>
            <span>{{ item.updateAt }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <p v-html="item.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Avatar from '@/components/avatar/Avatar.vue';
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
  components: { Avatar },
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
