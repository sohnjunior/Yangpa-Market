<template>
  <div>
    상품 등록하기

    <v-file-input label="File input" @change="selectFile"></v-file-input>

    <v-btn @click="submit">서버에 전송하기</v-btn>
  </div>
</template>

<script>
import { createNewProduct } from '../api/index';

export default {
  data() {
    return {
      title: 'test title',
      image: '',
      category: 'test category',
      body: 'test body',
    }
  },

  methods: {
    async submit() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('category', this.category);
      formData.append('body', this.body);

      try {
        const { data } = await createNewProduct(formData);
        console.log(data);
      } catch(err) {
        console.log(err);
      }
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