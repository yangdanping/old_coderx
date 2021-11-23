<template>
  <div class="comment-form">
    <avatar :info="userInfo" />
    <div class="input">
      <editor :emoji="emoji" @onListen="onListen" :isComment="true" :height="190" :width="800" />
      <div class="input-action">
        <!-- <img class="comment-emoji" @click="toogleDialogEmoji" src="~@/assets/img/emoticon.png" /> -->
        <!-- <v-emoji-picker v-show="showDialog" :style="{ width: '300px' }" labelSearch="Search" lang="pt-BR" @select="onSelectEmoji" /> -->
        <el-button @click="addComment" type="primary">发表评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from 'v-emoji-picker';
import { mapState } from 'vuex';
import Avatar from '@/components/avatar/Avatar.vue';
import Editor from '@/components/editor/Editor.vue';

export default {
  name: 'CommentForm',
  data() {
    return {
      content: '',
      showDialog: false,
      emoji: ''
    };
  },
  mounted() {
    console.log(categoriesDefault);
    console.log('Total emojis:', emojisDefault.length);
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.l.userInfo,
      article: (state) => state.a.article
    })
  },
  components: { Avatar, Editor, VEmojiPicker },
  methods: {
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(emoji) {
      this.emoji = emoji.data;
    },
    onListen(content) {
      this.content = content;
    },
    addComment() {
      if (!this.content || this.content === '<p></p>') {
        this.$msg(2, '评论内容不能为空');
      } else {
        this.$store.dispatch('a/commentAction', { content: this.content, articleId: this.article.id });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comment-form {
  display: flex;
  padding: 20 0;
  margin-bottom: 50px;
  .input {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    .input-action {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .comment-emoji {
        width: 26px;
        height: 26px;
        cursor: pointer;
      }
      .emoji-picker {
        position: absolute;
        left: 40px;
      }
    }
  }
}
</style>
