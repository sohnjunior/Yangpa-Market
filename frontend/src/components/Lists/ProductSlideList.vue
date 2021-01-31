<template>
  <ul class="slide-list-container">
    <li class="item" v-for="item in popularItems" :key="item.id">
      <PopularProductCard
        :title="item.title"
        :image="item.image"
        :hit="item.post.hit"
        :category="item.category.title"
        :productID="item.post.title"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import PopularProductMixin from '../../mixins/PopularProductMixin';
import PopularProductCard from '@components/Cards/PopularProductCard.vue';

@Component({
  components: { PopularProductCard },
})
export default class ProductSlideList extends Mixins(PopularProductMixin) {}
</script>

<style lang="scss" scoped>
.slide-list-container {
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    margin: 0px 10px;
  }
}
</style>
