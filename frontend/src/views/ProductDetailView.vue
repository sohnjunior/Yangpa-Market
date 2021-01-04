<template>
  <div>
    <section>
      <h1 class="subtitle">상품정보</h1>
      <DetailProductCard
        :productID="productID"
        @add-cart="onAddCart"
        @increase-like="onIncreaseLike"
      />
    </section>

    <section>
      <h1 class="subtitle">이 상품도 함께 봤어요</h1>
      <RelatedProductList :productID="productID" />
    </section>

    <CommentTable :productID="productID" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI, RecommendationAPI, CartAPI } from '../api';
import { namespace } from 'vuex-class';
import DetailProductCard from '@components/Cards/DetailProductCard.vue';
import RelatedProductList from '@components/Lists/RelatedProductList.vue';
import CommentTable from '@components/Tables/CommentTable.vue';
import EventBus from '../utils/bus';

const userModule = namespace('UserModule');

@Component({
  components: {
    DetailProductCard,
    RelatedProductList,
    CommentTable,
  },
})
export default class ProductDetailView extends Vue {
  private productID: string = this.$route.params.id;

  @userModule.Getter
  public currentEmail!: string;

  @userModule.Getter
  public isLoggedIn!: boolean;

  public created() {
    window.scrollTo(0, 0);
  }

  public async onAddCart(): Promise<void> {
    if (!this.isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      await CartAPI.createCartProduct({
        productID: this.productID,
      });
      EventBus.$emit('pop-up', '장바구니에 추가되었습니다.');
    } catch (err) {
      console.error(err);
    }
  }

  public async onIncreaseLike(): Promise<void> {
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
