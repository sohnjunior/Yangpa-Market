<template>
  <v-container>
    <h1 class="mt-6 mb-4 sub-title">상품 등록하기</h1>

    <v-container style="width: 60%">
       <v-text-field
        label="Solo"
        placeholder="상품 제목"
        solo
        v-model="title"
        ></v-text-field>

      <v-select
        :items="items"
        label="카테고리 선택"
        solo
        @change="selectCategory"
        ></v-select>

      <v-file-input 
        label="File input" 
        @change="selectFile"
        ></v-file-input>

      <v-text-field
        label="Solo"
        placeholder="상품 가격"
        solo
        v-model="price"
        ></v-text-field>

      <v-textarea
        solo
        auto-grow
        rounded
        v-model="body"
        label="상품 내용입력"
        ></v-textarea>

      <v-btn large color="success" @click="submit">등록하기</v-btn>
    </v-container>
   
  </v-container>
</template>

<script>
import { createNewProduct } from '../api/index';

export default {
  data() {
    return {
      // 지원하고 있는 상품 카테고리
      items: ['전공서적', '원룸', '회원권', '의류', '기타'],

      title: '',
      image: '',
      category: '',
      price: '',
      body: '',
    }
  },

  methods: {
    async submit() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('category', this.category);
      formData.append('body', this.body);
      formData.append('price', this.price);
      formData.append('email', this.$store.getters.getEmail);

      try {
        await createNewProduct(formData);
        this.$router.push('/');
      } catch(err) {
        console.log(err);
      }
    },

    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      this.image = file;
    },

    // 카테고리 선택 시 이벤트 핸들러
    selectCategory(category) {
      let selected = '';
      if(category === '회원권') {
        selected = 'tickets';
      } else if(category === '전공서적') {
        selected = 'books';
      } else if(category === '원룸') {
        selected = 'rooms';
      } else if(category === '의류') {
        selected = 'clothes';
      } else {
        selected = 'others';
      }

      this.category = selected;
    }
  }
}
</script>

<style>
</style>