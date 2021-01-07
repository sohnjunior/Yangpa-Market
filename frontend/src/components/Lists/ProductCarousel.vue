<template>
  <v-carousel cycle height="400" dark hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="n in 2" :key="n">
      <v-row>
        <PopularProductCard
          v-for="(product, i) in popularItems.slice(5 * (n - 1), 5 * n)"
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RecommendationAPI } from '../../api';
import PopularProductCard from '@components/Cards/PopularProductCard.vue';
import { IPost } from '../../types';

@Component({
  components: { PopularProductCard },
})
export default class ProductCarousel extends Vue {
  private popularItems: IPost[] = [];

  public async created() {
    try {
      const {
        data: { result },
      }: { data: { result: IPost[] } } = await RecommendationAPI.fetchPopularProducts();

      this.popularItems = result.length > 4 ? result.slice(0, 10) : result;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
#carousel-product {
  width: 15%;
  height: 10%;
}
</style>
