<template>
  <div class="search-input">
    <Icon filename="search" width="20" height="20" />
    <input type="text" placeholder="상품명 검색" v-model="query" @keyup.enter="onSearch" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class SearchInput extends Vue {
  private query = '';

  public onSearch() {
    this.$router.push(`/search/${this.query}`);
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  height: 50px;
  width: 60%;
  padding: 10px 15px;
  border: 2px solid #dee2e6;
  border-radius: 20px;

  input {
    width: 100%;
    margin-left: 10px;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
  }

  input::placeholder {
    font-size: 1rem;
    font-weight: 600;
    color: #e9ecef;
  }
}

@media screen and (max-width: 400px) {
  .search-input {
    width: 190px;
  }
}
</style>
