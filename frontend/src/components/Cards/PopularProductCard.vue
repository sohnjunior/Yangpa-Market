<template>
  <BaseCard>
    <template v-slot:card-title>
      <div class="card-title-wrapper">
        <h1 class="card-title">
          {{ title }}
        </h1>
        <div class="card-subtitle">
          <v-chip class="mt-2 mb-1" color="success" outlined small>
            {{ category }}
          </v-chip>
        </div>

        <div class="card-subtitle">
          <v-icon color="grey">mdi-eye-check-outline</v-icon>
          <span>{{ hit }}</span>
        </div>
      </div>
    </template>
    <template v-slot:card-body>
      <img class="product-image" alt="상품 이미지" :src="image" />
    </template>
    <template v-slot:card-footer>
      <div>
        <router-link :to="`/product/${productID}`"> 보러가기 </router-link>
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
  background-color: rgba(255, 245, 238, 0.4);

  .card-title {
    font-family: 'Handon3gyeopsal300g';
    font-size: 1.3rem;
    color: black;
  }

  .card-subtitle {
    color: grey;
    font-family: 'HangeulNuri-Bold';
  }
}

.product-image {
  height: 170px;
}

@font-face {
  font-family: 'Handon3gyeopsal300g';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal300g.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>
