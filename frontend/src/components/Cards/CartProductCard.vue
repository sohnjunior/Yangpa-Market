<template>
  <BaseCard>
    <template v-slot:card-body>
      <div>
        <div>
          <img class="product-image" alt="상품 이미지" :src="image" />
          <div>
            <span class="product-name">{{ name }}</span>
            <b :style="[status ? soldOut : onSale]">{{ statusMessage }} </b>
          </div>
        </div>
        <div>
          <em>₩ {{ price }} </em>
          <button @click="deleteProduct">바구니에서 삭제</button>
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

<style scoped>
@font-face {
  font-family: 'Handon3gyeopsal300g';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal300g.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.product-name {
  font-family: 'Handon3gyeopsal300g';
  font-size: 1.1rem;
}

.product-image {
  height: 100px;
  width: 100px;
}
</style>
