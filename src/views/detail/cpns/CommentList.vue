<template>
  <div class="comment-list">
    <span class="comment-title">最近评论({{ commentInfo.length }})</span>
    <div v-for="(item, index) in commentInfo" :key="item.id" class="list">
      <div class="user">
        <avatar :info="item.user" />
        <div class="user-info-box">
          <span class="name">{{ item.user.name }}</span>
          <div class="floor">
            <span>{{ index + 1 }}楼</span>
            <span>{{ item.updateAt }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <p v-html="item.content"></p>
      </div>
      <comment-tools :editData="item.content" :commentId="item.id" :userId="item.user.id" class="comment-tools" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar/Avatar.vue';
import Editor from '@/components/editor/Editor.vue';
import CommentTools from './CommentTools.vue';
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
  components: { Avatar, Editor, CommentTools },
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-title {
  font-weight: 300;
  font-size: 30px;
}
.list {
  position: relative;
  display: flex;
  flex-direction: column;
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
        margin-bottom: 5px;
      }
      .floor span {
        margin-right: 12px;
      }
    }
  }
  .content {
    display: flex;
    justify-content: left;
    padding: 40px 0 40px 54px;
  }
  .comment-tools {
    display: none;
    position: absolute;
    right: 0;
  }
}
.list:hover .comment-tools {
  display: block;
}
</style>
