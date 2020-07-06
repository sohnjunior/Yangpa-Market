<template>
  <v-container>
    <h2>장바구니</h2>

    <v-container>
    <ul v-for="product in picks" :key="product.id">
      <li>
        <CartProductCard
          :id="product.id"
          :name="product.title"
          :price="product.price"
          :image="product.image"
          :status="false"
          @deleteProduct="removeFromCart"
        />
      </li>
    </ul>
    </v-container>
    <v-divider width="70%"/>
    <div>
      <br>
      <h3> 합계 : {{ totalPrice }} 원 </h3>
      <br>

      <v-btn x-large color="success"> 결제하기 </v-btn>
    </div>
  </v-container>
</template>

<script>
import CartProductCard from '../components/CartProductCard.vue';
import { retriveAllCartProducts, removeFromCart, /* buyFromCart */ } from '../api/index';

export default {
  data() {
    return {
      picks: [],
    }
  },

  computed: {
    totalPrice() {
      let sum = 0;
      for (let pick of this.picks) {
        sum += pick.price;
      }
      return sum;
    }
  },

  components: { CartProductCard },

  async created() {
    const userData = { email: this.$store.getters.getEmail };
    const { data } = await retriveAllCartProducts(userData);
    this.picks = data.result;
  },

  methods: {
    async removeFromCart(id) {
      const payload = { email: this.$store.getters.getEmail, productID: id };
      await removeFromCart(payload);
    },

    // async buyFromCart(product) {
    //   const payload = { email: this.$store.getters.getEmail, productID: product.id };
    //   await buyFromCart(payload);
    // }
  }
}
</script>

<style scoped>
h2 {
  margin: 10px 0px 10px 20px;
}
ul {
  list-style: none;
}
</style>