<template>
  <div class="grid-container">
    <ProductCard
      class="grid-content"
      v-for="product in products"
      :title="product.product.title"
      :image="product.product.image"
      :body="product.body"
      :hit="product.hit"
      :writer="product.user.nickname"
      :like="product.product.like"
      :productID="product.title"
      :price="product.product.price"
      :key="product.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ProductCard from '@components/Cards/ProductCard.vue';
import { IPost } from '../../types';

@Component({
  components: { ProductCard },
})
export default class ProductGridList extends Vue {
  @Prop({ required: true }) readonly products!: IPost[];
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
