<template>
  <v-container>
    <h2 class="sub-title">장바구니</h2>

    <v-container>
      <ul v-for="product in picks" :key="product.id">
        <li>
          <CartProductCard
            :id="product.id"
            :name="product.title"
            :price="product.price"
            :image="product.image"
            :status="product.sold"
            @deleteProduct="removeFromCart"
          />
        </li>
        <br />
      </ul>
    </v-container>
    <v-divider width="70%" />
    <div>
      <br />
      <h2 class="price-tag">합계 : {{ totalPrice }} 원</h2>
      <br />

      <v-btn large color="success" @click="buyProducts"> 결제하기 </v-btn>
    </div>
  </v-container>
</template>

<script>
import CartProductCard from '@components/Cards/CartProductCard.vue';
import { CartAPI } from '@api';

export default {
  components: { CartProductCard },

  data() {
    return {
      picks: [],
      available: [], // 내가 찜한 상품중 현재 판매중인것들만
    };
  },

  computed: {
    totalPrice() {
      let sum = 0;
      for (let pick of this.available) {
        sum += pick.price;
      }
      return sum;
    },
  },

  async created() {
    const { data } = await CartAPI.fetchAllCartProducts();
    this.picks = data.result;
    for (let pick of data.result) {
      if (!pick.sold) {
        this.available.push(pick);
      }
    }
  },

  methods: {
    async removeFromCart(id) {
      const payload = { productID: id };
      await CartAPI.removeCartProduct(payload);
    },

    async buyProducts() {
      if (this.available.length === 0) {
        alert('현재 구매가능한 물폼이 없습니다!');
        return;
      }

      const phone = prompt('핀매자와 연락할 수 있는 연락처를 남겨주세요!');
      if (phone) {
        // 장바구니 모든 상품들에 대해 구매 요청 전송
        for (const product of this.picks) {
          const payload = {
            postID: product.postId,
            productID: product.id,
            phone: phone,
          };

          await CartAPI.purchaseCartProduct(payload);
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 10px 0px 10px 20px;
}
ul {
  list-style: none;
}
</style>
