<template>
  <div class="carousel-container">
    <transition name="carousel" mode="out-in">
      <ul class="item-wrapper" :key="currentPage">
        <li class="item" v-for="product in getItemsByPage(currentPage)" :key="product.id">
          <PopularProductCard
            :title="product.title"
            :image="product.image"
            :hit="product.post.hit"
            :category="product.category.title"
            :productID="product.post.title"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import PopularProductMixin from '../../mixins/PopularProductMixin';
import PopularProductCard from '@components/Cards/PopularProductCard.vue';
import { IPost } from '../../types';

const MAX_ITEM_AMOUNT = 10; // mixin 내부 상수값과 동일함
const MAX_ITEMS_PER_PAGE = 5;
const TRANSITION_TIMEOUT = 5000;

@Component({
  components: { PopularProductCard },
})
export default class ProductCarousel extends Mixins(PopularProductMixin) {
  private currentPage = 0;
  private maxPage = MAX_ITEM_AMOUNT / MAX_ITEMS_PER_PAGE;
  private timerID!: number;

  public mounted() {
    this.timerID = setInterval(this.onInterval, TRANSITION_TIMEOUT);
  }

  public destroy() {
    clearInterval(this.timerID);
  }

  public getItemsByPage(page: number): IPost[] {
    const items = this.popularItems.slice(
      MAX_ITEMS_PER_PAGE * page,
      MAX_ITEMS_PER_PAGE * (page + 1)
    );

    return items;
  }

  public onInterval() {
    this.currentPage = (this.currentPage + 1) % this.maxPage;
  }
}
</script>

<style lang="scss" scoped>
.carousel-container {
  width: 100%;

  .item-wrapper {
    display: flex;
    justify-content: center;
    padding: 0;

    .item {
      flex: 0 0 10%;
      margin: 0px 10px;
    }
  }
}

.carousel-enter {
  opacity: 0;
  transform: translateX(50px);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.3s ease;
}
</style>
