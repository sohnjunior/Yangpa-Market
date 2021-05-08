<template>
  <div class="product-edit-view">
    <h1 class="view-title">상품 정보수정</h1>
    <div class="edit-form-wrapper">
      <ProductForm
        v-if="isFetchFinished"
        :is-edit-mode="true"
        :inital-form-data="initalFormData"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { IProductForm } from '../../types';
import { ProductAPI } from '../../api';
import ProductForm from '@components/Forms/ProductForm.vue';
import { createFormDataWithObject } from '../../utils/formatters';

async function urlToFileObject(url: string) {
  const { data } = await axios.get(url, { responseType: 'blob' });
  return new File([data], 'image.png', { type: data.type });
}

@Component({
  components: { ProductForm },
})
export default class ProductEditView extends Vue {
  private productID!: string;
  private isFetchFinished = false;
  private initalFormData: IProductForm = {
    name: '',
    images: [],
    category: '',
    price: '',
    description: '',
  };

  public async created() {
    try {
      this.isFetchFinished = false;
      this.productID = this.$route.params.id;
      await this.fetchInitalFormData();
      this.isFetchFinished = true;
    } catch (err) {
      console.error(err);
    }
  }

  private async fetchInitalFormData() {
    try {
      const {
        data: { product },
      } = await ProductAPI.fetchProduct(this.productID);

      for (const photo of product.photos) {
        const file = await urlToFileObject(photo.path);
        this.initalFormData.images.push(file);
      }

      this.initalFormData.name = product.name;
      this.initalFormData.category = product.category.type;
      this.initalFormData.price = product.price;
      this.initalFormData.description = product.description;
    } catch (err) {
      console.error(err);
    }
  }

  public async onSubmit(payload: IProductForm) {
    try {
      const formData = createFormDataWithObject(payload);

      await ProductAPI.editProduct(this.productID, formData);
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

  .edit-form-wrapper {
    margin-top: 30px;
  }
}
</style>
