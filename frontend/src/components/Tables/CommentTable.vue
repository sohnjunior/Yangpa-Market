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
            <v-btn color="warning" depressed @click="newButton"> 작성하기 </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text class="py-0" background-color="blue lighten-2" outline>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-form v-model="valid">
                          <v-textarea
                            v-model="comment"
                            label="댓글을 입력하세요"
                            class="py-5"
                            outlined
                            clearable
                            autofocus
                            auto-grow
                            rows="7"
                            :rules="[(v) => !!v || '댓글을 적어도 1자 이상 입력해주세요!']"
                          ></v-textarea>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-checkbox v-model="secret" label="비밀댓글" class="mx-10"></v-checkbox>
                  <v-btn color="blue darken-1" text @click="confirmButton" :disabled="!valid"
                    >확인</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="closeButton">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.user.nickname="{ item }">
          <span class="font-weight-medium">{{ item.user.nickname }}</span>
        </template>
        <template v-slot:item.comment="{ item }">
          <span
            class="grey--text"
            v-if="!seller && !admin && item.secret && !haveAuth(item.user.email)"
          >
            <v-icon small>mdi-lock</v-icon> 비밀댓글입니다.
          </span>
          <span v-else> {{ item.comment }} </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="mr-2 pen"
            v-show="haveAuth(item.user.email)"
            small
            @click="updateButton(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            class="trash"
            v-show="haveAuth(item.user.email)"
            small
            @click="deleteButton(item)"
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

export default {
  props: ['seller'],
  data() {
    return {
      dialog: false,
      headers: [
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
      ],
      commentList: [],
      postId: '',
      updateId: 0,
      comment: '',
      valid: false,
      editFlag: true,
      secret: false,
      admin: false,
    };
  },

  computed: {
    formTitle() {
      return !this.editFlag ? '댓글 작성' : '댓글 수정';
    },
  },

  async created() {
    this.postId = this.$route.params.id;
    const comments = await CommentAPI.fetchComment(this.postId);
    this.commentList = comments.data.comments;

    // 현재 로그인한 유저라면
    if (this.$store.getters.isLoggedIn) {
      const {
        data: { isAdmin },
      } = await UserAPI.isAdminUser();
      this.admin = isAdmin;
    }
  },

  methods: {
    haveAuth(email) {
      return email === this.$store.getters.getEmail;
    },

    // 삭제 버튼 토글 함수
    deleteButton(item) {
      if (confirm('해당 댓글을 삭제하시겠습니까?')) {
        this.CommentAPI.deleteComments(item);
      }
    },

    // 댓글 수정 토글 함수
    updateButton(item) {
      this.editFlag = true;
      this.dialog = true;
      this.updateId = item.id;
      this.comment = item.comment;
    },

    // 모달 확인버튼 토글 함수
    newButton() {
      if (!this.$store.getters.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      this.comment = '';
      this.editFlag = false;
      this.dialog = true;
    },

    // 모달 확인 버튼 토글 함수
    confirmButton() {
      this.editFlag ? this.updateComments() : this.createComments();
      this.closeButton();
    },

    // 모달 취소 버튼 토글 함수
    closeButton() {
      this.dialog = false;
    },

    // 댓글 삭제 요청 함수
    async deleteComments(item) {
      try {
        await CommentAPI.deleteComment({ commentID: item.id });
      } catch (err) {
        console.error(err);
      } finally {
        this.dialog = false;
      }
    },

    // 댓글 업데이트 함수
    async updateComments() {
      try {
        await CommentAPI.updateComment({
          commentID: this.updateId,
          payload: { comment: this.comment },
        });
      } catch (err) {
        console.error(err);
      }
    },

    // 새로운 댓글 생성하는 axios 통신 함수
    async createComments() {
      const comment = {
        postId: this.postId,
        comment: this.comment,
        secret: this.secret,
      };

      try {
        await CommentAPI.createComment(comment);
        this.$router.go(0); // refresh the page
      } catch (error) {
        console.error(error);
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
