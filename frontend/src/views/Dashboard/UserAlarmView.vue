<template>
  <div>
    <h1 class="view-title">알림 메시지</h1>
    <UserAlarmList
      :alarmItems="alarmItems"
      @approve-order="onApproveOrder"
      @reject-order="onRejectOrder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OrderAPI } from '../../api';
import UserAlarmList from '@components/Lists/UserAlarmList.vue';
import { IBuyer, IProduct } from '../../types';

interface IPendingOrder {
  id: number;
  buyer: IBuyer;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

interface IPurchaseRequest {
  id: number;
  type: 'order';
  productName: string;
  buyer: string;
  contactNumber: string;
}

interface IAlarmMessage {
  id: number;
  type: string;
  content: string;
}

function extractPurchaseRequest(pendingOrder: IPendingOrder): IPurchaseRequest {
  return {
    id: pendingOrder.id,
    type: 'order',
    productName: pendingOrder.product.name,
    buyer: pendingOrder.buyer.nickname,
    contactNumber: pendingOrder.buyer.contact,
  };
}

function createAlarmMessage(issue: IPurchaseRequest): IAlarmMessage {
  switch (issue.type) {
    case 'order':
      return {
        id: issue.id,
        type: issue.type,
        content: `
          <span class="message-body">
            ${issue.buyer} 님이 '${issue.productName}' 상품 구매 요청을 보냈습니다 👋
          </span>
          <span class="message-footer">
            구매자 연락처: ${issue.contactNumber}
          </span>
        `,
      };
  }
}

@Component({
  components: { UserAlarmList },
})
export default class UserAlarmView extends Vue {
  private alarmItems: IAlarmMessage[] = [];

  public async created() {
    try {
      const {
        data: { infos: pendingOrders },
      } = await OrderAPI.fetchPendingOrder();

      this.alarmItems = pendingOrders
        .map((order: IPendingOrder) => extractPurchaseRequest(order))
        .map((purchaseRequest: IPurchaseRequest) => createAlarmMessage(purchaseRequest));
    } catch (err) {
      console.error(err);
    }
  }

  public onApproveOrder(orderId: number) {
    OrderAPI.approveOrder(orderId);
  }

  public onRejectOrder(orderId: number) {
    OrderAPI.rejectOrder(orderId);
  }
}
</script>

<style lang="scss" scoped>
.view-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>
