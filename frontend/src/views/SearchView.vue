<template>
  <v-container>
    <h1> {{ keyword }} 검색 결과 </h1>

    <v-container>
      <ProductCard v-for="(product, i) in products" 
        :title="product.title"
        :image="product.image"
        :body="''"
        :hit="product.post.hit"
        :writer="''"
        :like="product.like"
        :productID="product.post.title"
        :key="i"/>
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
    }
  },
  async created() {
    this.keyword = this.$route.params.keyword;
    const { data } = await searchProduct(this.keyword);
    this.products = data.result;
  },
  components: {
    ProductCard,
  }
}
</script>

<style>

</style>