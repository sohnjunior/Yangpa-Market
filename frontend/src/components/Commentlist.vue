<template>
  <v-data-table :headers="headers" :items="commentslist" class="elevation-1" hide-default-footer>
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
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { registerComment,retreiveComment } from "../api/index";

export default {
  props: {
    contentId: Number,
  },
  data() {
    return {
      dialog: false,
      headers: [
          {
          text: "User",
          align: "start",
          sortable: false,
          value: "user",
        },
        {
          text: "Content",
          align: "start",
          sortable: false,
          value: "content",
        },
        { text: "Actions", align:"end", value: "actions", sortable: false },
      ],
      commentslist: [],
      Index:0 ,
      comment:'',
      postId:'',
      secret:false,
    };
  },

  async created() {
    this.postId = this.$route.params.id;
    const { data } = await retreiveComment(this.postId);
    this.comment = data.comments.comment;
  },
  
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.commentslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.commentslist.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.commentslist.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.comments[this.editedIndex], this.editedItem);
      } else {
        this.commentslist.push(this.editedItem);
      }
      
      const Comment = {
        comment:this.content,
      };

      try {
        const { data } = await registerComment(Comment);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      this.close();
    },
  },
};
</script>

<style></style>
