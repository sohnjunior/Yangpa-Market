<template>
  <div>
    상품 등록하기

    <v-btn @click="submit">서버에 전송하기</v-btn>
  </div>
</template>

<script>
import { createNewProduct } from '../api/index';

export default {
  data() {
    return {
      title: 'test title',
      image: 'test image',
      category: 'test category',
      body: 'test body',
    }
  },

  methods: {
    async submit() {
      const newProduct = { title: this.title, image: this.image, category: this.category, body: this.body };
      const { data } = await createNewProduct(newProduct);
      console.log(data);
    }
  }
}
</script>

<style>
</style>