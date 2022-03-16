<template>
  <div class="user-collect">
    <div class="list-header">
      <h2>他的收藏({{ collects.length }})</h2>
    </div>
    <template v-for="item in collects">
      <div class="collect-wrapper">
        <div class="collect-name" @click="goDetial(item.id)">{{ item.name }}</div>
        <span class="collect-time">创建于{{ item.createAt }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserCollect',
  data() {
    return {};
  },

  components: {},
  computed: {
    ...mapState({
      collects: (state) => state.u.collects
    })
  },
  methods: {
    goDetial(itemId) {
      console.log(itemId);
    }
  }
};
</script>

<style lang="less" scoped>
.list-header {
  border-bottom: 1px solid #ccc;
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
</style>
