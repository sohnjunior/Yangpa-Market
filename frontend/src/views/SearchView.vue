<template>
  <div class="search-view">
    <SearchInput v-if="isMobileBrowser" />

    <div v-if="isLoading">로딩중</div>
    <div v-else>
      <ProductList v-if="isProductsExist" :products="products" />
      <Fallback v-else>해당하는 상품이 없어요</Fallback>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ProductAPI } from '../api';
import SearchInput from '@components/Inputs/SearchInput.vue';
import ProductList from '@components/Lists/ProductList.vue';
import Fallback from '@components/Common/Fallback.vue';
// import { IProductSearchResult } from '../types';

const SettingModule = namespace('SettingModule');

@Component({
  components: { SearchInput, ProductList, Fallback },
})
export default class SearchView extends Vue {
  private keyword!: string;
  private products: any[] = [];
  private isLoading = true;

  @SettingModule.Getter
  public isMobileBrowser!: boolean;

  get isProductsExist() {
    return this.products.length !== 0;
  }

  public async created() {
    try {
      this.keyword = this.$route.params?.keyword;
      const {
        data: { products },
      } = await ProductAPI.searchProduct(this.keyword);

      this.products = products;
      this.isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-view {
  padding: 0px 5px;
}
</style>
