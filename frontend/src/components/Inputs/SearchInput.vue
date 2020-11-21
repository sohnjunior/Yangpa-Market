<template>
  <input
    class="search-input"
    type="text"
    placeholder="상품명 검색"
    v-model="keyword"
    @keyup.enter="search"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {
  private keyword: string = '';

  public search(): void {
    this.$router.push(`/search/${this.keyword}`);
    this.keyword = '';
    this.$router.go(0);
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  border: 1px solid black;
  border-radius: 10px;
}
</style>
