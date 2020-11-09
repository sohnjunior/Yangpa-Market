<template>
  <v-container>
    <v-container style="height: 10px">
      <v-row class="text-center mt-5">
        <v-col v-for="category in ['전공서적', '원룸', '회원권', '의류', '기타']" :key="category">
          <CategoryButton :name="category" @click="onSelectCategory" />
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
          <v-carousel-item v-for="n in 2" :key="n">
            <v-row>
              <PopularProductCard
                v-for="(product, i) in populars.slice(5 * (n - 1), 5 * n)"
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

      <v-row>
        <v-col cols="2">
          <h1 class="sub-title">{{ category }}</h1>
        </v-col>
        <v-col cols="2">
          <v-select :items="items" label="정렬기준" outlined v-model="pivot" />
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI, RecommendationAPI } from '../api';
import { Post, Product } from '../types';
import CategoryButton from '@components/Buttons/CategoryButton.vue';
import ProductCard from '@components/Cards/ProductCard.vue';
import PopularProductCard from '@components/Cards/PopularProductCard.vue';

enum categoryMap {
  전공서적 = 'books',
  원룸 = 'rooms',
  회원권 = 'tickets',
  의류 = 'clothes',
  기타 = 'others',
}

@Component({
  components: {
    CategoryButton,
    ProductCard,
    PopularProductCard,
  },
})
export default class MainView extends Vue {
  private pivot: string = '';
  private category: string = '';
  private products: Post[] = [];
  private populars: Post[] = [];
  private items: string[] = ['등록일순', '조회순', '가격순'];

  get categorized() {
    return this.products.filter(
      ({ product }) => product.category.title === categoryMap[this.category]
    );
  }

  get sorted() {
    return [...this.categorized].sort((a: Post, b: Post) => {
      if (this.pivot === '등록일순')
        return new Date(a.createdAt).getTime() - new Date(a.createdAt).getTime();
      else if (this.pivot === '조회순') return b.hit - a.hit;
      else return a.product.price - b.product.price;
    });
  }

  async created(): Promise<void> {
    this.category = '전공서적';
    this.pivot = '등록일순';

    // 전체 상품 조회 API 호출 (날짜순으로 정렬된 상태)
    const { data }: { data: Post[] } = await ProductAPI.fetchAllProducts();
    this.products = data;

    // 인기 상품 조회
    const {
      data: { result },
    }: { data: { result: Post[] } } = await RecommendationAPI.fetchPopularProducts();
    this.populars = result.length > 4 ? result.slice(0, 10) : result;
  }

  public onSelectCategory(category: string): void {
    this.category = category;
  }
}
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
</style>
