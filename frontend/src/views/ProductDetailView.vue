<template>
  <div>
    <section>
      <h1 class="subtitle">상품정보</h1>
      <DetailProductCard
        v-if="isFetchFinished"
        :productID="productID"
        :productInfo="productInfo"
        @add-cart="onAddCart"
        @increase-like="onIncreaseLike"
      />
    </section>

    <section>
      <SellerInfoCard v-if="isFetchFinished" :seller="productSeller" />
    </section>

    <section>
      <h1 class="subtitle">이 상품도 함께 봤어요</h1>
      <RelatedProductList :productID="productID" />
    </section>

    <section v-if="isFetchFinished">
      <h1 class="subtitle">상품문의</h1>
      <CommentInput :productID="productID" />
      <CommentList :productID="productID" :seller="productSeller" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI, CartAPI } from '../api';
import { namespace } from 'vuex-class';
import DetailProductCard from '@components/Cards/DetailProductCard.vue';
import SellerInfoCard from '@components/Cards/SellerInfoCard.vue';
import RelatedProductList from '@components/Lists/RelatedProductList.vue';
import CommentInput from '@components/Inputs/CommentInput.vue';
import CommentList from '@components/Lists/CommentList.vue';
import ToastBus from '../bus/ToastBus';
import { IProduct, IUserInfo } from '../types';

const userModule = namespace('UserModule');

@Component({
  components: {
    DetailProductCard,
    SellerInfoCard,
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

  @userModule.Getter
  public isLoggedIn!: boolean;

  public async created() {
    try {
      const {
        data: { seller: sellerInfo, ...productInfo },
      } = await ProductAPI.fetchProduct(this.productID);

      this.productSeller = sellerInfo;
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
.subtitle {
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 500;
}

section {
  margin-bottom: 100px;
}
</style>
