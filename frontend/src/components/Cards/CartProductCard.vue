<template>
  <BaseCard @click="onClick">
    <template v-slot:card-body>
      <div class="body-container">
        <img class="product-image" alt="상품 이미지" :src="image" />
        <div class="product-description">
          <em :style="[status ? soldOutStyle : onSaleStyle]">{{ statusMessage }}</em>
          <output>₩ {{ price }} </output>
          <h2 class="product-name">{{ name }}</h2>
        </div>
        <div class="button-wrapper">
          <button class="desktop" @click="onRemoveProduct">삭제</button>
          <Icon class="mobile" filename="close" width="25" height="25" @click="onRemoveProduct" />
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/BaseCard.vue';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { BaseCard, Icon },
})
export default class CartProductCard extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly price!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly status!: string;

  private onSaleStyle = { color: 'darkseagreen' };
  private soldOutStyle = { color: 'tomato' };

  get statusMessage() {
    return this.status ? '판매완료' : '판매중';
  }

  public onRemoveProduct() {
    this.$emit('delete-product', this.id);
    this.$router.go(0);
  }

  public onClick() {
    this.$emit('click');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
@import '../../assets/scss/variables';

.body-container {
  position: relative;
  display: flex;
  width: 600px;

  .product-image {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }

  .product-description {
    display: flex;
    flex-direction: column;
    flex-basis: 62%;
    margin-left: 20px;

    .product-name {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: $mobile-width) {
    .product-description {
      .product-name {
        font-size: 0.9rem;
      }
    }

    & {
      width: 250px;
    }
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .desktop,
    .mobile {
      width: 70px;
      height: 30px;
      border: none;
      border-radius: 10px;
      background-color: #ff6b6b;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }

    .mobile {
      display: none;
    }

    @media screen and (max-width: $mobile-width) {
      .mobile {
        display: block;
        background-color: black;
      }

      .desktop {
        display: none;
      }

      & {
        position: absolute;
        right: 0px;
      }
    }
  }
}
</style>
