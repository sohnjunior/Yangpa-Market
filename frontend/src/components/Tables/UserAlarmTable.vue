<template>
  <div>
    <BaseTable :headers="alarmHeaders" :items="alarmItems">
      <template v-slot:table-name>
        <h1 class="table-title">구매요청 알림</h1>
      </template>
      <template v-slot:table-action="item">
        <button class="approve-button" @click="onApprove(item)">승인</button>
        <button class="reject-button" @click="onReject(item)">삭제</button>
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
  data: {
    orderNumber: string;
    productName: string;
    buyer: string;
    contactNumber: string;
  };
}

function normalize(products: any[], order: any) {
  return {
    id: order.id,
    postId: order.postId,
    data: {
      orderNumber: order.code,
      productName: products[order.postId],
      buyer: order.user.nickname,
      contactNumber: order.phone,
    },
  };
}

@Component({
  components: { BaseTable },
})
export default class UserAlarmTable extends Vue {
  private alarmHeaders = ['주문번호', '상품명', '구매자', '연락처', ''];
  private orderAlarms: IAlarmHistory[] = [];

  // FIXME: products 받아올 필요 없도록 API 수정
  public async created() {
    const {
      data: { products, orders },
    } = await OrderAPI.fetchPendingOrder();

    this.orderAlarms = orders.map((order) => normalize(products, order));
  }

  get alarmItems() {
    return this.orderAlarms.map((alarms) => alarms.data);
  }

  public onApprove(order: IAlarmHistory) {
    OrderAPI.approveOrder({ postID: order.postId }); // FIXME: postId 대신 order.id 로 삭제하도록 API 변경
  }

  public onReject(order: IAlarmHistory) {
    OrderAPI.rejectOrder(order.id);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.table-title {
  font-size: 2rem;
  font-weight: 700;
}

.approve-button {
  @include button();
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #69db7c;
  color: white;
  font-size: 0.8rem;
}

.reject-button {
  @include button();
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  font-size: 0.8rem;
}
</style>
