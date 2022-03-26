<template>
  <div class="">
    <h2></h2>
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
</template>

<script>
export default {
  name: 'UserFollow',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: '12312231231',
          createAt: '一天前',
          content: '1231233321313323132131312312313'
        },
        {
          id: 1,
          title: '12312231231',
          createAt: '一天前',
          content: '1231233321313323132131312312313'
        }
      ]
    };
  },
  components: {},
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
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
