<template>
  <v-container>
    <v-data-table :headers="orderHeaders" :items="orderList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>구매 목록</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showReviewModal">
          후기 등록
        </v-btn>
        <ReviewCreateModal
        :show="show"
        @closeDialog="closeDialog(item)"/>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ReviewCreateModal from './ReviewCreateModal';
import { getOrderBuying } from '../api/index';


export default {
  components: { ReviewCreateModal },
  data() {
    return {
      dialog: false,
      show: false,
      orderHeaders: [
        { text: "상품명", align: "start", value: "title", sortable: false },
        { text: "가격", align: "start", value: "price", sortable: false },
        { text: "후기 작성", align: "middle", value: "actions", sortable: false },
      ],
      orderList: [],
    };
  },
  async created() {
    const payload = { email: this.$store.getters.getEmail };
    const { data } = await getOrderBuying(payload);
    this.orderList = data.infos;
  },
  methods: {
    showReviewModal() {
      this.show = true;
    },
    closeDialog(item) {
      console.log(item);
      this.show = false;
    },
  }
};

</script>

<style>
</style>