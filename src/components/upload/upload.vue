<template>
  <el-upload class="avatar-uploader" action="#" ref="up" :accept="accept" :show-file-list="false" :http-request="ossUpload" :before-upload="beforeUpload">
    <img :style="customWidth" v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else :style="iconBorder" class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip" v-if="showUploadingTip" class="uploading">
      <!-- {{ uploading }} -->
    </div>
    <div slot="tip" class="el-upload__tip">{{ editor }}</div>
  </el-upload>
</template>


<script>
import uploadMinix from './uploadMinix.js';
export default {
  mixins: [uploadMinix],
  props: {
    accept: {
      type: String,
      default: '.jpg, .png,.jpeg'
    },
    editor: {
      type: String,
      default: '只能上传jpg/png文件，且不超过2MB'
    },
    uploadingS: {
      //上传状态
      type: Number,
      default: 0
    },
    //上传提示
    showUploadingTip: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 2 //音频：10M，视频：100M
    },
    width: {
      type: String,
      default: ''
    },
    sizeType: {
      type: String,
      deafult: 'MB'
    }
  },
  data() {
    return {
      imageUrl: '',
      bucketName: '',
      uploadingStatus: 0,
      fileList: []
    };
  },
  computed: {
    uploading() {
      if (this.uploadingStatus === 0) return '';
      if (this.uploadingStatus === 1) return '文件上传中...';
      if (this.uploadingStatus === 2) return '文件上传成功！';
      if (this.uploadingStatus === -1) return '文件上传失败！';
    },
    customWidth() {
      if (!this.width) return;
      else return { maxHeight: `${this.width}px`, objectFit: 'cover', border: '1px solid #ccc', padding: '5px' };
    },
    iconBorder() {
      return { border: '1px solid #ccc', height: `${this.width}px`, lineHeight: `${this.width}px` };
    }
  },
  mounted() {},
  created() {
    this.uploadingStatus = this.uploadingS;
    console.log(this.imageUrl);
  },
  methods: {
    // 上传文件逻辑
    ossUpload(op) {
      console.log(op.file);

      let that = this;
      async function getCredentials() {
        return new Promise((resolve, reject) => {
          let credentials = JSON.parse(sessionStorage.getItem('credentials'));
          let expiration;
          if (!!credentials && new Date(credentials.expiration).valueOf() > new Date().valueOf()) {
            resolve();
          }
          if (!credentials) {
            that
              .getOSSData()
              .then((_) => {
                resolve();
              })
              .catch((_) => {
                reject();
              });
          } else expiration = credentials.expiration;
          if (expiration && new Date(expiration).valueOf() < new Date().valueOf()) {
            that
              .getOSSData()
              .then((_) => {
                resolve();
              })
              .catch((_) => {
                reject();
              });
            // that.$notify({
            //   title: "过期提醒",
            //   message: "连接超时，请关闭当前窗口重新选择文件",
            // });
          }
        });
      }
      async function uploadFile() {
        await getCredentials();
        let client = that.getClient();
        // let that = this;
        that.uploadingStatus = 1;
        that.$emit('changeUploadingStatus', that.uploadingStatus);
        client
          .put(`${that.bucketName}${op.file.name}`, op.file)
          .then((res) => {
            console.log(res, '===');
            // 暂时不调用直接emit出去
            if (res.res.status === 200) {
              that.msgSuccess('上传成功');
              that.uploadingStatus = 2;
              that.$emit('changeUploadingStatus', that.uploadingStatus);
              that.imageUrl = res.url;
              that.$emit('setFileData', {
                fileUrl: res.url,
                name: res.name
              });
              // console.log(that.fileUrl);
            } else {
              that.msgError('上传失败');
              that.uploadingStatus = -1;
              that.$emit('changeUploadingStatus', that.uploadingStatus);
            }
          })
          .catch((err) => {
            console.log(err);
            that.$notify({
              title: '过期提醒',
              message: err
            });
          });
      }
      uploadFile();
    },
    beforeUpload(file) {
      console.log(file);
      let isLt2M;
      if (!this.sizeType) isLt2M = file.size / 1024 / 1024 < this.size;
      if (this.sizeType && this.sizeType.includes('KB')) isLt2M = file.size / 1024 < this.size;

      let fileType = true;
      //  严格限制用户上传的文件类型,不同则返回错误
      if (!this.accept.includes(file.type.split('/')[1])) {
        fileType = false;
        setTimeout(() => {
          this.$message.error(`只能上传${this.accept}类型的文件`);
        }, 10);
      }
      if (!isLt2M) {
        this.$message.error(this.editor);
      }
      return isLt2M && fileType;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/deep/ .avatar {
  max-height: 100px;
  max-width: 100px;
  display: block;
}
.uploading {
  float: right;
  margin-right: 50%;
}
.el-upload__tip {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
