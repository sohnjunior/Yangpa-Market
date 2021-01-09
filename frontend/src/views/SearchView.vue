<template>
  <div>
    <h1>&quot;{{ keyword }}&quot; 에 대한 검색 결과</h1>

    <ProductGridList v-if="isProductsExist" :products="products" />
    <div v-else>검색 결과에 해당하는 상품이 없어요</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI } from '../api';
import ProductGridList from '@components/Lists/ProductGridList.vue';
import { IPost } from '../types';

// FIXME: 현재 검색 결과로 넘어오는 데이터의 속성값이 IPost 인터페이스와 일치하지 않음(API 를 변경하는 방향으로 수정)
@Component({
  components: { ProductGridList },
})
export default class SearchView extends Vue {
  private keyword = this.$route.params.keyword;
  private products: IPost[] = [];

  get isProductsExist() {
    return this.products.length !== 0;
  }

  public async created() {
    try {
      const {
        data: { result },
      } = await ProductAPI.searchProduct(this.keyword);

      this.products = result;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style></style>
