<template>
  <div>
    구매 및 판매내역
    <v-btn @click="showReviewModal">
      상품 후기 등록하기
    </v-btn>
    <ReviewCreateModal
     :show="show"
     @closeDialog="closeDialog"/>
  </div>
</template>

<script>
import ReviewCreateModal from './ReviewCreateModal';

export default {
  components: { ReviewCreateModal },
  data() {
    return {
      show: false,
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
}
</script>

<style>

</style>