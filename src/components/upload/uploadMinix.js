import { ossUploadCertificate } from '@/api/menu.js';
import OSS from 'ali-oss';

export default {
  mounted() {
    // this.getOSSData();
    // console.log('1123');
  },
  methods: {
    getOSSData() {
      return new Promise((resolve, reject) => {
        ossUploadCertificate({ timeout: '3600' })
          .then((res) => {
            if (res.code === 0) {
              window.sessionStorage.setItem('credentials', JSON.stringify(res.data.credentials));
              resolve();
            } else reject();
          })
          .catch((_) => {
            reject();
          });
      });
    },
    getClient() {
      const credentials = window.sessionStorage.getItem('credentials');
      console.log(credentials);
      const { accessKeyId, accessKeySecret, securityToken } = JSON.parse(credentials);
      return new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId,
        accessKeySecret,
        stsToken: securityToken,
        bucket: 'ebf-platform',
        secure: true
      });
    }
  }
};
