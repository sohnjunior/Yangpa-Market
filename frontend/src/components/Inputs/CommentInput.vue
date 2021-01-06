<template>
  <div class="comment-input-container">
    <div class="input-wrapper">
      <textarea class="comment-input" placeholder="상품문의 입력" v-model="inputText" />
    </div>
    <div class="control-wrapper">
      <label><input type="checkbox" name="secret" :checked="isSecret" />비밀댓글</label>
      <button class="submit-btn" @click="onSubmitComment">등록</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { CommentAPI } from '../../api';

const UserModule = namespace('UserModule');

@Component({})
export default class CommentInput extends Vue {
  @Prop({ required: true }) productID!: string;

  private inputText = '';
  private isSecret = false;

  @UserModule.Getter
  public isLoggedIn!: boolean;

  public async onSubmitComment() {
    if (!this.isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    if (this.inputText === '') return;

    try {
      await CommentAPI.createComment({
        postId: this.productID,
        comment: this.inputText,
        secret: this.isSecret,
      });
      this.$router.go(0);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.comment-input-container {
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 50px;
  width: 80%;
  border: 2px solid rgb(238, 238, 238);

  .input-wrapper {
    padding: 30px;

    .comment-input {
      width: 100%;
      outline: none;
      resize: none;
    }
  }

  .control-wrapper {
    display: flex;
    padding: 15px;
    border-top: inherit;

    .submit-btn {
      @include button();
      margin-left: auto;
      padding: 5px 25px;
      background-color: #a5d8ff;
      color: white;
    }
  }
}
</style>
