<template>
  <BaseCard>
    <template v-slot:card-body>
      <div class="body-container">
        <img class="product-image" alt="상품 이미지" :src="image" />
        <div class="product-description">
          <b :style="[status ? soldOut : onSale]">{{ statusMessage }} </b>
          <span class="product-name">{{ name }}</span>
          <em>₩ {{ price }} </em>
        </div>
        <div class="button-wrapper">
          <button @click="deleteProduct">삭제</button>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/BaseCard.vue';

@Component({
  components: { BaseCard },
})
export default class CartProductCard extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop({ required: true }) readonly name!: string;
  @Prop({ required: true }) readonly price!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly status!: string;

  private onSale = { color: 'darkseagreen' };
  private soldOut = { color: 'tomato' };

  get statusMessage(): string {
    return this.status ? '판매완료' : '판매중';
  }

  public deleteProduct(): void {
    this.$emit('delete-product', this.id);
    this.$router.go(0);
  }
}
</script>

<style lang="scss" scoped>
.body-container {
  display: flex;
  width: 600px;

  .product-image {
    height: 100px;
    width: 100px;
  }

  .product-description {
    display: flex;
    flex-direction: column;
    flex-basis: 62%;
    margin-left: 20px;

    .product-name {
      font-size: 1.1rem;
    }
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
      width: 70px;
      height: 30px;
      border-radius: 10px;
      background-color: #ff6b6b;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
