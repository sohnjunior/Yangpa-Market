<template>
  <v-container>
    <h1 class="mt-6 mb-4 sub-title">&quot;{{ keyword }}&quot; 에 대한 검색 결과</h1>

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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IPost } from '../types';
import { ProductAPI } from '../api';
import ProductCard from '@components/Cards/ProductCard.vue';

@Component({
  components: { ProductCard },
})
export default class SearchView extends Vue {
  private keyword: string = '';
  private products: IPost[] = [];

  public async created() {
    this.keyword = this.$route.params.keyword;
    const {
      data: { result },
    } = await ProductAPI.searchProduct(this.keyword);
    this.products = result;
  }
}
</script>

<style scoped>
#product-card {
  margin-right: 20px;
  margin-top: 20px;
}
</style>
