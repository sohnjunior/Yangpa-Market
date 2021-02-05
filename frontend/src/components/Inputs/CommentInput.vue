<template>
  <div class="comment-input-container">
    <div class="input-wrapper">
      <textarea class="comment-input" placeholder="문의를 남겨주세요" v-model="inputText" />
    </div>
    <div class="control-wrapper">
      <div class="secret-control">
        <ToggleButton class="trigger-btn" :width="45" :height="25" @toggle="onToggleSecret" />
        비밀댓글
      </div>
      <button class="submit-btn" @click="onSubmitComment">등록</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { CommentAPI } from '../../api';
import ToggleButton from '@components/Buttons/ToggleButton.vue';

const UserModule = namespace('UserModule');

@Component({
  components: { ToggleButton },
})
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

  public onToggleSecret(isSecret: boolean) {
    this.isSecret = isSecret;
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

.comment-input-container {
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 50px;
  border: 2px solid rgb(238, 238, 238);

  .input-wrapper {
    padding: 30px;

    .comment-input {
      width: 100%;
      outline: none;
    }
  }

  .control-wrapper {
    display: flex;
    padding: 15px;
    border-top: inherit;

    .secret-control {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      font-weight: 500;

      .trigger-btn {
        margin-right: 10px;
      }
    }

    .submit-btn {
      @include button();
      margin-left: auto;
      padding: 5px 25px;
      background-color: #74c0fc;
      color: white;
    }
  }
}

@media screen and (max-width: $mobile-width) {
  .comment-input-container {
    margin-left: 3%;
    margin-right: 3%;
  }
}
</style>
