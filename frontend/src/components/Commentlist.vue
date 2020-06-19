<template>
  <v-data-table :headers="headers" :items="commentList" class="elevation-1" hide-default-footer>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>댓글 목록</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                작성하기
            </v-btn>
          </template>
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
                      label="Comment"
                      class="py-5"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-checkbox v-model="secret" label="비밀댓글" class="mx-10"></v-checkbox>
              <v-btn color="blue darken-1" text @click="close">취소</v-btn>
              <v-btn color="blue darken-1" text @click="save">댓글 작성하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="updateItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="checkdelete(item)">
        mdi-delete
      </v-icon>
    </template> -->
  </v-data-table>
</template>

<script>
import { registerComment, retreiveComment } from "../api/index";

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "작성자", align: "start", sortable: false, value: "user.nickname"},
        { text: "댓글 내용", align: "start", sortable: false, value: "comment"},
        // { text: "Actions", align:"end", value: "actions", sortable: false },
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
      return this.Formflag === -1 ? "새 댓글" : "댓글 수정";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    // updateItem(item) {
    //   this.editedIndex = this.commentList.indexOf(item);
    //   this.dialog = true;
    // },

    // checkdelete(item){
    //     confirm("해당 댓글을 삭제하시겠습니까?") &&
    //         deleteComment(item);
    // },

    // async deleteComment(item) {
    //   const index = this.commentList.indexOf(item);

    //   const Todelete={ id : this.commentList[index].id };

    //   try {
    //     const { data } = await deleteComment(Todelete);
    //     console.log(data);
    //     this.$router.go(0);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   this.dialog = false;
    // },

    close() {
        this.Formflag = -1;
      this.dialog = false;
      //this.$router.go(0);
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
        this.$router.go(0);  // refresh 
      } catch (error) {
        console.log(error);
      }

      this.close();
    },
  },
};
</script>

<style></style>
