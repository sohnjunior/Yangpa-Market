<template>
  <BaseCard>
    <template v-slot:card-title>
      <div class="card-title-wrapper">
        <h1 class="card-title">{{ title }}</h1>
        <div class="card-subtitle">
          <Chip :text="category" />
        </div>

        <div class="card-subtitle">조회수 {{ hit }}</div>
      </div>
    </template>
    <template v-slot:card-body>
      <img class="product-image" alt="상품 이미지" :src="image" />
    </template>
    <template v-slot:card-footer>
      <div class="link-wrapper">
        <router-link :to="`/product/${productID}`"> 보러가기 </router-link>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/BaseCard.vue';
import Chip from '@components/Common/Chip.vue';

@Component({
  components: { BaseCard, Chip },
})
export default class PopularProductCard extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly hit!: number;
  @Prop({ required: true }) readonly category!: string;
  @Prop({ required: true }) readonly productID!: string;
}
</script>

<style lang="scss" scoped>
.card-title-wrapper {
  margin-bottom: 5px;

  .card-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
  }

  .card-subtitle {
    font-size: 1rem;
    font-weight: 500;
    color: #808080;
  }
}

.product-image {
  width: 100%;
  height: 170px;
}

.link-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    background-color: #ffab91;
    border-radius: 15px;
    color: #ffffff;
    font-weight: 500;
    text-decoration: none;
  }
}
</style>
