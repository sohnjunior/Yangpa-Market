<template>
  <div>
    <h2 class="view-title">장바구니</h2>
    <UserCartList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserCartList from '@components/Lists/UserCartList.vue';

@Component({
  components: { UserCartList },
})
export default class UserCartView extends Vue {}
</script>

<style lang="scss" scoped>
.view-title {
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 700;
}
</style>
