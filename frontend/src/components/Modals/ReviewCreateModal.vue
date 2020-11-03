<template>
  <div class="text-center">
    <v-dialog :value="show" width="500" @click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline pt-7"> 후기 작성 </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              placeholder="제목"
              solo
              v-model="title"
              :rules="[(v) => !!v || '제목을 입력해주세요']"
            />

            <v-subheader>평점</v-subheader>
            <v-rating color="amber" background-color="orange lighten-3" v-model="rating" />

            <v-subheader>내용</v-subheader>
            <v-textarea
              solo
              rows="7"
              rounded
              auto-grow
              clearable
              v-model="body"
              label="생생한 후기를 남겨주세요!"
              :rules="[(v) => !!v || '후기를 작성해주세요']"
            />

            <v-subheader>사진 첨부</v-subheader>
            <v-file-input label="사진을 첨부하세요" @change="selectFile" />
          </v-form>
          <v-row justify="center">
            <v-btn
              x-large
              width="375"
              rounded
              color="primary"
              @click="handleConfirm"
              :disabled="!valid"
              >후기 등록</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ReviewAPI } from '@api';

export default {
  props: ['show'],
  data() {
    return {
      title: '',
      body: '',
      rating: 0,
      image: null,
      valid: false,
    };
  },
  methods: {
    async handleConfirm() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('body', this.body);
      formData.append('rating', this.rating);
      formData.append('email', this.$store.getters.getEmail);

      const { data } = await ReviewAPI.createReview(formData);
      this.$emit('closeDialog');
    },

    selectFile(file) {
      this.image = file;
    },

    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style></style>
