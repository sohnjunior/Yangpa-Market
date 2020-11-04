<template>
  <v-form v-model="isValid" @submit.prevent="onSubmit">
    <v-text-field
      placeholder="제목"
      solo
      v-model="title"
      :rules="[(v) => !!v || '제목을 입력해주세요']"
    />

    <v-subheader>평점</v-subheader>
    <v-rating v-model="rating" color="amber" background-color="orange lighten-3" />

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
    <v-file-input @change="onChangeFile" label="사진을 첨부하세요" />

    <SubmitButton :isValid="isValid"> 후기 등록 </SubmitButton>
  </v-form>
</template>

<script>
import SubmitButton from '@components/Buttons/SubmitButton';

export default {
  components: { SubmitButton },
  data() {
    return {
      title: '',
      body: '',
      image: '',
      rating: 0,
      isValid: false,
    };
  },

  methods: {
    onSubmit() {
      const payload = {
        title: this.title,
        body: this.body,
        image: this.image,
        rating: this.rating,
      };
      this.$emit('submit-form', payload);
    },
    onChangeFile(file) {
      this.image = file;
    },
  },
};
</script>

<style></style>
