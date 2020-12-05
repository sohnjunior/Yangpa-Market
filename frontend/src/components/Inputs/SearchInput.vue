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
  height: 50px;
  width: 300px;
  padding: 10px 15px;
  border: 2px solid #dee2e6;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  outline: none;

  &::placeholder {
    font-size: 1rem;
    font-weight: 600;
    color: #e9ecef;
  }
}
</style>
