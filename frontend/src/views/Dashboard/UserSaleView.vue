<template>
  <div>
    <!-- Tabbar 컴포넌트로 분리 -->
    <div>
      <div>판매중</div>
      <div>판매완료</div>
    </div>

    <UserTradingList :products="tradingProducts" @edit="onEditProduct" @delete="onDeleteProduct" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OrderAPI, ProductAPI } from '../../api';
import { IProduct } from '../../types';
import UserTradingList from '@components/Lists/UserTradingList.vue';

@Component({
  components: { UserTradingList },
})
export default class UserSaleView extends Vue {
  private soldProducts: IProduct[] = [];
  private saleProducts: IProduct[] = [];
  private metric: 'progress' | 'done' = 'progress';

  get tradingProducts() {
    return this.metric === 'progress' ? this.saleProducts : this.soldProducts;
  }

  public async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchSalesOrder();

    this.soldProducts = infos.filter((product: IProduct) => product.isSold);
    this.saleProducts = infos.filter((product: IProduct) => !product.isSold);
  }

  public onEditProduct(productId: number) {
    this.$router.push(`/product/edit/${productId}`);
  }

  public async onDeleteProduct(productId: number) {
    /**
     * TODO: 토스트 모달로 변경
     */
    const allow = confirm('판매글을 정말로 삭제하시겠습니까?');

    if (!allow || !productId) return;

    try {
      await ProductAPI.deletePost(productId.toString());
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style></style>
