<template>
  <button class="category-btn" @click="onClickCategory">
    <Icon :filename="filename" width="25" height="25" />
    <span class="name"> {{ name }} </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class CategoryButton extends Vue {
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly filename!: string;

  public onClickCategory() {
    this.$emit('click', this.name);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_mixins';

$category-btn-color: #8ce99a;

.category-btn {
  @include button();
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 50px;
  background-color: $category-btn-color;
  color: white;

  .name {
    margin-left: 7px;
    font-size: 1rem;
    font-weight: 500;
  }
}

@media screen and (max-width: 400px) {
  .category-btn {
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 60px;

    .name {
      margin-top: 3px;
      margin-left: 0px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
}
</style>
