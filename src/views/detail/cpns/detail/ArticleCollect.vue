<template>
  <div class="article-collect">
    <div class="title"><h2>添加到收藏夹</h2></div>
    <div class="collect-list">
      <template v-if="!collects.length">
        <div class="show-msg"><h2>暂无收藏夹☺新建一个吧~</h2></div>
      </template>
      <template v-else>
        <div v-for="item in collects" class="item">
          <div class="item-left">
            <span>{{ item.name }}</span>
            <div v-if="item.count" class="count">1</div>
          </div>
          <i class="el-icon-success" style="color: #81c995; font-size: 22px"></i>
        </div>
      </template>
    </div>
    <div class="new-btn">
      <template v-if="!newCollect"><el-button @click="newCollect = true">新建收藏夹</el-button></template>
      <template v-else>
        <el-input placeholder="请输入新收藏夹" v-model="input" class="search" clearable>
          <el-button slot="append" @click="add" icon="el-icon-plus" :disabled="btnDisabled"></el-button>
        </el-input>
      </template>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/utils';

export default {
  name: 'ArticleCollect',
  props: {
    collects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newCollect: false,
      input: '',
      collectList: [],
      btnDisabled: true
    };
  },
  mounted() {
    eventBus.$on('hideCollect', () => {
      if (this.newCollect) {
        this.newCollect = false;
      }
    });
  },
  watch: {
    input(newV, oldV) {
      this.btnDisabled = newV ? false : true;
    }
  },
  components: {},
  computed: {},
  methods: {
    add() {
      this.$store.dispatch('u/collectAction', this.input);
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}
.collect-list {
  height: 140px;
  width: 100%;
  overflow-y: auto;
  border: 1px solid #eceeef;
  .show-msg {
    margin: 50px auto;
    text-align: center;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    .item-left {
      display: flex;
      .count {
        height: 20px;
        width: 20px;
        line-height: 20px;
        text-align: center;
        color: #b9bec2;
        background-color: #f2f2f2;
        border-radius: 50%;
        margin-left: 10px;
      }
    }
  }
  .item:hover {
    background-color: #f8f9fa;
  }
}
.new-btn {
  display: flex;
  padding: 8px;
}
</style>
