<template>
  <v-container class="mb-6">
    <v-data-table :headers="orderPendingHeaders" :items="orderPendingList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'"> 구매 대기 </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-spacer class="mt-7"></v-spacer>
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

<script>
import ReviewCreateModal from '@components/Modals/ReviewCreateModal';
import { OrderAPI } from '@api';

export default {
  components: { ReviewCreateModal },

  data() {
    return {
      dialog: false,
      show: false,
      orderPendingHeaders: [
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
      ],
      orderFinishedHeaders: [
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
      ],
      orderPendingList: [],
      orderFinishedList: [],
    };
  },
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
  },
  methods: {
    showReviewModal() {
      this.show = true;
    },
    closeDialog(item) {
      this.show = false;
    },
  },
};
</script>

<style></style>
