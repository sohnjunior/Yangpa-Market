<template>
  <v-container>
    장바구니

    <li v-for="product in picks" :key="product.id">
      {{ product.title }}
      <v-btn @click="removeFromCart(product)"> 장바구니에서 삭제 </v-btn>
      <v-btn @click="buyFromCart(product)"> 구매하기 </v-btn>
    </li>
  </v-container>
</template>

<script>
import { retriveAllCartProducts, removeFromCart, buyFromCart } from '../api/index';

export default {
  data() {
    return {
      picks: [],
    }
  },

  async created() {
    const userData = { email: this.$store.getters.getEmail };
    const { data } = await retriveAllCartProducts(userData);
    this.picks = data.result;
  },

  methods: {
    async removeFromCart(product) {
      const payload = { email: this.$store.getters.getEmail, productID: product.id };
      await removeFromCart(payload);
    },

    async buyFromCart(product) {
      const payload = { email: this.$store.getters.getEmail, productID: product.id };
      await buyFromCart(payload);
    }
  }
}
</script>

<style>

</style>