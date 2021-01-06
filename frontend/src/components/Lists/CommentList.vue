<template>
  <ul class="comment-container">
    <li class="comment-item" v-for="(item, index) in commentItems" :key="item.id">
      <h3 class="commentor">
        {{ item.commentor }}
        <span v-if="isSeller(item.commentor)" class="flag">판매자</span>
      </h3>
      <div>
        <textarea class="comment-edit" v-if="isEditMode(item.id)" :value="item.commentText" />
        <p v-else class="comment-text">
          {{
            isAllowedForRead(item.isSecret, item.commentorEmail)
              ? item.commentText
              : '비밀 댓글입니다.'
          }}
        </p>
      </div>
      <div class="control-wrapper" v-if="isEditable(item.commentorEmail)">
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
import { CommentAPI, UserAPI } from '../../api';
import { IUserInfo } from '../../types';

const UserModule = namespace('UserModule');

interface ICommentHistory {
  id: number;
  isSecret: boolean;
  commentText: string;
  commentor: string;
  commentorEmail: string;
}

function normalize({ id, secret, comment, user }): ICommentHistory {
  return {
    id: id,
    isSecret: secret,
    commentText: comment,
    commentor: user.nickname,
    commentorEmail: user.email,
  };
}

@Component({})
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

    this.commentItems = comments.map((comment) => normalize(comment));

    if (this.isLoggedIn) {
      const {
        data: { isAdmin },
      } = await UserAPI.isAdminUser();

      this.isAdmin = isAdmin;
    }
  }

  public isEditMode(commentID: number): boolean {
    return this.editCommentID === commentID;
  }

  public isEditable(commentorEmail: string): boolean {
    return this.currentEmail === commentorEmail;
  }

  public isSeller(commentor: string): boolean {
    return this.seller.nickname === commentor;
  }

  public isAllowedForRead(isSecret: boolean, commentorEmail: string): boolean {
    if (!isSecret) return true;
    return this.isAdmin || this.currentEmail === commentorEmail;
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
    const isAllow: boolean = confirm('해당 댓글을 삭제하시겠습니까?');
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
@mixin outlined-chip($color) {
  padding: 2px 5px;
  margin-left: 10px;
  border: 1px solid $color;
  border-radius: 10px;
  font-size: 0.7rem;
  color: $color;
}

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

      .flag {
        @include outlined-chip(#74c0fc);
      }
    }

    .comment-edit {
      width: 100%;
      resize: none;
    }

    .comment-text {
      font-size: 1rem;
    }

    .control-wrapper {
      font-size: 0.8rem;
      font-weight: 500;

      button:first-child {
        margin-right: 15px;
      }
    }
  }
}
</style>
