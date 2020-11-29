<template>
  <div>
    <BaseTable :headers="orderPendingHeaders" :items="orderPendingList">
      <template v-slot:table-name>
        <h1>구매 대기</h1>
      </template>
    </BaseTable>

    <BaseTable :headers="orderFinishedHeaders" :items="orderFinishedList">
      <template v-slot:table-name>
        <h1>구매 완료</h1>
      </template>
      <template v-slot:table-action>
        <button @click="showReviewCreateModal">후기 등록</button>
      </template>
      <ReviewCreateModal :show="show" @close-dialog="closeDialog()" />
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReviewCreateModal from '@components/Modals/ReviewCreateModal.vue';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI } from '../../api';

const orderPendingHeaders = ['상품명', '가격', '판매자', '판매자 연락처'];

const orderFinishedHeaders = ['상품명', '가격', '후기 작성'];

@Component({
  components: { ReviewCreateModal, BaseTable },
})
export default class UserBuyingTable extends Vue {
  private dialog: boolean = false;
  private show: boolean = false;
  private orderPendingList = [];
  private orderFinishedList = [];
  private orderPendingHeaders = orderPendingHeaders;
  private orderFinishedHeaders = orderFinishedHeaders;

  async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchPurchasedOrder();

    this.orderPendingList = infos
      .filter((orderInfo) => !orderInfo[1])
      .map((orderInfo) => orderInfo[0]);
    this.orderFinishedList = infos
      .filter((orderInfo) => orderInfo[1])
      .map((orderInfo) => orderInfo[0]);
  }

  public showReviewCreateModal(): void {
    // FIXME: 선택된 상품에 대한 리뷰를 남기도록 해야함
    this.show = true;
  }

  public closeDialog(): void {
    this.show = false;
  }
}
</script>

<style></style>
