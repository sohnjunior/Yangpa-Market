<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-img :src="productIMG" class="product-image"/>
        </v-col>
        <v-col>
          <v-row>
            {{ productTitle }} <br>
            {{ productBody }} <br>
            ₩{{ productPrice }}
            <v-btn>장바구니 담기</v-btn>
            <v-btn @click="updateInfo">상품정보 수정</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <h2>연관된 상품</h2>
    </v-container>
    <hr>
    <v-container>
      <h3>댓글</h3>
    </v-container>
  </div>
</template>

<script>
import { retreiveProduct } from '../api/index';
// TODO: 연관된 상품 추천 API 연동
export default {
  data() {
    return {
      productID: '',
      productIMG: '',
      productBody: '',
      productTitle: '',
      productPrice: '',
    }
  },
  async created() {
    this.productID = this.$route.params.id;
    const { data } = await retreiveProduct(this.productID);
    this.productIMG = data.product.image;
    this.productBody = data.body;
    this.productTitle = data.product.title;
    this.productPrice = data.product.price;
  },
  methods: {
    updateInfo() {
      // 상품 정보 업데이트
      this.$router.push(`/product/update/${this.productID}`);
    }
  }
}
</script>

<style scoped>
.product-image {
  width: 30%;
  height: 50%;
}
</style>