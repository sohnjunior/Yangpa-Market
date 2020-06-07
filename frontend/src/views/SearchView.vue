<template>
  <div>
    {{ keyword }} 검색 결과
  </div>
</template>

<script>
import { searchProduct } from '../api/index';

export default {
  data() {
    return {
      keyword: '',
      products: [],
    }
  },
  async created() {
    this.keyword = this.$route.params.keyword;
    const { data } = await searchProduct(this.keyword);
    this.products = data;
  }
}
</script>

<style>

</style>