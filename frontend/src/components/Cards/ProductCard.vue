<template>
  <BaseCard @click="move">
    <template v-slot:card-title>
      <div>
        <div class="product-name">
          {{ title }}
        </div>
        <div class="product-seller">
          {{ writer }}
        </div>
        <div class="product-meta">
          <v-icon>mdi-eye-check-outline</v-icon>
          {{ hit }}
        </div>
      </div>
    </template>
    <template v-slot:card-body>
      <img class="product-image" alt="상품 이미지" :src="image" />
    </template>
    <template v-slot:card-footer>
      <div>
        <div>
          {{ body }}
        </div>

        <div>
          <em>{{ price }} 원</em>
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

  public move(): void {
    this.$router.push(`/product/${this.productID}`);
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Handon3gyeopsal300g';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal300g.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.product-name {
  font-family: 'Handon3gyeopsal300g';
  font-size: 1.3rem;
}

.product-seller {
  margin-top: 7px;
  margin-bottom: 5px;
  font-size: 1rem;
}

.product-meta {
  font-family: 'HangeulNuri-Bold';
  font-size: 1rem;
}

.product-image {
  height: 170px;
}
</style>
