<template>
  <div class="info-container">
    <img class="product-image" alt="상품 이미지" :src="productInfo.image" />
    <div class="info-wrapper">
      <div class="meta-wrapper">
        <h2 class="product-title">{{ productInfo.title }}</h2>
        <span class="product-seller">판매자 : {{ productSeller.nickname }}</span>

        <Chip
          :text="productInfo.sold ? '판매 완료' : '판매 중'"
          :color="productInfo.sold ? '#ff6b6b' : '#40c057'"
        />

        <em class="product-price">₩ {{ productInfo.price }}</em>
        <p class="product-description">{{ productDescription }}</p>
      </div>

      <div class="button-wrapper" v-if="!productInfo.sold">
        <button class="cart-button" @click="onClickAddCart">
          <Icon filename="cart" width="17" height="17" />
          <span class="button-description">장바구니 담기</span>
        </button>
        <button class="like-button" @click="onClickLike">
          <Icon filename="like" width="17" height="17" />
          <span class="button-description">좋아요</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProductAPI } from '../../api';
import Icon from '@components/Common/Icon.vue';
import Chip from '@components/Common/Chip.vue';
import { IProductDetailInfo } from '../../types';

@Component({
  components: { Icon, Chip },
})
export default class DetailProductCard extends Vue {
  @Prop({ required: true }) readonly productID!: string;
  @Prop({ required: true }) readonly productSeller!: any;
  @Prop({ required: true }) readonly productInfo!: IProductDetailInfo;
  @Prop({ required: true }) readonly productDescription!: string;

  public onClickAddCart() {
    this.$emit('add-cart');
  }

  public onClickLike() {
    this.$emit('increase-like');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.info-container {
  @include card-border();
  display: flex;
  width: 80%;
  padding: 50px;
  background-color: #ffffff;

  .product-image {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
  }

  .info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;

    .meta-wrapper {
      display: flex;
      flex-direction: column;

      .product-title {
        font-size: 1.4rem;
        font-weight: 600;
      }

      .product-seller {
        font-size: 1rem;
        font-weight: 500;
        color: #808080;
      }

      .product-price {
        margin-top: 10px;
        font-size: 1.2rem;
        font-weight: 500;
      }

      .product-description {
        margin-top: 20px;
        font-size: 1rem;
      }
    }

    .button-wrapper {
      display: flex;
      margin-top: 20px;

      .cart-button,
      .like-button {
        @include button();
        display: flex;
        align-items: center;
        padding: 10px 15px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #ffffff;
      }

      .cart-button {
        margin-right: 30px;
        background-color: #8ce99a;
      }

      .like-button {
        background-color: #ffa8a8;
      }

      .button-description {
        margin-left: 7px;
      }
    }
  }
}
</style>
