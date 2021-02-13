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
import { IBuyer, IProduct } from '../../types';

interface IAlarmHistory {
  id: number;
  buyer: IBuyer;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

function normalize(alarm: IAlarmHistory) {
  return {
    id: alarm.id,
    productName: alarm.product.name,
    buyer: alarm.buyer.nickname,
    contactNumber: alarm.buyer.contact,
  };
}

@Component({
  components: { BaseTable },
})
export default class UserAlarmTable extends Vue {
  private alarmHeaders = ['상품명', '구매자', '연락처', ''];
  private alarmItems: any[] = [];

  public async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchPendingOrder();

    this.alarmItems = infos.map((info: IAlarmHistory) => normalize(info));
  }

  public onApprove({ item }) {
    OrderAPI.approveOrder(item.id);
  }

  public onReject({ item }) {
    OrderAPI.rejectOrder(item.id);
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
