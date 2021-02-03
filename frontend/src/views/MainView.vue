<template>
  <div class="main-view-container">
    <section class="popular-section">
      <h1 class="subtitle">방금 올라온 상품이에요</h1>
      <ProductCarousel v-if="!isMobileBrowser" />
      <ProductSlideList v-else />
    </section>

    <section class="category-section">
      <CategoryList @select="onSelectCategory" />
    </section>

    <section class="list-section">
      <h1 class="subtitle">{{ selectedCategory }}</h1>
      <FilterList @change="onChangeFilter" />
      <ProductGridList v-if="isProductsExist" :products="sortedProducts" />
      <div v-else>상품이 없어요</div>
    </section>
    <FloatingButton />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ProductAPI } from '../api';
import ProductCarousel from '@components/Carousels/ProductCarousel.vue';
import CategoryList from '@components/Lists/CategoryList.vue';
import FilterList from '@components/Lists/FilterList.vue';
import ProductGridList from '@components/Lists/ProductGridList.vue';
import ProductSlideList from '@components/Lists/ProductSlideList.vue';
import FloatingButton from '@components/Buttons/FloatingButton.vue';
import { IPost, IProduct, ICategoryMap } from '../types';

const SettingModule = namespace('SettingModule');

@Component({
  components: {
    CategoryList,
    FilterList,
    ProductCarousel,
    ProductGridList,
    ProductSlideList,
    FloatingButton,
  },
})
export default class MainView extends Vue {
  private fetchedProducts: IPost[] = [];
  private selectedCategory = '전공서적';
  private selectedFilter = '등록일';
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
    const categorized = this.fetchedProducts.filter(
      ({ product }) => product.category.title === this.categoryMap[this.selectedCategory]
    );
    const sorted = [...categorized].sort(this.compareFunction);

    return sorted;
  }

  get isProductsExist() {
    return this.sortedProducts.length !== 0;
  }

  private compareFunction(a: IPost, b: IPost) {
    if (this.selectedFilter === '등록일') {
      return new Date(a.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (this.selectedFilter === '조회수') {
      return b.hit - a.hit;
    } else {
      return a.product.price - b.product.price;
    }
  }

  public async created() {
    /** 전체 상품 조회 (등록일순) */
    try {
      const { data }: { data: IPost[] } = await ProductAPI.fetchAllProducts();

      this.fetchedProducts = data;
    } catch (err) {
      console.error(err);
    }
  }

  public onSelectCategory(category: string) {
    this.selectedCategory = category;
  }

  public onChangeFilter(filter: string) {
    this.selectedFilter = filter;
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

  @media screen and (max-width: $mobile-width) {
    padding: 10px 20px;

    .subtitle {
      font-size: 1.5rem;
    }
  }
}
</style>
