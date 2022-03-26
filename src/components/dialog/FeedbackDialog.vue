<template>
  <div class="">
    <el-dialog :visible="show" @closed="closed" :before-close="cancelFeedback" title="反馈中心" width="40%" :modal-append-to-body="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="提交反馈" name="submit">
          <el-input type="textarea" v-model="content" placeholder="请输入您的反馈,以帮助改善CoderX" maxlength="100" show-word-limit :rows="5" />
        </el-tab-pane>
        <el-tab-pane label="收到反馈" name="receive">
          <template v-if="replys.length">
            <div v-for="item in replys" :key="item.id">
              <div class="reply">
                <div>
                  <span> {{ item.createAt }}</span>
                  <h3>
                    {{ item.admin }}收到您的反馈:<span style="color: cadetblue">{{ item.content }}</span>
                  </h3>
                </div>
                <h2>
                  并回复:<span style="color: darksalmon">{{ item.reply }}</span>
                </h2>
              </div>
            </div>
          </template>
          <template v-else>
            <h2>您未收到任何回复</h2>
          </template>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" v-if="activeName !== 'receive'">
        <el-button @click="cancelFeedback">取 消</el-button>
        <el-button type="primary" @click="submitFeedback">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { cache, timeFormat } from '@/utils';
import { getFeedbackReply } from '@/service/user/user.request';
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
      content: '',
      replys: []
    };
  },
  components: {},
  computed: {},
  methods: {
    handleClick(tab) {
      if (this.activeName === 'receive') {
        console.log('要查看回复!!!', this.activeName);
        const { id } = cache.getCache('userInfo');
        getFeedbackReply(id).then((res) => {
          if (res.code === '0') {
            res.data.forEach((reply) => (reply.createAt = timeFormat(reply.createAt)));
            this.replys = res.data;
            console.log(this.replys);
          }
        });
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

.reply {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;

  h3,
  h2 {
    margin: 10px 0;
  }
}
</style>
