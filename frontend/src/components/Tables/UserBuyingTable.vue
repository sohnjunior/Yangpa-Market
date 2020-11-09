<template>
  <v-container class="mb-6">
    <v-data-table :headers="orderPendingHeaders" :items="orderPendingList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'"> 구매 대기 </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-spacer class="mt-7" />
    <v-data-table :headers="orderFinishedHeaders" :items="orderFinishedList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'"> 구매 완료 </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showReviewModal"> 후기 등록 </v-btn>
        <ReviewCreateModal :show="show" @close-dialog="closeDialog(item)" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReviewCreateModal from '@components/Modals/ReviewCreateModal.vue';
import { OrderAPI } from '../../api';

const orderPendingHeaders = [
  {
    text: '상품명',
    align: 'start',
    value: 'title',
    sortable: false,
    class: 'header',
  },
  {
    text: '가격',
    align: 'start',
    value: 'price',
    sortable: false,
    class: 'header',
  },
  {
    text: '판매자',
    align: 'middle',
    value: 'post.user.nickname',
    sortable: false,
    class: 'header',
  },
  {
    text: '판매자 연락처',
    align: 'middle',
    value: 'post.user.phone',
    sortable: false,
    class: 'header',
  },
];

const orderFinishedHeaders = [
  {
    text: '상품명',
    align: 'start',
    value: 'title',
    sortable: false,
    class: 'header',
  },
  {
    text: '가격',
    align: 'start',
    value: 'price',
    sortable: false,
    class: 'header',
  },
  {
    text: '후기 작성',
    align: 'middle',
    value: 'actions',
    sortable: false,
    class: 'header',
  },
];

@Component({
  components: { ReviewCreateModal },
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

  public showReviewModal(): void {
    this.show = true;
  }

  public closeDialog(item): void {
    this.show = false;
  }
}
</script>

<style></style>
