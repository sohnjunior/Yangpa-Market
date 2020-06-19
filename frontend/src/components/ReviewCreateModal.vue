<template>
  <div class="text-center">
    <v-dialog
      :value="show"
      width="500"
      @click:outside="closeDialog"
    >
      <v-card>

        <v-text-field
          label="Solo"
          placeholder="글 제목"
          solo
          v-model="title"
          ></v-text-field>

        <v-rating v-model="rating"></v-rating>

        <v-textarea
          solo
          rounded
          v-model="body"
          label="글 내용"
          ></v-textarea>

        <v-file-input 
          label="File input" 
          @change="selectFile"
          ></v-file-input>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            후기 등록
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNewReview } from '../api/index';

export default {
  props: ['show'],
  data() {
    return {
      title: '',
      body: '',
      rating: 0,
      image: null,
    }
  },
  methods: {
    // 확인 버튼 클릭 시 이벤트 핸들러
    async closeDialog() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('body', this.body);
      formData.append('rating', this.rating);
      formData.append('email', this.$store.getters.getEmail);

      console.log(formData['title']);

      const { data } = await createNewReview(formData);
      console.log(data);
      this.$emit('closeDialog');
    },

    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      this.image = file;
    },
  }
}
</script>

<style>
</style>