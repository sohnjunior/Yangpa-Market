<template>
  <div class="product-edit-view">
    <h1 class="view-title">상품 정보수정</h1>
    <div>
      <ProductForm :isEditMode="true" :initalFormData="initalFormData" @submit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IProductForm } from '../types';
import { ProductAPI } from '../api';
import ProductForm from '@components/Forms/ProductForm.vue';

@Component({
  components: { ProductForm },
})
export default class ProductEditView extends Vue {
  private orderHash = '';
  private initalFormData: IProductForm = {
    title: '',
    image: new Blob(),
    category: '',
    price: '',
    description: '',
  };

  public async created() {
    this.orderHash = this.$route.params.id;
    await this.fetchInitalFormData();
  }

  private async fetchInitalFormData() {
    try {
      const {
        data: { product, body },
      } = await ProductAPI.fetchProduct(this.orderHash);

      this.initalFormData.title = product.title;
      this.initalFormData.image = product.image;
      this.initalFormData.category = product.category.title;
      this.initalFormData.price = product.price;
      this.initalFormData.description = body;
    } catch (err) {
      console.error(err);
    }
  }

  public async onSubmit(payload: IProductForm) {
    try {
      await ProductAPI.editProduct(this.orderHash, payload);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.product-edit-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;

  .view-title {
    font-size: 2rem;
    font-weight: 500;
  }
}
</style>
