<template>
  <BaseCard @onClick="move">
    <template v-slot:card-title>
      <div class="product-header-wrapper">
        <h1 class="product-name">{{ title }}</h1>
        <h2 class="product-seller">{{ writer }}</h2>
        <h2 class="product-meta">조회수 {{ hit }}</h2>
      </div>
    </template>
    <template v-slot:card-body>
      <div class="body-wrapper">
        <div class="image-wrapper">
          <img class="product-image" alt="상품 이미지" :src="image" />
        </div>
        <p class="product-detail">{{ body }}</p>
      </div>
    </template>
    <template v-slot:card-footer>
      <div class="footer-wrapper">
        <em>{{ price }} 원</em>
        <div class="like">
          <v-icon color="pink">mdi-heart</v-icon>
          {{ like }}
        </div>
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
export default class ProductCard extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) image!: string;
  @Prop({ required: true }) body!: string;
  @Prop({ required: true }) hit!: number;
  @Prop({ required: true }) writer!: string;
  @Prop({ required: true }) like!: number;
  @Prop({ required: true }) price!: string;
  @Prop({ required: true }) productID!: string;

  public move() {
    this.$router.push(`/product/${this.productID}`);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.product-header-wrapper {
  width: 220px;

  .product-name {
    @include text-shorthand();
    font-size: 1.3rem;
    font-weight: 600;
  }

  .product-seller {
    margin-top: 7px;
    margin-bottom: 5px;
    font-size: 1rem;
    font-weight: 500;
  }

  .product-meta {
    font-size: 1rem;
    font-weight: 500;
    color: #808080;
  }
}

.body-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;

  .image-wrapper {
    display: flex;
    justify-content: center;

    .product-image {
      height: 170px;
      margin: 20px 0px;
      object-fit: cover;
    }
  }

  .product-detail {
    @include text-shorthand();
  }
}

.footer-wrapper {
  display: flex;

  .like {
    margin-left: auto;
  }
}
</style>
