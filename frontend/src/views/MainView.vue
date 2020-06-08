<template>
  <v-container>
    <v-container style="height: 10px;">
      <v-row class="text-center">
        <v-col>
          <v-btn @click="categorySelected('전공서적')">전공서적</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="categorySelected('원룸')">원룸</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="categorySelected('회원권')">회원권</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="categorySelected('의류')">의류</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="categorySelected('기타')">기타</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-content>
      <v-row>
      <v-col>
        <h1>실시간 인기 상품</h1>
      </v-col>
    </v-row>
    <ProductCard v-for="(product, i) in populars" 
    :title="product.title"
    :image="product.image"
    :body="product.post.body"
    :hit="product.post.hit"
    :writer="`분류 : ${product.category.title}`"
    :like="product.like"
    :productID="product.post.title"
    :key="i"/>

    <v-row>
      <v-col>
        <h1>{{ category }}</h1>
      </v-col>
    </v-row>
    <ProductCard v-for="(product, i) in categotized" 
    :title="product.product.title"
    :image="product.product.image"
    :body="product.body"
    :hit="product.hit"
    :writer="product.user.nickname"
    :like="product.product.like"
    :productID="product.title"
    :key="i"/>
    </v-content>
    <v-fab-transition>
      <v-btn
        color="pink"
        dark
        absolute
        bottom
        right
        fab
        to="/product/new"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { retriveAllProducts, realtimePopular } from '../api/index';
import ProductCard from '../components/ProductCard.vue';

export default {
  data() {
    return {
      products: [],
      populars: [],
      category: '',
      categoryMap: {
        "전공서적": "books",
        "원룸": "rooms",
        "회원권": "tickets",
        "의류" : "clothes",
        "기타": "others",
      }
    }
  },
  computed: {
    categotized() {
      const categorized = [];
      for(let i=0; i < this.products.length; i++) {
        if(this.products[i].product.category.title === this.categoryMap[this.category]) {
          categorized.push(this.products[i]);
        }
      }

      return categorized;
    },
  },
  components: {
    ProductCard,
  },
  methods: {
    // 선택된 카테고리에 따라 상품 출력
    categorySelected(category) {
      this.category = category;
    }
  },
  // created 라이프 사이클에 카테고리 전체로 설정하고 상품 데이터 로드
  async created() {
    this.category = '전공서적';
    
    // 전체 상품 조회 API 호출 (날짜순으로 정렬된 상태)
    const { data } = await retriveAllProducts();
    this.products = data;
    
    // 인기 상품 조회
    const result = await realtimePopular();
    this.populars = result.data.result;
  }
}
</script>

<style>
</style>