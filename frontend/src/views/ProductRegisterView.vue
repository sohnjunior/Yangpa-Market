<template>
  <div class="product-register-view">
    <h1 class="register-view-title">새로운 중고상품 등록</h1>

    <div class="register-form-wrapper">
      <ProductRegisterForm />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProductAPI } from '../api';
import ProductRegisterForm from '@components/Forms/ProductRegisterForm.vue';

@Component({
  components: { ProductRegisterForm },
})
export default class ProductCreateView extends Vue {}
</script>

<style lang="scss">
.product-register-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;

  .register-view-title {
    font-size: 2rem;
    font-weight: 500;
  }

  .register-form-wrapper {
    margin-top: 30px;
  }
}
</style>
