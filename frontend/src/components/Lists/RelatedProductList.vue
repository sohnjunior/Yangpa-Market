<template>
  <ul class="related-container">
    <RelatedProductCard
      v-for="{ product } in relatedProductsWithScore"
      :title="product.name"
      :image="product.photos[0].path"
      :body="product.description"
      :hit="product.views"
      :productID="product.id"
      :price="product.price"
      :key="product.id"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RecommendationAPI } from '../../api';
import RelatedProductCard from '@components/Cards/RelatedProductCard.vue';
import { IRelatedProduct } from '../../types';

@Component({
  components: { RelatedProductCard },
})
export default class RelatedProductList extends Vue {
  @Prop({ required: true }) readonly productID!: number;

  private relatedProductsWithScore: IRelatedProduct[] = [];

  public async created() {
    try {
      const {
        data: { products },
      } = await RecommendationAPI.fetchRelatedProducts(this.productID);

      this.relatedProductsWithScore = products;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.related-container {
  display: flex;
  width: 80%;
  padding: 0;
}

@media screen and (max-width: $mobile-width) {
  .related-container {
    overflow-x: scroll;
    width: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
