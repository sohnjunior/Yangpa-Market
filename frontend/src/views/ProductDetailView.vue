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
            <h2>{{ productTitle }}</h2>
          </v-row>
          <v-row class="mt-5">
            <p>{{ productBody }}</p>
          </v-row>
          <v-row class="mt-9">
            <div id="price">₩ {{ productPrice }}</div>
          </v-row>
          <v-row class="mt-12">
            <v-btn @click="addCart" style="margin-right: 50px">장바구니 담기</v-btn>
            <v-btn @click="buyProduct">상품 구매하기</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="height: 600px">
      <v-content>
        <h2>이 상품도 함께 봤어요</h2>
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
import CommentList from '../components/CommentList';
import ProductCard from '../components/ProductCard.vue';
import EventBus from '../EventBus';


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
    // 장바구니에 상품 추가
    async addCart() {
      // 로그인한 유저인지 확인
      if (!this.$store.getters.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      const payload = { email: this.$store.getters.getEmail, productID: this.productID };
      await createNewCartProduct(payload);
      EventBus.$emit('popUp', '장바구니에 추가되었습니다.');
    },

    // 상품 구매하기
    buyProduct() {
      console.log('상품 구매 구현해주세요!');
    }
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
#price {
  font-family: monospace;
  font-size: 1.7rem;
}
</style>