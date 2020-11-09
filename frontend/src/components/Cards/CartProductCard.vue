<template>
  <v-card max-width="600" outlined class="elevation-1">
    <v-row>
      <v-col cols="auto" class="ml-5 mr-2">
        <v-img height="100" width="100" :src="image" />
      </v-col>
      <v-col cols="6">
        <v-row class="mt-2">
          <span class="product-name">{{ name }}</span>
        </v-row>
        <v-row class="mt-2">
          <b :style="[status ? soldOut : onSale]">{{ statusMessage }} </b>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <b class="ml-4 mt-3 price-tag">₩ {{ price }} </b>
        </v-row>
        <v-spacer class="mt-3" />
        <v-row>
          <v-btn class="ml-4" small color="teal" tile outlined @click="deleteProduct">
            바구니에서 삭제
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
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
</style>
