<template>
  <BaseCard @click="onRedirect">
    <template v-slot:card-title>
      <div class="card-title-wrapper">
        <h1 class="card-title">{{ title }}</h1>
        <div class="card-subtitle">
          <Chip :text="category" color="#40c057" width="55" />
        </div>

        <div class="card-subtitle">
          <Icon class="icon" filename="glasses" width="20" height="20" />
          {{ hit }}
        </div>
      </div>
    </template>
    <template v-slot:card-body>
      <img class="product-image" alt="상품 이미지" :src="image" />
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/common/BaseCard.vue';
import Chip from '@components/Common/Chip.vue';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { BaseCard, Chip, Icon },
})
export default class PopularProductCard extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly hit!: number;
  @Prop({ required: true }) readonly category!: string;
  @Prop({ required: true }) readonly productID!: string;

  public onRedirect() {
    this.$router.push(`/product/${this.productID}`);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.card-title-wrapper {
  width: 125px;
  margin-bottom: 5px;

  .card-title {
    @include text-shorthand();
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
  }

  .card-subtitle {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: #808080;

    .icon {
      margin-right: 5px;
    }
  }
}

.product-image {
  width: 100%;
  height: 170px;
  border-radius: 10px;
  object-fit: cover;
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
