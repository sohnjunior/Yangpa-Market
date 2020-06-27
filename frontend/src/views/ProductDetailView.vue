<template>
  <v-content>
    <v-container style="height: 400px">
      <h2> 상품정보 </h2>
      <v-row>
        <v-col>
          <v-img :src="productIMG" class="product-image" width="200" height="300"/>
        </v-col>
        <v-col>
          <v-row>
            {{ productTitle }} <br>
            {{ productBody }} <br>
            ₩{{ productPrice }} <br>
          </v-row>
          <v-row style="margin-top: 170px">
            <v-btn @click="addCart" style="margin-right: 50px">장바구니 담기</v-btn>
            <v-btn @click="updateInfo">상품정보 수정</v-btn>
            <v-btn @click="updateInfo">상품 구매하기</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="height: 600px">
      <v-content>
        <h2>연관된 상품</h2>
        <v-row>
          <ProductCard v-for="product in related" 
          id="product-card"
          :title="product[1].title"
          :image="product[1].image"
          :body="product[1].post.body"
          :hit="product[1].post.hit"
          :writer="''"
          :like="product[1].like"
          :productID="product[1].post.title"
          :price="product[1].price"
          :key="product[1].id"
          />
        </v-row>
      </v-content>
    </v-container>
    <v-spacer class="mt-11"></v-spacer>
    <hr>
    <CommentList></CommentList>
  </v-content>
</template>

<script>
import { retreiveProduct, relatedProduct, createNewCartProduct } from '../api/index';
import CommentList from '../components/Commentlist';
import ProductCard from '../components/ProductCard.vue';


export default {
  components: {
    CommentList, ProductCard,
  },
  data() {
    return {
      productID: '',
      productIMG: '',
      productBody: '',
      productTitle: '',
      productPrice: '',
      related: [],
    }
  },
  async created() {
    this.productID = this.$route.params.id;
    const { data } = await retreiveProduct(this.productID);
    this.productIMG = data.product.image;
    this.productBody = data.body;
    this.productTitle = data.product.title;
    this.productPrice = data.product.price;

    const result = await relatedProduct(this.productID);
    this.related = result.data.result;
  },
  methods: {
    // 상품 정보 업데이트
    updateInfo() {
      this.$router.push(`/product/update/${this.productID}`);
    },
    // 장바구니에 상품 추가
    async addCart() {
      const payload = { email: this.$store.getters.getEmail, productID: this.productID };
      await createNewCartProduct(payload);
    },
  }
}
</script>

<style scoped>
.product-image {
  width: 30%;
  height: 50%;
}
#product-card {
  margin-right: 20px;
  margin-top: 20px;
}
</style>