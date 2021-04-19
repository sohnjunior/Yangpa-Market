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
import AlertBus from '../../bus/AlertBus';

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
    const message = '판매글을 정말로 삭제하시겠습니까?';
    AlertBus.$emit(
      'alert-on',
      message,
      () => ProductAPI.deletePost(productId.toString()),
      () => {}
    );
  }
}
</script>

<style></style>
