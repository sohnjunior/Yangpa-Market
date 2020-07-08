<template>
  <v-container>
    <h1 class="mt-6 mb-4">상품 정보수정</h1>

    <v-container style="width: 70%">
    <v-text-field
      label="Solo"
      placeholder="상품 제목"
      solo
      v-model="title"
      ></v-text-field>

    <v-img :src="productIMG" class="product-image"/>

    <v-text-field
      label="Solo"
      placeholder="상품 가격"
      solo
      v-model="price"
      ></v-text-field>

    <v-textarea
      solo
      rounded
      v-model="body"
      label="상품 내용입력"
      ></v-textarea>

    <v-btn @click="submit">상품정보 수정하기</v-btn>
          
    </v-container>
  </v-container>
</template>

<script>
import { retreiveProduct, updateProduct } from '../api/index';

export default {
  data() {
    return {
      productID: '',
      title: '',
      productIMG: '',
      price: '',
      body: '',
    }
  },
  async created() {
    // 상품 초기 입력값을 불러옵니다.
    this.productID = this.$route.params.id;
    const { data } = await retreiveProduct(this.productID);
    this.title = data.product.title;
    this.price = data.product.price;
    this.productIMG = data.product.image;
    this.body = data.body;
  },
  methods: {
    async submit() {
      const updataData = {
        'productId': this.productID,
        'title': this.title,
        'body': this.body,
        'price': this.price,
      };
      
      try {
        const { data } = await updateProduct(this.productID, updataData);
        console.log(data);
      } catch(err) {
        console.log(err);
      }
    },
  }
}
</script>

<style scoped>
.product-image {
  width: 30%;
  height: 50%;
  margin-bottom: 20px;
}
</style>