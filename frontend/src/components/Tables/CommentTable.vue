<template>
  <BaseTable :headers="headers" :items="commentList">
    <template v-slot:table-name>
      <h1>댓글</h1>
      <button @click="onClickCreate">작성하기</button>
    </template>

    <template v-slot:table-action="item">
      <v-icon v-show="hasAuth(item.user.email)" small @click="onClickUpdate(item)">
        mdi-pencil
      </v-icon>
      <v-icon v-show="hasAuth(item.user.email)" small @click="onClickDelete(item)">
        mdi-delete
      </v-icon>
    </template>

    <CommentModal
      :dialog="dialog"
      :isEdit="editFlag"
      @create-comment="createComment"
      @update-comment="updateComment"
      @close-modal="closeModal"
    />
  </BaseTable>

  <!-- <template v-slot:item.comment="{ item }">
          <span
            class="grey--text"
            v-if="!seller && !isAdmin && item.secret && !hasAuth(item.user.email)"
          >
            <v-icon small>mdi-lock</v-icon> 비밀댓글입니다.
          </span>
          <span v-else> {{ item.comment }} </span>
        </template> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentAPI, UserAPI } from '../../api';
import { namespace } from 'vuex-class';
import CommentModal from '@components/Modals/CommentModal.vue';
import BaseTable from '@components/Tables/BaseTable.vue';

const userModule = namespace('UserModule');

const headers = ['작성자', '댓글 내용', ''];

@Component({
  components: { CommentModal, BaseTable },
})
export default class CommentTable extends Vue {
  @Prop({ required: true }) readonly seller!: boolean;

  private dialog = false;
  private commentList = [];
  private postId = '';
  private updateID = 0;
  private editFlag = false;
  private isAdmin = false;
  private headers = headers;

  @userModule.Getter
  public getEmail!: string;

  @userModule.Getter
  public isLoggedIn!: boolean;

  public async created() {
    this.postId = this.$route.params.id;
    const comments = await CommentAPI.fetchComment(this.postId);
    this.commentList = comments.data.comments;

    if (this.isLoggedIn) {
      const {
        data: { isAdmin },
      } = await UserAPI.isAdminUser();
      this.isAdmin = isAdmin;
    }
  }

  hasAuth(target) {
    return target === this.getEmail;
  }

  closeModal() {
    this.dialog = false;
    this.editFlag = false;
  }

  onClickCreate() {
    if (!this.isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    this.dialog = true;
  }

  onClickUpdate({ id, comment }) {
    this.editFlag = true;
    this.dialog = true;
    this.updateID = id;
    this.commentList = comment;
  }

  async createComment({ comment, secret }) {
    try {
      console.log(comment, secret);
      await CommentAPI.createComment({
        postId: this.postId,
        comment,
        secret,
      });
      this.$router.go(0);
    } catch (error) {
      console.error(error);
    }
  }

  async updateComment({ comment }) {
    try {
      await CommentAPI.updateComment({
        commentID: this.updateID,
        payload: { comment },
      });
      this.$router.go(0);
    } catch (err) {
      console.error(err);
    }
  }

  async onClickDelete({ id }) {
    if (confirm('해당 댓글을 삭제하시겠습니까?')) {
      try {
        await CommentAPI.deleteComment({ commentID: id });
        this.$router.go(0);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style></style>
