<template>
  <v-container class="mb-6">
    <v-data-table
      :headers="orderHeaders.slice(0, 2)"
      :items="orderPendingList"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'">
            구매 대기
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-spacer class="mt-7"></v-spacer>
    <v-data-table
      :headers="orderHeaders"
      :items="orderFinishedList"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'">
            구매 완료
          </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showReviewModal"> 후기 등록 </v-btn>
        <ReviewCreateModal :show="show" @closeDialog="closeDialog(item)" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ReviewCreateModal from "./ReviewCreateModal";
import { getOrderBuying } from "../api/index";

export default {
  components: { ReviewCreateModal },
  data() {
    return {
      dialog: false,
      show: false,
      orderHeaders: [
        {
          text: "상품명",
          align: "start",
          value: "title",
          sortable: false,
          class: "header",
        },
        {
          text: "가격",
          align: "start",
          value: "price",
          sortable: false,
          class: "header",
        },
        {
          text: "후기 작성",
          align: "middle",
          value: "actions",
          sortable: false,
          class: "header",
        },
      ],
      orderPendingList: [],
      orderFinishedList: [],
    };
  },
  async created() {
    const payload = { email: this.$store.getters.getEmail };
    const {
      data: { infos },
    } = await getOrderBuying(payload);

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
      console.log(item);
      this.show = false;
    },
  },
};
</script>

<style></style>
