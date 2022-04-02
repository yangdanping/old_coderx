<template>
  <div class="detail-content">
    <el-container>
      <el-main>
        <div class="author-info-block">
          <Avatar :size="90" :info="article.author ?? {}" />
          <div class="author-info-box">
            <h2>{{ article.author?.name ?? '佚名' }}</h2>
            <span>{{ article.createAt }}创建</span>
          </div>
        </div>
        <hr />
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="el-tiptap-editor__content" v-html="article.content"></div>
        <hr />
      </el-main>
    </el-container>
    <detail-panel :article="article" />
  </div>
</template>

<script>
import Avatar from '@/components/avatar/Avatar.vue';
import DetailPanel from './DetailPanel.vue';
export default {
  name: 'DetailContent',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  components: { Avatar, DetailPanel },
  methods: {}
};
</script>

<style lang="less" scoped>
.detail-content {
  margin-top: 80px;
  width: 80%;
  hr {
    margin: 40px auto;
    border: 0;
    height: 6px;
    background-image: linear-gradient(90deg, transparent, var(--yellow), var(--red), var(--pink), var(--purple), var(--blue), transparent);
  }
  .el-main {
    .author-info-block {
      display: flex;
      align-items: center;
      .author-info-box {
        display: flex;
        flex-direction: column;
        height: 70px;
        justify-content: space-around;
        margin-left: 20px;
      }
    }
    .article-title {
      align-items: center;
      font-size: 50px;
      margin-bottom: 50px;
    }
  }
}
</style>
