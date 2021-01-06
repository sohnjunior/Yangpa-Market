<template>
  <ul class="comment-container">
    <li class="comment-item" v-for="(item, index) in commentItems" :key="item.id">
      <h3 class="commentor">{{ item.commentor }}</h3>
      <div>
        <textarea
          class="comment-edit"
          ref="commentEditInput"
          v-if="isEditMode(item.id)"
          :value="item.commentText"
        />
        <p v-else class="comment-text">{{ item.commentText }}</p>
      </div>
      <div class="control-wrapper">
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
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { CommentAPI, UserAPI } from '../../api';

const UserModule = namespace('UserModule');

interface ICommentHistory {
  id: number;
  commentText: string;
  commentor: string;
}

function normalize({ id, comment, user }): ICommentHistory {
  return {
    id: id,
    commentText: comment,
    commentor: user.nickname,
  };
}

// TODO: 비밀 댓글 기능 추가
@Component({})
export default class CommentList extends Vue {
  @Prop({ required: true }) readonly productID!: string;

  @Ref() readonly commentEditInput!: HTMLInputElement;

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

  public onEditMode(commentID: number, index: number) {
    this.editCommentID = commentID;
    this.$nextTick(() => {
      this.commentEditInput[index].focus();
    });
  }

  public async onFinishEdit(index: number) {
    try {
      const comment = this.commentEditInput[index].value;

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
.comment-container {
  padding: 0;
  margin-left: 10%;
  margin-right: 10%;

  .comment-item {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-bottom: 1px solid rgb(238, 238, 238);

    .commentor {
      margin-bottom: 10px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #888888;
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
