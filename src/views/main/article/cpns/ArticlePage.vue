<template>
  <div class="article-page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[5, 10]"
      :pager-count="5"
      :total="total"
      layout="sizes,prev,pager,next,jumper"
    />
  </div>
</template>
<!-- 页码器,用于换页和改变文章显示的数量 -->
<script>
import { mapState } from 'vuex';
export default {
  name: 'ArticlePage',
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      total: (state) => state.a.total, //文章总数
      pageNum: (state) => state.a.pageNum, //页数
      pageSize: (state) => state.a.pageSize //每页显示条目个数
    })
  },
  methods: {
    handleCurrentChange(pageNum) {
      this.$store.commit('a/changePageNum', pageNum);
      this.changePage();
    },
    handleSizeChange(pageSize) {
      this.$store.commit('a/changePageSize', pageSize);
      this.changePage();
    },
    changePage() {
      this.$store.dispatch('a/getListAction');
    }
  }
};
</script>

<style lang="less" scoped>
.article-page {
  display: flex;
  justify-content: center;
  .el-pagination {
    background: 0;
    .number {
      font-size: 23px;
    }
  }
}
</style>
