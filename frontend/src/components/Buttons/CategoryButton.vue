<template>
  <button class="category-btn" @click="onClick">
    <img class="category-btn__image" :src="imageSrcMap[name]" />
    <span class="category-btn__text"> {{ name }} </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

declare const require;

const imageSrcMap = {
  원룸: require('@/assets/images/room.svg'),
  전공서적: require('@/assets/images/study.svg'),
  회원권: require('@/assets/images/ticket.svg'),
  의류: require('@/assets/images/clothes.svg'),
  기타: require('@/assets/images/box.svg'),
};

@Component
export default class CategoryButton extends Vue {
  @Prop({ required: true }) readonly name!: string;

  private imageSrcMap = imageSrcMap;

  public onClick() {
    this.$emit('click', this.name);
  }
}
</script>

<style lang="scss" scoped>
$category-btn-color: #69db7c;

.category-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 50px;
  border-radius: 10px;
  background-color: $category-btn-color;

  &__image {
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
  &__text {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>
