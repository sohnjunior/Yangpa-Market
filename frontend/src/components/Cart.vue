<template>
  <v-container>
    장바구니

    <li v-for="product in picks" :key="product.id">
      {{ product.title }}
      <v-btn @click="removeFromCart(product)"> 장바구니에서 삭제 </v-btn>
    </li>
  </v-container>
</template>

<script>
import { retriveAllCartProducts, removeFromCart } from '../api/index';

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
    }
  }
}
</script>

<style>

</style>