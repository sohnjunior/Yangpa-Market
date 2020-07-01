<template>
  <v-content class="pt-5">
    <v-row justify="center">
       <v-data-table :headers="headers" :items="commentList" class="elevation-1 ml-12" style="width: 70%" hide-default-footer>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>댓글</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn color="warning" depressed @click="newComment">
              작성하기
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text class="py-0" background-color="blue lighten-2" outline>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          v-model="comment"
                          label="댓글을 입력하세요"
                          class="py-5"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-checkbox v-model="secret" label="비밀댓글" class="mx-10"></v-checkbox>
                  <v-btn color="blue darken-1" text @click="save">확인</v-btn>
                  <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="updateItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-content>
</template>

<script>
import { registerComment, retreiveComment, deleteComment } from "../api/index";


// TODO: 댓글 수정 및 비밀 댓글 기능 & 작성자에 따른 조건부 랜더링
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "작성자", align: "start", sortable: false, value: "user.nickname"},
        { text: "댓글 내용", align: "start", sortable: false, value: "comment"},
        { text: "비고", align:"middle", value: "actions", sortable: false },
      ],
      commentList: [],
      postId: '',
      comment: '',
      Formflag:-1,
      secret:false,
    };
  },

  async created() {
    this.postId = this.$route.params.id;
    const { data } = await retreiveComment(this.postId);
    this.commentList = data.comments;
  },
  
  computed: {
    formTitle() {
      return this.Formflag === -1 ? "댓글 작성하기" : "댓글 수정";
    },
  },

  methods: {
    updateItem(item) {
      this.editedIndex = this.commentList.indexOf(item);
      this.dialog = true;
    },

    deleteItem(item){
        confirm("해당 댓글을 삭제하시겠습니까?") && deleteComment(item);
    },

    async deleteComment(item) {
      const index = this.commentList.indexOf(item);
      const ToDelete = { id : this.commentList[index].id };

      try {
        const { data } = await deleteComment(ToDelete);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      this.dialog = false;
    },

    close() {
      this.Formflag = -1;
      this.dialog = false;
    },

    // 작성하기 버튼 이벤트 핸들러
    newComment() {
      // 로그인한 유저인지 확인
      if (!this.$store.getters.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      } else {
        this.dialog = true;
      }
    },

    async save() {
      const Comment = {
        email: this.$store.getters.getEmail,
        postId: this.postId,
        comment: this.comment,
        secret: this.secret,
      };

      try {
        await registerComment(Comment);
        this.$router.go(0);  // refresh the page
      } catch (error) {
        console.log(error);
      }

      this.close();
    },
  },
};
</script>

<style></style>
