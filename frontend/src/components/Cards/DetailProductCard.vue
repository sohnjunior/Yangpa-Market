<template>
  <div class="info-container" v-if="isFetchFinished">
    <img class="product-image" alt="상품 이미지" :src="productInfo.image" />
    <div class="info-wrapper">
      <div class="meta-wrapper">
        <h2 class="product-title">{{ productInfo.title }}</h2>
        <span class="product-seller">판매자 : {{ productSeller.nickname }}</span>
        <em class="product-price">₩ {{ productInfo.price }}</em>
        <p class="product-description">{{ productDescription }}</p>
      </div>

      <div class="button-wrapper">
        <button class="cart-button" :disabled="productInfo.sold" @click="onClickAddCart">
          <v-icon v-if="!productInfo.sold">mdi-cart</v-icon>
          {{ productInfo.sold ? '판매 완료' : '장바구니 담기' }}
        </button>
        <button class="like-button" @click="onClickLike">
          <v-icon>mdi-thumb-up</v-icon>
          좋아요
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProductAPI } from '../../api';

interface IProductDetailInfo {
  image: string;
  title: string;
  like: number;
  price: number;
  sold: boolean;
}

@Component({})
export default class DetailProductCard extends Vue {
  @Prop({ required: true }) readonly productID!: string;

  private productSeller!: any;
  private productInfo!: IProductDetailInfo;
  private productDescription!: string;
  private isFetchFinished = false;

  public async created() {
    try {
      const {
        data: { product, body, user },
      } = await ProductAPI.fetchProduct(this.productID);

      this.productSeller = user;
      this.productInfo = product;
      this.productDescription = body;
      this.isFetchFinished = true;
    } catch (err) {
      console.error(err);
    }
  }

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
      margin-top: 20px;

      .cart-button {
        @include button();
        margin-right: 30px;
        padding: 10px 15px;
        background-color: #8ce99a;
        color: #ffffff;
      }

      .like-button {
        @include button();
        padding: 10px 15px;
        background-color: #ffa8a8;
        color: #ffffff;
      }
    }
  }
}
</style>
