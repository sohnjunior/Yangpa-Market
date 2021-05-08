<template>
  <div>
    <SelectBox
      :options="['판매중', '판매완료']"
      :mode="'single'"
      :initSelectedOptionIdx="0"
      @select="onSelectMetric"
    />

    <UserTradingList :products="tradingProducts">
      <template v-slot:control="slotProps">
        <Icon
          class="icon"
          filename="edit"
          width="20"
          height="20"
          @click="onEditProduct(slotProps.productId)"
        />
        <Icon
          class="icon"
          filename="delete"
          width="20"
          height="20"
          @click="onDeleteProduct(slotProps.productId)"
        />
      </template>
    </UserTradingList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OrderAPI, ProductAPI } from '../../api';
import { IProduct } from '../../types';
import UserTradingList from '@components/Lists/UserTradingList.vue';
import SelectBox from '@components/Selects/SelectBox.vue';
import Icon from '@components/Common/Icon.vue';
import AlertBus from '../../bus/AlertBus';

@Component({
  components: { UserTradingList, SelectBox, Icon },
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

  public onSelectMetric(metrics: string[]) {
    const targetMetric = metrics[0];

    this.metric = targetMetric === '판매중' ? 'progress' : 'done';
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
