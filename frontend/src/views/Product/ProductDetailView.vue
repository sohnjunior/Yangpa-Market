<template>
  <div>
    <section class="info-section">
      <ProductDetailCard
        v-if="isFetchFinished"
        :productID="productID"
        :productInfo="productInfo"
        :sellerInfo="productSeller"
        @add-cart="onAddCart"
        @increase-like="onIncreaseLike"
      />
    </section>

    <section class="info-section">
      <RelatedProductList :productID="productID" />
    </section>

    <section v-if="isFetchFinished">
      <CommentInput :productID="productID" />
      <CommentList :productID="productID" :seller="productSeller" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI, CartAPI } from '../../api';
import { namespace } from 'vuex-class';
import ProductDetailCard from '@components/Cards/ProductDetailCard.vue';
import RelatedProductList from '@components/Lists/RelatedProductList.vue';
import CommentInput from '@components/Inputs/CommentInput.vue';
import CommentList from '@components/Lists/CommentList.vue';
import ToastBus from '../../bus/ToastBus';
import { IProduct, IUserInfo } from '../../types';

const UserModule = namespace('UserModule');

@Component({
  components: {
    ProductDetailCard,
    RelatedProductList,
    CommentInput,
    CommentList,
  },
})
export default class ProductDetailView extends Vue {
  private productID: string = this.$route.params.id;
  private productSeller!: IUserInfo;
  private productInfo!: Partial<IProduct>;
  private isFetchFinished = false;

  @UserModule.Getter
  public isLoggedIn!: boolean;

  public async created() {
    try {
      const {
        data: {
          product: { seller, ...productInfo },
        },
      } = await ProductAPI.fetchProduct(this.productID);

      this.productSeller = seller;
      this.productInfo = productInfo;
      this.isFetchFinished = true;
    } catch (err) {
      console.error(err);
    }

    window.scrollTo(0, 0);
  }

  public async onAddCart() {
    if (!this.isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      await CartAPI.createCartProduct({
        productID: this.productID,
      });
      ToastBus.$emit('pop-up', '장바구니에 추가되었습니다.');
    } catch (err) {
      console.error(err);
    }
  }

  public async onIncreaseLike() {
    try {
      await ProductAPI.likeProduct(this.productID);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 70px;
}

.info-section {
  display: flex;
  justify-content: center;
}
</style>
