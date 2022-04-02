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
      layout="total,sizes,prev,pager,next,jumper"
    />
  </div>
</template>
<!-- 页码器,用于换页和改变文章显示的数量 -->
<script>
import { mapState } from 'vuex';
export default {
  name: 'ArticlePage',
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      pageNum: (state) => state.pageNum, //页数
      pageSize: (state) => state.pageSize //每页显示条目个数
    })
  },
  methods: {
    handleCurrentChange(pageNum) {
      this.$store.commit('changePageNum', pageNum);
      window.scrollTo(0, 0);
      this.$emit('changePage');
    },
    handleSizeChange(pageSize) {
      this.$store.commit('changePageSize', pageSize);
      this.$emit('changePage');
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
