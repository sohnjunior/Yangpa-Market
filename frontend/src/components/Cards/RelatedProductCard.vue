<template>
  <BaseCard class="related-product-container" @click="onRedirect">
    <template v-slot:card-body>
      <img class="product-image" alt="상품이미지" :src="image" />
    </template>
    <template v-slot:card-footer>
      <div>
        <h2 class="product-title">{{ title }}</h2>
        <em class="product-price">₩{{ price }}</em>
        <p class="product-description">{{ body }}</p>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/BaseCard.vue';

@Component({
  components: { BaseCard },
})
export default class RelatedProductCard extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly body!: string;
  @Prop({ required: true }) readonly hit!: number;
  @Prop({ required: true }) readonly price!: string;
  @Prop({ required: true }) readonly productID!: string;

  public onRedirect() {
    this.$router.push(`/product/${this.productID}`);
    this.$router.go(0);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

.related-product-container {
  flex: 0 0 auto;
  width: 230px;
  margin-right: 50px;

  .product-image {
    width: 100%;
    height: 70%;
    margin-bottom: 10px;
    border-radius: 10px;
    object-fit: cover;
  }

  .product-title {
    @include text-shorthand();
    font-size: 1.1rem;
    font-weight: 500;
  }

  .product-price {
    font-size: 0.9rem;
  }

  .product-description {
    @include text-shorthand();
    margin-top: 5px;
    font-size: 0.9rem;
  }
}

@media screen and (max-width: $mobile-width) {
  .related-product-container {
    width: 180px;
    margin-right: 20px;
  }
}
</style>
