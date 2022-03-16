<template>
  <div class="">
    <el-dialog :visible="show" @closed="closed" :before-close="cancelFeedback" title="反馈中心" width="40%" :modal-append-to-body="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="提交反馈" name="submit">
          <el-input type="textarea" v-model="content" placeholder="请输入您的反馈,以帮助改善CoderX" maxlength="100" show-word-limit :rows="5" />
        </el-tab-pane>
        <el-tab-pane label="收到反馈" name="receive">收到反馈</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" v-if="activeName !== 'receive'">
        <el-button @click="cancelFeedback">取 消</el-button>
        <el-button type="primary" @click="submitFeedback">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FeedbackDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'submit',
      content: ''
    };
  },
  components: {},
  computed: {},
  methods: {
    handleClick(tab) {
      if (this.activeName === 'receive') {
        console.log(this.activeName);
      }
    },
    submitFeedback() {
      this.$emit('submit', this.content);
    },
    cancelFeedback() {
      this.$emit('cancel');
    },
    closed() {
      this.content = '';
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-dialog__body {
  padding: 0 10px 10px 10px !important;
}
</style>
