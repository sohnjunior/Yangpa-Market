<template>
  <div class="grid-container">
    <ProductCard
      class="grid-content"
      v-for="product in products"
      :title="product.name"
      :image="product.photos[0]"
      :body="product.description"
      :hit="product.views"
      :writer="product.seller.nickname"
      :like="product.likes"
      :productID="product.id"
      :price="product.price"
      :key="product.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ProductCard from '@components/Cards/ProductCard.vue';
import { IProduct } from '../../types';

@Component({
  components: { ProductCard },
})
export default class ProductGridList extends Vue {
  @Prop({ required: true }) readonly products!: IProduct[];
}
</script>

<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;

  .grid-content {
    margin: 10px;
  }
}
</style>
