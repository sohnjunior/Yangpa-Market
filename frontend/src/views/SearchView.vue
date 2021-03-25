<template>
  <div class="search-view">
    <SearchInput v-if="isMobileBrowser" />

    <div v-if="isLoading">로딩중</div>
    <div v-else>
      <div v-if="isProductsExist">
        <ProductList v-if="isMobileBrowser" :products="fetchedProducts" />
        <ProductGrid v-else :products="fetchedProducts" />
      </div>
      <Fallback v-else>해당하는 상품이 없어요</Fallback>
      <Pagination :maxPage="maxPageCount" @paginate="onFetchItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ProductAPI } from '../api';
import SearchInput from '@components/Inputs/SearchInput.vue';
import ProductGrid from '@components/Lists/ProductGrid.vue';
import ProductList from '@components/Lists/ProductList.vue';
import Fallback from '@components/Common/Fallback.vue';
import Pagination from '@components/Common/Pagination.vue';
import { IProduct } from '../types';

const SettingModule = namespace('SettingModule');
const DISPLAY_COUNT = 12;

@Component({
  components: { SearchInput, ProductGrid, ProductList, Fallback, Pagination },
})
export default class SearchView extends Vue {
  private keyword!: string;
  private fetchedProducts: IProduct[] = [];
  private isLoading!: boolean;
  private totalFetchedProductsCount = 0;

  @SettingModule.Getter
  public isMobileBrowser!: boolean;

  get isProductsExist() {
    return this.fetchedProducts.length !== 0;
  }

  get maxPageCount() {
    return ~~(this.totalFetchedProductsCount / DISPLAY_COUNT) + 1;
  }

  public async created() {
    this.keyword = this.$route.params?.keyword;
    this.isLoading = true;
    this.onFetchItems(1);
    this.isLoading = false;
  }

  public async onFetchItems(pageNumber: number) {
    try {
      const {
        data: { products, totalCount },
      } = await ProductAPI.searchProduct(this.keyword, pageNumber, DISPLAY_COUNT);

      this.fetchedProducts = products;
      this.totalFetchedProductsCount = totalCount;
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
