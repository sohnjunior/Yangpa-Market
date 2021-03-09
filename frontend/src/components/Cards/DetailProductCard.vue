<template>
  <div class="info-container">
    <ImageSwipper class="image-swipper" :images="productInfo.photos" />
    <div class="info-wrapper">
      <div class="seller-wrapper">
        <Avatar :src="sellerInfo.avatar ? seller.avatar : undefined" />
        <div class="seller-description">
          <span>{{ sellerInfo.nickname }}</span>
          <span>{{ sellerInfo.email }}</span>
        </div>
      </div>

      <div class="meta-wrapper">
        <h2 class="product-title">{{ productInfo.name }}</h2>

        <Chip
          :text="productInfo.isSold ? '판매 완료' : '판매 중'"
          :color="productInfo.isSold ? '#ff6b6b' : '#40c057'"
        />

        <em class="product-price">₩ {{ productInfo.price }}</em>
        <p class="product-description">{{ productInfo.description }}</p>
      </div>

      <div class="button-wrapper" v-if="!productInfo.isSold">
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
import Icon from '@components/Common/Icon.vue';
import Chip from '@components/Common/Chip.vue';
import Avatar from '@components/Common/Avatar.vue';
import ImageSwipper from '@components/Carousels/ImageSwipper.vue';
import { IProduct, ISeller } from '../../types';

@Component({
  components: { Icon, Chip, Avatar, ImageSwipper },
})
export default class DetailProductCard extends Vue {
  @Prop({ required: true }) readonly productID!: string;
  @Prop({ required: true }) readonly productInfo!: Partial<IProduct>;
  @Prop({ required: true }) readonly sellerInfo!: ISeller;

  public onClickAddCart() {
    this.$emit('add-cart');
  }

  public onClickLike() {
    this.$emit('increase-like');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

.info-container {
  @include card-border();
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: fit-content;
  padding: 50px;
  background-color: #ffffff;

  .product-image {
    width: 80%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
  }

  .image-swipper {
    width: 80%;
    height: 50%;
    margin-bottom: 30px;
  }

  .info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;

    .seller-wrapper {
      display: flex;
      align-items: center;
      height: 70px;
      padding: 5px;
      margin-bottom: 20px;

      .seller-description {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        font-size: 1rem;
        font-weight: 500;

        span + span {
          margin-top: 5px;
        }
      }
    }

    .meta-wrapper {
      display: flex;
      flex-direction: column;

      .product-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 10px;
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

@media screen and (max-width: $mobile-width) {
  .info-container {
    width: 100%;
    padding: 25px;

    .product-image {
      width: 100%;
    }

    .info-wrapper {
      .seller-wrapper {
        margin-bottom: 5px;
      }

      .meta-wrapper {
        margin-top: 20px;
      }

      .button-wrapper {
        display: flex;
        flex-direction: column;

        .cart-button,
        .like-button {
          justify-content: center;
        }

        .cart-button {
          margin-right: 0px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
