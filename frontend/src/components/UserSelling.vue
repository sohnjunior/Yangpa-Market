<template>
    <v-container>
    <v-data-table :headers="onSaleHeaders" :items="onSaleList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 중</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="updateItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-spacer class="mt-7"></v-spacer>

    <v-data-table :headers="headers" :items="soldList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>판매 완료</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
import { getOrder, deletePost } from '../api/index';


export default {
  data() {
    return {
      dialog: false,
      show: false,
      onSaleHeaders: [
        { text: "상품명", align: "start", value: "product.title", sortable: false },
        { text: "가격", align: "start", value: "product.price", sortable: false },
        { text: "조회수", align: "start", value: "hit", sortable: false },
        { text: "좋아요", align: "start", value: "product.like", sortable: false },
        { text: "수정하기", align: "middle", value: "actions", sortable: false },
      ],
      headers: [
        { text: "상품명", align: "start", value: "product.title", sortable: false },
        { text: "판매가격", align: "start", value: "product.price", sortable: false },
      ],
      onSaleList: [],
      soldList: [],
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
    },
    
    // 상품 정보 업데이트
    updateItem(item) {
      this.$router.push(`/product/update/${item.title}`);
    },

    // 등록된 상품 삭제
    async deleteItem(item) {
      const allow = confirm('<' + item.product.title + '> 판매글을 정말로 삭제하시겠습니까?');
      if(allow) {
        await deletePost(item.title);
      } 
    }
  }
};

</script>

<style>
</style>