<template>
  <v-container class="mb-6">
    <v-data-table :headers="orderHeaders" :items="orderList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'">구매요청 알림</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.title="{ item }">
        <span class="font-weight-medium">{{ productList[item.postId] }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn outlined color="success" depressed small @click="approve(item)"> 승인 </v-btn>
        <v-btn outlined color="error" class="ml-3" depressed small @click="remove(item)">
          삭제
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { OrderAPI } from '@api';

export default {
  data() {
    return {
      dialog: false,
      show: false,
      orderHeaders: [
        {
          text: '주문번호',
          align: 'start',
          value: 'code',
          sortable: false,
          class: 'header',
        },
        {
          text: '상품명',
          align: 'start',
          value: 'title',
          sortable: false,
          class: 'header',
        },
        {
          text: '연락처',
          align: 'start',
          value: 'phone',
          sortable: false,
          class: 'header',
        },
        {
          text: '구매자',
          align: 'start',
          value: 'user.nickname',
          sortable: false,
          class: 'header',
        },
        { align: 'middle', value: 'actions', sortable: false },
      ],
      productList: {},
      orderList: [],
    };
  },

  async created() {
    const {
      data: { products, orders },
    } = await OrderAPI.fetchPendingOrder();
    this.productList = products;
    this.orderList = orders;
  },

  methods: {
    async approve(item) {
      await OrderAPI.approveOrder({ postID: item.postId });
    },
    async remove(item) {
      await OrderAPI.rejectOrder(item.id);
    },
  },
};
</script>

<style></style>
