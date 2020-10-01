<template>
  <v-container>
    <h1 class="mt-6 mb-4 sub-title">새로운 중고상품 등록</h1>

    <v-container style="width: 60%">
      <v-form v-model="valid">
        <v-subheader>상품명</v-subheader>
        <v-text-field
          label="Solo"
          placeholder="어떤 상품인가요?"
          solo
          :rules="titleRules"
          v-model="title"
        ></v-text-field>

        <v-subheader>상품 카테고리</v-subheader>
        <v-select
          :items="items"
          label="카테고리 선택"
          solo
          :rules="categoryRules"
          @change="selectCategory"
        ></v-select>

        <v-subheader>상품 사진</v-subheader>
        <v-file-input
          label="File input"
          :rules="fileRules"
          @change="selectFile"
        ></v-file-input>

        <v-subheader>희망 가격</v-subheader>
        <v-text-field
          label="Solo"
          placeholder="상품 가격"
          solo
          :rules="priceRules"
          v-model="price"
        ></v-text-field>

        <v-subheader>상품 설명</v-subheader>
        <v-textarea
          label="상품 내용입력"
          solo
          auto-grow
          rounded
          :rules="bodyRules"
          v-model="body"
        ></v-textarea>
      </v-form>
      <v-btn
        class="mt-6"
        x-large
        color="success"
        :disabled="!valid"
        @click="submit"
        >등록하기</v-btn
      >
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
      valid: false,

      // 필드 규칙
      titleRules: [(v) => !!v || '상품명을 입력해주세요'],
      priceRules: [(v) => !!v || '가격을 입력해주세요'],
      bodyRules: [(v) => !!v || '상품에 대해 설명해주세요'],
      categoryRules: [(v) => !!v || '상품군이 무엇인가요?'],
      fileRules: [(v) => !!v || '상품 사진이 필요해요'],
    };
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
      } catch (err) {
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
      if (category === '회원권') {
        selected = 'tickets';
      } else if (category === '전공서적') {
        selected = 'books';
      } else if (category === '원룸') {
        selected = 'rooms';
      } else if (category === '의류') {
        selected = 'clothes';
      } else {
        selected = 'others';
      }

      this.category = selected;
    },
  },
};
</script>

<style></style>
