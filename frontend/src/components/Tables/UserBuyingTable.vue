<template>
  <div>
    <BaseTable :headers="pendingTableHeaders" :items="pendingItems">
      <template v-slot:table-name>
        <h1>구매 대기</h1>
      </template>
    </BaseTable>

    <BaseTable :headers="purchasedTableHeaders" :items="purchasedItems">
      <template v-slot:table-name>
        <h1>구매 완료</h1>
      </template>
      <template v-slot:table-action>
        <button @click="onShowModal">후기 등록</button>
      </template>
      <ReviewCreateModal :show="isOpenReviewModal" @close="onCloseModal" />
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReviewCreateModal from '@components/Modals/ReviewCreateModal.vue';
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
    seller: info.user.nickname,
    contactNumber: info.user.phone,
  };
}

function normalizeBoughtProduct(info: any): IBoughtProductHistory {
  return {
    productName: info.title,
    price: info.price,
  };
}

@Component({
  components: { ReviewCreateModal, BaseTable },
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
    // FIXME: 선택된 상품에 대한 리뷰를 남기도록 해야함
    this.isOpenReviewModal = true;
  }

  public onCloseModal() {
    this.isOpenReviewModal = false;
  }
}
</script>

<style></style>
