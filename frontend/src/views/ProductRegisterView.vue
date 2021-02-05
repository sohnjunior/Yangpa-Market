<template>
  <div class="product-register-view">
    <h1 class="register-view-title">중고상품 등록</h1>

    <div class="register-form-wrapper">
      <ProductForm @submit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IProductForm } from '../types';
import { ProductAPI } from '../api';
import ProductForm from '@components/Forms/ProductForm.vue';

interface IFormDataPayload {
  [index: string]: string | Blob;
}

function createFormDataWithObject(payload: IFormDataPayload) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    formData.set(key, value);
  }

  return formData;
}

@Component({
  components: { ProductForm },
})
export default class ProductRegisterView extends Vue {
  public async onSubmit(payload: IProductForm) {
    try {
      const formData = createFormDataWithObject(payload);

      await ProductAPI.registerProduct(formData);
      this.$router.push('/');
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style lang="scss">
.product-register-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 50px;

  .register-view-title {
    font-size: 2rem;
    font-weight: 700;
  }

  .register-form-wrapper {
    margin-top: 30px;
  }
}
</style>
