<template>
  <div class="main-view-container">
    <section class="popular-section">
      <h1 class="subtitle">방금 올라온 상품이에요</h1>
      <ProductCarousel v-if="!isMobileBrowser" />
      <ProductSlideList v-else />
    </section>

    <section class="category-section">
      <CategoryList v-model="selectedCategory" />
    </section>

    <section class="list-section">
      <div class="category-title-wrapper">
        <Icon
          class="category-icon"
          :filename="categoryMap[selectedCategory]"
          width="35"
          height="35"
        />
        <h1>{{ selectedCategory }}</h1>
      </div>
      <div v-if="isProductsExist">
        <ProductList v-if="isMobileBrowser" :products="fetchedProducts" />
        <ProductGrid v-else :products="fetchedProducts" />
      </div>
      <Fallback v-else>등록된 상품이 없어요</Fallback>
      <Pagination :maxPage="maxPageCount" @paginate="onFetchItems" />
    </section>
    <FloatingButton />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ProductAPI } from '../api';
import ProductCarousel from '@components/Carousels/ProductCarousel.vue';
import CategoryList from '@components/Lists/CategoryList.vue';
import FilterList from '@components/Lists/FilterList.vue';
import ProductGrid from '@components/Lists/ProductGrid.vue';
import ProductList from '@components/Lists/ProductList.vue';
import ProductSlideList from '@components/Lists/ProductSlideList.vue';
import Pagination from '@components/Common/Pagination.vue';
import FloatingButton from '@components/Buttons/FloatingButton.vue';
import Icon from '@components/Common/Icon.vue';
import Fallback from '@components/Common/Fallback.vue';
import { IProduct, ICategoryMap } from '../types';

const SettingModule = namespace('SettingModule');
const DISPLAY_COUNT = 10;

@Component({
  components: {
    CategoryList,
    FilterList,
    ProductCarousel,
    ProductGrid,
    ProductList,
    ProductSlideList,
    Pagination,
    FloatingButton,
    Icon,
    Fallback,
  },
})
export default class MainView extends Vue {
  private isLoading!: boolean;
  private fetchedProducts: IProduct[] = [];
  private selectedCategory = '전공서적';
  private selectedFilter = '등록일';
  private totalFetchedProductsCount = 0;
  private categoryMap: ICategoryMap = {
    전공서적: 'books',
    원룸: 'rooms',
    회원권: 'tickets',
    의류: 'clothes',
    기타: 'others',
  };

  @SettingModule.Getter
  public isMobileBrowser!: boolean;

  get sortedProducts() {
    return [...this.fetchedProducts].sort(this.compareFunction);
  }

  get isProductsExist() {
    return this.sortedProducts.length !== 0;
  }

  get maxPageCount() {
    return ~~(this.totalFetchedProductsCount / DISPLAY_COUNT) + 1;
  }

  private compareFunction(a: IProduct, b: IProduct) {
    if (this.selectedFilter === '등록일') {
      return new Date(a.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (this.selectedFilter === '조회수') {
      return b.views - a.views;
    } else {
      return a.price - b.price;
    }
  }

  public async onFetchItems(pageNumber: number) {
    try {
      const {
        data: { products, totalCount },
      } = await ProductAPI.fetchProductsWithCategory(
        this.categoryMap[this.selectedCategory],
        pageNumber,
        DISPLAY_COUNT
      );

      this.fetchedProducts = products;
      this.totalFetchedProductsCount = totalCount;
    } catch (err) {
      console.error(err);
    }
  }

  @Watch('selectedCategory', { immediate: true })
  public onWatchSelectedCategory() {
    this.onFetchItems(1);
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.main-view-container {
  padding: 20px 50px;

  .subtitle {
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .category-section,
  .popular-section,
  .list-section {
    margin-bottom: 50px;
  }

  .category-section {
    display: flex;
    justify-content: center;
  }

  .category-title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 700;

    .category-icon {
      margin-right: 10px;
    }
  }

  @media screen and (max-width: $mobile-width) {
    padding: 10px 20px;

    .subtitle {
      font-size: 1.5rem;
    }
  }
}
</style>
