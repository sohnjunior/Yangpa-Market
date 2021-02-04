<template>
  <div>
    <BaseTable :headers="pendingTableHeaders" :items="pendingItems">
      <template v-slot:table-name>
        <h1 class="table-title">구매 대기</h1>
      </template>
    </BaseTable>

    <BaseTable :headers="purchasedTableHeaders" :items="purchasedItems">
      <template v-slot:table-name>
        <h1 class="table-title">구매 완료</h1>
      </template>
      <template v-slot:table-action>
        <button class="register-button" @click="onShowModal">거래후기 등록</button>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI } from '../../api';

interface IPendingProductHistory {
  productName: string;
  price: number;
  seller: string;
  contactNumber: string;
}

interface IBoughtProductHistory {
  productName: string;
  price: number;
}

function normalizePendingProduct(info: any): IPendingProductHistory {
  return {
    productName: info.title,
    price: info.price,
    seller: info.post.user.nickname,
    contactNumber: info.post.user.phone,
  };
}

function normalizeBoughtProduct(info: any): IBoughtProductHistory {
  return {
    productName: info.title,
    price: info.price,
  };
}

@Component({
  components: { BaseTable },
})
export default class UserBuyingTable extends Vue {
  private isOpenReviewModal = false;
  private pendingItems: IPendingProductHistory[] = [];
  private purchasedItems: IBoughtProductHistory[] = [];
  private pendingTableHeaders = ['상품명', '가격', '판매자', '판매자 연락처'];
  private purchasedTableHeaders = ['상품명', '가격', ''];

  async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchPurchasedOrder();

    for (const info of infos) {
      const isOrdered = info[1];

      if (isOrdered) this.purchasedItems.push(normalizeBoughtProduct(info[0]));
      else this.pendingItems.push(normalizePendingProduct(info[0]));
    }
  }

  public onShowModal() {
    // FIXME: 구매한 상품의 판매자에 대한 리뷰 남길 수 있도록 하기
    this.isOpenReviewModal = true;
  }

  public onCloseModal() {
    this.isOpenReviewModal = false;
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

.register-button {
  @include button();
  padding: 10px 15px;
  background-color: #69db7c;
  color: white;
  font-size: 0.9rem;

  @media screen and (max-width: $mobile-width) {
    padding: 6px 8px;
    font-size: 0.7rem;
    font-weight: 600;
  }
}
</style>
