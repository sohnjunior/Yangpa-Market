<template>
    <v-container>
    <v-data-table :headers="headers" :items="onSaleList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 중인 상품</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-spacer></v-spacer>

    <v-data-table :headers="headers" :items="soldList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 완료 상품</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-spacer></v-spacer>

    <v-data-table :headers="Order_headers" :items="orderList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>구매 목록</v-toolbar-title>
        </v-toolbar>
      </template>
      <v-template>
        <v-btn @click="showReviewModal">
      상품 후기 등록하기
    </v-btn>
    <ReviewCreateModal
     :show="show"
     @closeDialog="closeDialog"/>
      </v-template>
    </v-data-table>
  </v-container>
</template>

<script>
import { getOrder } from '../api/index';
import ReviewCreateModal from './ReviewCreateModal';


export default {
  components: { ReviewCreateModal },
  data() {
    return {
      dialog: false,
      show: false,
      headers: [
        { text: "상품명", align: "start", value: "product.title", sortable: false },
        { text: "가격", align: "start", value: "product.price", sortable: false },
        { text: "조회수", align: "start", value: "hit", sortable: false },
        { text: "좋아요", align: "start", value: "product.like", sortable: false },
      ],
      Order_headers: [
        { text: "상품명", align: "start", value: "product.title", sortable: false },
        { text: "가격", align: "start", value: "product.price", sortable: false },
        { text: "조회수", align: "start", value: "hit", sortable: false },
        { text: "좋아요", align: "start", value: "product.like", sortable: false },
        { text: "후기 작성", align: "end", value: "actions", sortable: false },
      ],
      onSaleList: [],
      soldList: [],
      orderList: [],
    };
  },
  async created() {
    const userData = { email: this.$store.getters.getEmail };
    const { data } = await getOrder(userData);

    for(let p of data.products) {
      // 만약 팔린 상품이라면
      if(p.product.sold) {
        this.soldList.push(p);
      } else {
        this.onSaleList.push(p);
      }
    }
  },
  methods: {
    showReviewModal() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    }
  }
};

</script>

<style>
</style>