<template>
    <v-container>
    <v-data-table :headers="headers" :items="Toselllist" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 목록(판매 중)</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-spacer></v-spacer>

    <v-data-table :headers="headers" :items="Soldlist" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 목록(판매 완료)</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-spacer></v-spacer>

    <v-data-table :headers="Order_headers" :items="Orderlist" class="elevation-1">
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
        { text: "Title", align: "start", value: "title", sortable: false },
        { text: "가격", align: "start", value: "price", sortable: false },
        { text: "판매상태", align: "start", value: "sold", sortable: false },
        { text: "좋아요", align: "start", value: "like", sortable: false },
      ],
      Order_headers: [
        { text: "Title", align: "start", value: "title", sortable: false },
        { text: "가격", align: "start", value: "price", sortable: false },
        { text: "판매상태", align: "start", value: "sold", sortable: false },
        { text: "좋아요", align: "start", value: "like", sortable: false },
        { text: "후기 작성", align: "end", value: "actions", sortable: false },
      ],
      Toselllist: [],
      Soldlist: [],
      Orderlist: [],
    };
  },
  async created() {
    const userData = { email: this.$store.getters.getEmail };
    const { data } = await getOrder(userData);
    console.log(data[0]);
    this.Toselllist = data[0];
    this.Soldlist = data.Sold;
    this.Orderlist = data.Order;
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