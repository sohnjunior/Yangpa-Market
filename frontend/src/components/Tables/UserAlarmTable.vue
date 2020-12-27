<template>
  <div>
    <BaseTable :headers="alarmHeaders" :items="orderAlarms">
      <template v-slot:table-name>
        <h1>구매요청 알림</h1>
      </template>
      <template v-slot:table-action="item">
        <button @click="onApprove(item)">승인</button>
        <button @click="onRemove(item)">삭제</button>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI } from '../../api';

interface IAlarmHistory {
  id: number;
  postId: number;
  orderNumber: string;
  productName: string;
  contactNumber: string;
  buyer: string;
}

function normalize(products: any[], order: any) {
  return {
    id: order.id,
    postId: order.postId,
    orderNumber: order.code,
    productName: products[order.postId],
    contactNumber: order.phone,
    buyer: order.user.nickname,
  };
}

@Component({
  components: { BaseTable },
})
export default class UserAlarmTable extends Vue {
  private alarmHeaders = ['주문번호', '상품명', '연락처', '구매자', ''];
  private orderAlarms: IAlarmHistory[] = [];

  // FIXME: products 받아올 필요 없도록 API 수정
  public async created() {
    const {
      data: { products, orders },
    } = await OrderAPI.fetchPendingOrder();

    this.orderAlarms = orders.map((order) => normalize(products, order));
  }

  public onApprove(order: IAlarmHistory) {
    OrderAPI.approveOrder({ postID: order.postId }); // FIXME: postId 대신 order.id 로 삭제하도록 API 변경
  }

  public onRemove(order: IAlarmHistory) {
    OrderAPI.rejectOrder(order.id);
  }
}
</script>

<style></style>
