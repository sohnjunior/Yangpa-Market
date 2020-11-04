<template>
  <v-container>
    <h1 class="mt-6 mb-4">상품 정보수정</h1>

    <v-container style="width: 70%">
      <v-text-field label="Solo" placeholder="상품 제목" solo v-model="productTitle" />
      <v-img :src="productIMG" class="product-image" />
      <v-text-field label="Solo" placeholder="상품 가격" solo v-model="price" />
      <v-textarea solo rounded v-model="body" label="상품 내용입력" />
      <v-btn @click="onEditProductInfo">상품정보 수정하기</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { ProductAPI } from '@api';

export default {
  data() {
    return {
      productID: '',
      productTitle: '',
      productIMG: '',
      price: '',
      body: '',
    };
  },

  async created() {
    this.productID = this.$route.params.id;
    const {
      data: { product, body },
    } = await ProductAPI.fetchProduct(this.productID);
    this.productTitle = product.title;
    this.price = product.price;
    this.productIMG = product.image;
    this.body = body;
  },

  methods: {
    async onEditProductInfo() {
      const updataData = {
        productId: this.productID,
        title: this.productTitle,
        body: this.body,
        price: this.price,
      };

      try {
        await ProductAPI.updateProduct(this.productID, updataData);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 30%;
  height: 50%;
  margin-bottom: 20px;
}
</style>
