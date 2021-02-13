<template>
  <ul class="comment-container">
    <li class="comment-item" v-for="(item, index) in commentItems" :key="item.id">
      <h3 class="commentor">
        <span class="name">{{ item.author.nickname }}</span>
        <Chip v-if="isSeller(item.author)" text="판매자" color="#74c0fc" width="45" />
      </h3>
      <div>
        <textarea class="comment-edit" v-if="isEditMode(item.id)" :value="item.content" />
        <p v-else class="comment-text">
          {{
            isAllowedForRead(item.isSecret, item.author.email) ? item.content : '비밀 댓글입니다.'
          }}
        </p>
      </div>
      <div class="control-wrapper" v-if="isEditable(item.author.email)">
        <div v-if="isEditMode(item.id)">
          <button @click="onFinishEdit(index)">수정완료</button>
          <button @click="onCancelEdit">취소</button>
        </div>
        <div v-else>
          <button @click="onEditMode(item.id, index)">수정</button>
          <button @click="onRemoveComment(item.id)">삭제</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { CommentAPI, AuthAPI } from '../../api';
import Chip from '@components/Common/Chip.vue';
import { IUserInfo } from '../../types';

const UserModule = namespace('UserModule');

interface IAuthor {
  id: number;
  email: string;
  nickname: string;
  contact: string;
  isAdmin: boolean;
}

@Component({
  components: { Chip },
})
export default class CommentList extends Vue {
  @Prop({ required: true }) readonly productID!: string;
  @Prop({ required: true }) readonly seller!: IUserInfo;

  private commentItems = [];
  private isAdmin = false;
  private editCommentID = -1; // -1일 경우 어떤 댓글도 수정 중이지 않은 상태입니다.

  @UserModule.Getter
  public currentEmail!: string;

  @UserModule.Getter
  public isLoggedIn!: boolean;

  public async created() {
    const {
      data: { comments },
    } = await CommentAPI.fetchComment(this.productID);

    this.commentItems = comments;

    if (this.isLoggedIn) {
      const {
        data: { role },
      } = await AuthAPI.fetchPermission();

      this.isAdmin = role === 'admin';
    }
  }

  public isEditMode(commentID: number) {
    return this.editCommentID === commentID;
  }

  public isEditable(authorEmail: string) {
    return this.currentEmail === authorEmail;
  }

  public isSeller(author: IAuthor) {
    return this.seller.nickname === author.nickname;
  }

  public isAllowedForRead(isSecret: boolean, authorEmail: string) {
    if (!isSecret) return true;
    return this.isAdmin || this.currentEmail === authorEmail;
  }

  public onEditMode(commentID: number, index: number) {
    this.editCommentID = commentID;
    this.$nextTick(() => {
      const $li = this.$el.children[index];
      const $textarea = $li.querySelector('.comment-edit') as HTMLInputElement;

      $textarea.focus();
    });
  }

  public async onFinishEdit(index: number) {
    try {
      const $li = this.$el.children[index];
      const $textarea = $li.querySelector('.comment-edit') as HTMLInputElement;
      const comment = $textarea.value;

      await CommentAPI.updateComment({
        commentID: this.editCommentID,
        payload: { comment },
      });
      this.$router.go(0);
    } catch (err) {
      console.error(err);
    }
  }

  public onCancelEdit() {
    this.editCommentID = -1;
  }

  public async onRemoveComment(commentID: number) {
    const isAllow = confirm('해당 댓글을 삭제하시겠습니까?');
    if (!isAllow) return;

    try {
      await CommentAPI.deleteComment({ commentID });
      this.$router.go(0);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.comment-container {
  padding: 0;
  margin-left: 10%;
  margin-right: 10%;

  .comment-item {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    border-bottom: 1px solid rgb(238, 238, 238);

    .commentor {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #888888;

      .name {
        margin-right: 7px;
      }
    }

    .comment-edit {
      width: 100%;
    }

    .comment-text {
      font-size: 1rem;
    }

    .control-wrapper {
      font-size: 0.8rem;
      font-weight: 500;

      button {
        margin-top: 10px;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
      }

      button:first-child {
        margin-right: 15px;
      }
    }
  }

  @media screen and (max-width: $mobile-width) {
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>
