<template>
  <v-container>
    <h1 class="mt-6 mb-4 sub-title">
      &quot;{{ keyword }}&quot; 에 대한 검색 결과
    </h1>

    <v-container>
      <v-row>
        <ProductCard
          v-for="(product, i) in products"
          id="product-card"
          :title="product.title"
          :image="product.image"
          :price="product.price"
          :body="''"
          :hit="product.post.hit"
          :writer="''"
          :like="product.like"
          :productID="product.post.title"
          :key="i"
        />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { searchProduct } from '../api/index';
import ProductCard from '../components/ProductCard.vue';

export default {
  data() {
    return {
      keyword: '',
      products: [],
    };
  },
  async created() {
    this.keyword = this.$route.params.keyword;
    const { data } = await searchProduct(this.keyword);
    this.products = data.result;
  },
  components: {
    ProductCard,
  },
};
</script>

<style scoped>
#product-card {
  margin-right: 20px;
  margin-top: 20px;
}
</style>
