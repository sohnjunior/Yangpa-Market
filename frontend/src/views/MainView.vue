<template>
  <v-container>
    <v-container style="height: 10px">
      <v-row class="text-center mt-5">
        <v-col>
          <v-btn
            color="light-green lighten-4"
            depressed
            x-large
            @click="categorySelected('전공서적')"
          >
            <v-img class="btn-image" :src="require('@/assets/study.svg')" />
            <span class="ml-2 category"> 전공서적 </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="light-green lighten-4" depressed x-large @click="categorySelected('원룸')">
            <v-img class="btn-image" :src="require('@/assets/room.svg')" />
            <span class="ml-2 category"> 원룸 </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="light-green lighten-4"
            depressed
            x-large
            @click="categorySelected('회원권')"
          >
            <v-img class="btn-image" :src="require('@/assets/ticket.svg')" />
            <span class="ml-2 category"> 회원권 </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="light-green lighten-4" depressed x-large @click="categorySelected('의류')">
            <v-img class="btn-image" :src="require('@/assets/clothes.svg')" />
            <span class="ml-2 category"> 의류 </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="light-green lighten-4" depressed x-large @click="categorySelected('기타')">
            <v-img class="btn-image" :src="require('@/assets/box.svg')" />
            <span class="ml-2 category"> 기타 </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-content>
      <v-row class="mt-3">
        <v-col>
          <h1 class="sub-title">실시간 TOP 10</h1>
        </v-col>
      </v-row>
      <v-row class="mt-7">
        <v-carousel cycle height="400" dark hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item>
            <v-row>
              <PopularProductCard
                v-for="(product, i) in populars.slice(0, 5)"
                id="carousel-product"
                class="ml-10"
                :title="product.title"
                :image="product.image"
                :hit="product.post.hit"
                :category="product.category.title"
                :productID="product.post.title"
                :key="i"
              />
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row>
              <PopularProductCard
                v-for="(product, i) in populars.slice(5)"
                id="carousel-product"
                class="ml-10"
                :title="product.title"
                :image="product.image"
                :hit="product.post.hit"
                :category="product.category.title"
                :productID="product.post.title"
                :key="i"
              />
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-row>

      <br />

      <v-row>
        <v-col cols="2">
          <h1 class="sub-title">{{ category }}</h1>
        </v-col>

        <v-col cols="2">
          <v-select :items="items" label="정렬기준" outlined v-model="pivot"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <ProductCard
          v-for="product in sorted"
          id="product-card"
          :title="product.product.title"
          :image="product.product.image"
          :body="product.body"
          :hit="product.hit"
          :writer="product.user.nickname"
          :like="product.product.like"
          :productID="product.title"
          :price="product.product.price"
          :key="product.id"
        />
      </v-row>
    </v-content>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          fab
          dark
          large
          color="pink"
          fixed
          right
          bottom
          to="/product/new"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>새로운 상품을 등록해보세요!</span>
    </v-tooltip>
  </v-container>
</template>

<script>
import { ProductAPI, RecommendationAPI } from '@api';
import ProductCard from '@components/Cards/ProductCard.vue';
import PopularProductCard from '@components/Cards/PopularProductCard.vue';

export default {
  components: {
    ProductCard,
    PopularProductCard,
  },

  data() {
    return {
      items: ['등록일순', '조회순', '가격순'],
      pivot: '',
      products: [],
      populars: [],
      category: '',
      categoryMap: {
        전공서적: 'books',
        원룸: 'rooms',
        회원권: 'tickets',
        의류: 'clothes',
        기타: 'others',
      },
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    };
  },

  computed: {
    categorized() {
      const categorized = [];
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].product.category.title === this.categoryMap[this.category]) {
          categorized.push(this.products[i]);
        }
      }

      return categorized;
    },
    sorted() {
      if (this.pivot === '등록일순') {
        return this.categorized.slice().sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      } else if (this.pivot === '조회순') {
        return this.categorized.slice().sort((a, b) => {
          return b.hit - a.hit;
        });
      } else {
        return this.categorized.slice().sort((a, b) => {
          return a.product.price - b.product.price;
        });
      }
    },
  },

  methods: {
    // 선택된 카테고리에 따라 상품 출력
    categorySelected(category) {
      this.category = category;
    },
  },
  // created 라이프 사이클에 카테고리 전체로 설정하고 상품 데이터 로드
  async created() {
    this.category = '전공서적';
    this.pivot = '등록일순';

    // 전체 상품 조회 API 호출 (날짜순으로 정렬된 상태)
    const { data } = await ProductAPI.fetchAllProducts();
    this.products = data;

    // 인기 상품 조회
    const result = await RecommendationAPI.fetchPopularProducts();
    this.populars = result.data.result;
    if (this.populars.length > 4) {
      this.populars = this.populars.slice(0, 10);
    }
  },
};
</script>

<style scoped>
#product-card {
  margin-right: 20px;
  margin-top: 20px;
}
#carousel-product {
  width: 15%;
  height: 10%;
}
.btn-image {
  width: 30px;
  height: 30px;
}
</style>
