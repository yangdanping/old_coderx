<template>
  <div class="article-list-item" :key="item.id">
    <div class="article-author">
      <Avatar :info="item.author" :src="item.author.avatarUrl" />
      <div class="author-info-box">
        <span class="name">{{ item.author.name }}</span>
        <span>{{ item.createAt }}</span>
      </div>
      <el-tag color v-for="tag in item.tags" size="small" :key="tag.name" @click="goTag(tag)" type="success">{{ tag.name }}</el-tag>
    </div>
    <div class="content-wrapper">
      <div class="content-main">
        <div class="content" @click="goDetail(item.id)">
          <a class="title">{{ item.title }}</a>
          <p class="abstract">{{ item.content }}</p>
        </div>
        <ArticleAction :article="item" />
      </div>
      <img v-if="item.cover" @click="goDetail(item.id)" :src="item.cover[0]" />
      <div v-else style="width: 170px; height: 120px"></div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/utils';
import Avatar from '@/components/avatar/Avatar.vue';
import ArticleAction from './ArticleAction.vue';
export default {
  name: 'ArticleListItem',
  components: { Avatar, ArticleAction },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    goDetail(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
    },
    goTag(tag) {
      eventBus.$emit('changeTag', tag);
    }
  }
};
</script>

<style lang="less" scoped>
.article-list-item {
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  padding: 20px 15px 0;
  margin: 15px 0;
  border-radius: 10px;
  .article-author {
    display: flex;
    align-items: center;
    .author-info-box {
      display: flex;
      align-items: center;
      margin-left: 15px;
      span {
        color: var(--fc);
      }
    }
    span {
      margin-right: 15px;
    }
    .el-tag {
      cursor: pointer;
    }
  }

  .content-wrapper {
    display: flex;
    border-bottom: 1px solid #e5e6eb;
    padding-bottom: 15px;
    .content-main {
      margin: 10px 0;
      .content {
        cursor: pointer;
      }
      .title {
        font-weight: 700;
        font-size: 24px;
      }
      .abstract {
        height: 20px;
        width: 800px;
        padding: 15px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    img {
      width: 170px;
      height: 120px;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.article-list-item:hover {
  transform: scale(1.01);
  box-shadow: 3px 3px 8px rgba(100, 100, 100, 0.7);
}
</style>
