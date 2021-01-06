<template>
  <ul class="related-container">
    <RelatedProductCard
      v-for="[, info] in relatedProducts"
      :title="info.title"
      :image="info.image"
      :body="info.post.body"
      :hit="info.post.hit"
      :productID="info.post.title"
      :price="info.price"
      :key="info.id"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RecommendationAPI } from '../../api';
import RelatedProductCard from '@components/Cards/RelatedProductCard.vue';

@Component({
  components: { RelatedProductCard },
})
export default class RelatedProductList extends Vue {
  @Prop({ required: true }) readonly productID!: number;

  private relatedProducts: any[] = [];

  public async created() {
    try {
      const {
        data: { result },
      } = await RecommendationAPI.fetchRelatedProducts(this.productID);

      this.relatedProducts = result;
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.related-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
}
</style>
