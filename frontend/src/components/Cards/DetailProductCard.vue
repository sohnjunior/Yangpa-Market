<template>
  <div class="detail-product-container" v-if="isFetchFinished">
    <div>
      <img class="product-image" alt="상품 이미지" :src="productInfo.image" />
    </div>
    <div>
      <h2>{{ productInfo.title }}</h2>
      <span>판매자 : {{ productSeller.nickname }}</span>
      <span>{{ productDescription }}</span>
      <span>₩ {{ productInfo.price }}</span>

      <div class="button-wrapper">
        <button :disabled="productInfo.sold" @click="onClickAddCart">
          <v-icon v-if="!productInfo.sold" left>mdi-cart</v-icon>
          {{ productInfo.sold ? '판매 완료' : '장바구니 담기' }}
        </button>
        <button @click="onClickLike">
          <v-icon left>mdi-thumb-up</v-icon>
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

<style></style>
