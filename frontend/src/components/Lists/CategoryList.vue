<template>
  <div class="category-container">
    <CategoryButton
      v-for="category in categories"
      :key="category"
      :name="category"
      :filename="categoryMap[category]"
      @click="onSelectCategory"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CategoryButton from '@components/Buttons/CategoryButton.vue';
import { ICategoryMap } from '../../types';

@Component({
  components: { CategoryButton },
})
export default class CategoryList extends Vue {
  private categoryMap: ICategoryMap = {
    전공서적: 'books',
    원룸: 'rooms',
    회원권: 'tickets',
    의류: 'clothes',
    기타: 'others',
  };

  get categories() {
    return Object.keys(this.categoryMap);
  }

  public onSelectCategory(category: string) {
    this.$emit('select', category);
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
