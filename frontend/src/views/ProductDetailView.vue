<template>
  <v-content class="pt-12">
    <v-container style="height: 450px">
      <div class="mb-5">
        <h1 class="sub-title">상품정보</h1>
      </div>
      <v-row class="product-info">
        <v-col>
          <v-img
            :src="productIMG"
            class="product-image"
            width="200"
            height="300"
          />
        </v-col>
        <v-col cols="7">
          <v-row class="mt-9">
            <h2>{{ productTitle }}</h2>
          </v-row>
          <v-row class="mt-5">
            <p>판매자 : {{ productSeller }}</p>
          </v-row>
          <v-row class="mt-4">
            <p>{{ productBody }}</p>
          </v-row>
          <v-row class="mt-7">
            <div id="price">₩ {{ productPrice }}</div>
          </v-row>
          <v-row class="mt-9">
            <v-btn
              tile
              outlined
              color="success"
              large
              depressed
              :disabled="sold"
              @click="addCart"
              style="margin-right: 50px"
            >
              <v-icon v-if="!sold" left>mdi-cart</v-icon>
              {{ sold ? '판매 완료' : '장바구니 담기' }}
            </v-btn>
            <v-btn
              tile
              outlined
              color="success"
              large
              depressed
              @click="likeUpdate"
            >
              <v-icon left>mdi-thumb-up</v-icon>
              좋아요
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="height: 600px">
      <v-content>
        <h2 class="sub-title">이 상품도 함께 봤어요</h2>
        <v-row>
          <RelatedProductCard
            v-for="product in related"
            id="product-card"
            :title="product[1].title"
            :image="product[1].image"
            :body="product[1].post.body"
            :hit="product[1].post.hit"
            :productID="product[1].post.title"
            :price="product[1].price"
            :key="product[1].id"
          />
        </v-row>
      </v-content>
    </v-container>
    <v-spacer class="mt-11"></v-spacer>
    <hr />
    <CommentList :seller="seller"></CommentList>
  </v-content>
</template>

<script>
import { ProductAPI, RecommendationAPI, CartAPI } from '../api';
import CommentList from '../components/CommentList';
import RelatedProductCard from '../components/Cards/RelatedProductCard.vue';
import EventBus from '../utils/bus';

export default {
  components: {
    CommentList,
    RelatedProductCard,
  },
  data() {
    return {
      productID: '',
      productIMG: '',
      productSeller: '',
      productBody: '',
      productTitle: '',
      productPrice: '',
      related: [],
      seller: false,
    };
  },
  async created() {
    this.productID = this.$route.params.id;
    const { data } = await ProductAPI.fetchProduct(this.productID);

    this.productIMG = data.product.image;
    this.productBody = data.body;
    this.productSeller = data.user.nickname;
    this.productTitle = data.product.title;
    this.productPrice = data.product.price;
    this.sold = data.product.sold;
    this.seller = data.user.email === this.$store.getters.getEmail;

    const result = await RecommendationAPI.fetchRelatedProducts(this.productID);
    this.related = result.data.result;
    window.scrollTo(0, 0);
  },
  methods: {
    // 장바구니에 상품 추가
    async addCart() {
      // 로그인한 유저인지 확인
      if (!this.$store.getters.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      const payload = {
        productID: this.productID,
      };
      await CartAPI.createCartProduct(payload);
      EventBus.$emit('popUp', '장바구니에 추가되었습니다.');
    },

    // 좋아요 + 1
    async likeUpdate() {
      await ProductAPI.likeProduct(this.productID);
    },
  },
};
</script>

<style scoped>
.product-info {
  width: 80%;
  border: solid 1px;
  border-radius: 20px;
  border-color: gainsboro;
}
.product-image {
  width: 30%;
  height: 50%;
  margin: 30px 0px 0px 30px;
}
#product-card {
  margin-right: 20px;
  margin-top: 20px;
}
#price {
  font-family: monospace;
  font-size: 1.7rem;
}
</style>
