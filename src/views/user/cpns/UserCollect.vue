<template>
  <div class="user-collect">
    <div class="list-header">
      <div v-if="!articles.length">
        <h2>他的收藏({{ collects.length }})</h2>
      </div>
      <div v-else>
        <h2><i @click="articles = []" class="el-icon-back"></i>收藏夹"{{ activeCollect }}"下的文章({{ articles.length }})</h2>
      </div>
    </div>
    <div v-if="!articles.length">
      <template v-for="item in collects">
        <div class="collect-wrapper">
          <div class="collect-name" @click="goCollectDetial(item.id, item.count)">{{ item.name }}{{ item.count ? `(${item.count.length})` : '' }}</div>
          <span class="collect-time">创建于{{ item.createAt }}</span>
        </div>
      </template>
    </div>
    <div v-else>
      <template v-for="item in articles">
        <div class="content-wrapper">
          <div class="content-main">
            <div class="content" @click="goDetail(item.id)">
              <a class="title">{{ item.title }}</a>
              <div>
                <span>{{ item.createAt }}</span>
                <p class="abstract">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getArtcileByCollectId } from '@/service/user/user.request';
import { timeFormat } from '@/utils';
export default {
  name: 'UserCollect',
  data() {
    return {
      articles: [],
      activeCollect: ''
    };
  },

  components: {},
  computed: {
    ...mapState({
      collects: (state) => state.u.collects,
      profile: (state) => state.u.profile
    })
  },
  methods: {
    goCollectDetial(itemId, count) {
      console.log(count);
      if (!count) {
        this.$showInfo('该收藏夹还没有文章');
      } else {
        const userId = this.profile.id;
        getArtcileByCollectId(userId, itemId).then((res) => {
          if (res.code === 0) {
            this.activeCollect = this.collects.find((collect) => collect.id === itemId).name;
            console.log('选中的收藏夹为', this.activeCollect);
            res.data.forEach((article) => (article.createAt = timeFormat(article.createAt)));
            this.articles = res.data;
          }
          console.log('getArtcileByCollectId', res);
        });
      }
    },
    goDetail(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
    }
  }
};
</script>

<style lang="less" scoped>
.list-header {
  border-bottom: 1px solid #ccc;
}
.el-icon-back {
  font-size: 25px;
  margin-right: 8px;
  cursor: pointer;
}
.collect-wrapper {
  border-bottom: 1px solid #e5e6eb;
  .collect-name {
    font-size: 30px;
    padding: 15px 0;
    cursor: pointer;
  }
  .collect-time {
    font-size: 18px;
  }
}
.content-wrapper {
  display: flex;
  border-bottom: 1px solid #e5e6eb;
  padding-bottom: 15px;

  .content-main {
    margin: 20px 0 20px 20px;
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
}
</style>
