<template>
  <div>
    <BaseTable :headers="orderHeaders" :items="orderList">
      <template v-slot:table-name>
        <h1>구매요청 알림</h1>
      </template>
      <template v-slot:table-action="item">
        <button @click="approve(item)">승인</button>
        <button @click="remove(item)">삭제</button>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI } from '../../api';

const orderHeaders = ['주문번호', '상품명', '연락처', '구매자', ''];

@Component({
  components: { BaseTable },
})
export default class UserAlarmTable extends Vue {
  private dialog: boolean = false;
  private show: boolean = false;
  private orderHeaders = orderHeaders;
  private productList = {};
  private orderList = [];

  public async created(): Promise<void> {
    const {
      data: { products, orders },
    } = await OrderAPI.fetchPendingOrder();
    this.productList = products;
    this.orderList = orders;
  }

  public async approve(item): Promise<void> {
    await OrderAPI.approveOrder({ postID: item.postId });
  }

  async remove(item): Promise<void> {
    await OrderAPI.rejectOrder(item.id);
  }
}
</script>

<style></style>
