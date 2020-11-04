<template>
  <v-content class="pt-5">
    <v-row justify="center">
      <v-data-table
        no-data-text="댓글이 없습니다"
        :headers="headers"
        :items="commentList"
        class="elevation-1 ml-12"
        style="width: 70%"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title style="font-family: 'paybooc-Bold'">댓글</v-toolbar-title>

            <v-spacer />
            <v-btn color="warning" depressed @click="onClickCreate"> 작성하기 </v-btn>
            <CommentModal
              :dialog="dialog"
              :isEdit="editFlag"
              @create-comment="createComment"
              @update-comment="updateComment"
              @close-modal="closeModal"
            />
          </v-toolbar>
        </template>
        <template v-slot:item.user.nickname="{ item }">
          <span class="font-weight-medium">{{ item.user.nickname }}</span>
        </template>
        <template v-slot:item.comment="{ item }">
          <span
            class="grey--text"
            v-if="!seller && !isAdmin && item.secret && !hasAuth(item.user.email)"
          >
            <v-icon small>mdi-lock</v-icon> 비밀댓글입니다.
          </span>
          <span v-else> {{ item.comment }} </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="mr-2 pen"
            v-show="hasAuth(item.user.email)"
            small
            @click="onClickUpdate(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            class="trash"
            v-show="hasAuth(item.user.email)"
            small
            @click="onClickDelete(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-content>
</template>

<script>
import { CommentAPI, UserAPI } from '@api';
import { mapGetters } from 'vuex';
import CommentModal from '@components/Modals/CommentModal';

const headers = [
  {
    text: '작성자',
    align: 'start',
    sortable: false,
    value: 'user.nickname',
    class: 'header',
  },
  {
    text: '댓글 내용',
    align: 'start',
    sortable: false,
    value: 'comment',
    class: 'header',
  },
  { align: 'middle', value: 'actions', sortable: false, class: 'header' },
];

export default {
  components: { CommentModal },
  props: ['seller'],
  data() {
    return {
      dialog: false,
      commentList: [],
      postId: '',
      updateID: 0,
      editFlag: false,
      isAdmin: false,
    };
  },

  computed: {
    ...mapGetters({ isLoggedIn: 'isLoggedIn', userEmail: 'getEmail' }),
  },

  async created() {
    this.headers = headers;
    this.postId = this.$route.params.id;
    const comments = await CommentAPI.fetchComment(this.postId);
    this.commentList = comments.data.comments;

    if (this.isLoggedIn) {
      const {
        data: { isAdmin },
      } = await UserAPI.isAdminUser();
      this.isAdmin = isAdmin;
    }
  },

  methods: {
    hasAuth(target) {
      return target === this.userEmail;
    },

    closeModal() {
      this.dialog = false;
      this.editFlag = false;
    },

    onClickCreate() {
      if (!this.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }
      this.dialog = true;
    },

    onClickUpdate({ id, comment }) {
      this.editFlag = true;
      this.dialog = true;
      this.updateID = id;
      this.comment = comment;
    },

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
    },

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
    },

    async onClickDelete({ id }) {
      if (confirm('해당 댓글을 삭제하시겠습니까?')) {
        try {
          await CommentAPI.deleteComment({ commentID: id });
          this.$router.go(0);
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.pen:hover {
  color: darkgreen;
}
.trash:hover {
  color: red;
}
</style>
