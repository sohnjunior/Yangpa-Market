<template>
  <div>
    <SelectBox
      :options="['구매요청', '구매완료']"
      :mode="'single'"
      :initSelectedOptionIdx="0"
      @select="onSelectMetric"
    />

    <UserTradingList :products="tradingProducts">
      <template v-if="metric === 'done'" v-slot:control="slotProps">
        <button class="review-button" @click="onRegisterReview(slotProps.productId)">
          거래후기 등록
        </button>
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

interface IOrder {
  id: number;
  isApproved: boolean;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: 주문 취소하기 기능 추가
@Component({
  components: { UserTradingList, SelectBox },
})
export default class UserPurchaseView extends Vue {
  private pendingItems: IProduct[] = [];
  private purchasedItems: IProduct[] = [];
  private metric: 'progress' | 'done' = 'progress';

  get tradingProducts() {
    return this.metric === 'progress' ? this.pendingItems : this.purchasedItems;
  }

  public async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchPurchasedOrder();

    this.pendingItems = infos.pendingOrders.map((order: IOrder) => order.product);
    this.purchasedItems = infos.approvedOrders.map((order: IOrder) => order.product);
  }

  public onSelectMetric(metrics: string[]) {
    const targetMetric = metrics[0];

    this.metric = targetMetric === '구매요청' ? 'progress' : 'done';
  }

  public onRegisterReview(productId: number) {
    // TODO: 판매자 리뷰 남기기
    console.log(productId);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

.table-title {
  font-size: 2rem;
  font-weight: 700;
}

.review-button {
  @include button();
  padding: 10px 15px;
  background-color: #69db7c;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;

  @media screen and (max-width: $mobile-width) {
    padding: 6px 8px;
    font-size: 0.7rem;
  }
}
</style>
