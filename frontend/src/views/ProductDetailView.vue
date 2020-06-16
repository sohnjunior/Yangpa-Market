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
            <v-btn @click="addCart">장바구니 담기</v-btn>
            <v-btn @click="updateInfo">상품정보 수정</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <h2>연관된 상품</h2>
       <ProductCard v-for="product in related" 
        :title="product[1].title"
        :image="product[1].image"
        :body="product[1].post.body"
        :hit="product[1].post.hit"
        :writer="''"
        :like="product[1].like"
        :productID="product[1].post.title"
        :price="product[1].price"
        :key="product[1].id"/>
    </v-container>
    <hr>
    <v-container>
      <CommentList></CommentList>
    </v-container>
  </div>
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
</style>