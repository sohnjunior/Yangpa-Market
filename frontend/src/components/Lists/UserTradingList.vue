<template>
  <ul>
    <li class="product-wrapper" v-for="product in products" :key="product.id">
      <img class="photo" :src="product.photos[0].path" />
      <div class="detail">
        <span class="name">{{ product.name }}</span>
        <span>{{ product.description }}</span>
      </div>
      <div class="control-wrapper">
        <Icon class="icon" filename="edit" width="20" height="20" @click="onEditItem(product.id)" />
        <Icon
          class="icon"
          filename="delete"
          width="20"
          height="20"
          @click="onDeleteItem(product.id)"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';
import { IProduct } from '../../types';

@Component({
  components: { Icon },
})
export default class UserTradingList extends Vue {
  @Prop({ required: true }) readonly products!: IProduct[];

  public onEditItem(productId: number) {
    this.$emit('edit', productId);
  }

  public onDeleteItem(productId: number) {
    this.$emit('delete', productId);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.product-wrapper {
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
  padding: 15px 20px;
  @include card-border();

  .photo {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 5px;
  }

  .detail {
    display: flex;
    flex-basis: 70%;
    flex-direction: column;
    margin-top: 10px;

    .name {
      margin-bottom: 15px;
      font-size: 1.1rem;
      font-weight: 500;
    }
  }

  .control-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      cursor: pointer;
    }

    .icon:nth-child(2) {
      margin-left: 15px;
    }
  }
}
</style>
