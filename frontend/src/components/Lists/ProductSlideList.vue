<template>
  <ul class="slide-list-container">
    <li class="item" v-for="item in popularItems" :key="item.id">
      <PopularProductCard
        :title="item.name"
        :image="item.photos[0].path"
        :hit="item.views"
        :category="item.category.type"
        :productID="item.id"
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
  padding: 0;
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
