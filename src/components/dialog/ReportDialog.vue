<template>
  <el-dialog :visible="show" @closed="closed" :before-close="cancelReport" title="举报内容" width="30%" :modal-append-to-body="false">
    <el-checkbox-group v-model="reportOptions">
      <el-checkbox v-for="item in reportList" :label="item" :key="item"></el-checkbox>
    </el-checkbox-group>
    <el-input v-model="otherReport" placeholder="其他违规信息" maxlength="10" show-word-limit style="width: 50%; margin-top: 30px" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelReport">取 消</el-button>
      <el-button type="primary" @click="submitReport">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ReportDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reportOptions: [],
      reportList: ['垃圾广告', '辱骂攻击', '涉嫌违法犯罪', '时政信息不实'],
      otherReport: ''
    };
  },
  components: {},
  computed: {},
  methods: {
    submitReport() {
      this.$emit('submit', this.reportOptions, this.otherReport);
    },
    cancelReport() {
      this.$emit('cancel');
    },
    closed() {
      (this.reportOptions = []), (this.otherReport = '');
    }
  }
};
</script>

<style lang="less" scoped></style>
