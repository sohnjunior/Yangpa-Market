<template>
  <div>
    <h2 class="list-title">장바구니</h2>

    <ul class="list-content-wrapper">
      <li v-for="product in picks" :key="product.id">
        <CartProductCard
          :id="product.id"
          :name="product.title"
          :price="product.price"
          :image="product.image"
          :status="product.sold"
          @delete-product="removeFromCart"
        />
      </li>
    </ul>

    <div class="cart-footer-wrapper">
      <em class="price">합계 : {{ totalPrice }} 원</em>
      <button class="payment-button" @click="buyProducts">결제하기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CartProductCard from '@components/Cards/CartProductCard.vue';
import { CartAPI } from '../../api';

@Component({
  components: { CartProductCard },
})
export default class UserCart extends Vue {
  private picks: any[] = [];
  private available: any[] = []; // 내가 찜한 상품중 현재 판매중인것들만

  get totalPrice(): number {
    let sum = 0;
    for (const pick of this.available) {
      sum += pick.price;
    }
    return sum;
  }

  async created() {
    const {
      data: { result },
    } = await CartAPI.fetchAllCartProducts();
    this.picks = result;
    for (const pick of this.picks) {
      if (!pick.sold) {
        this.available.push(pick);
      }
    }
  }

  public async removeFromCart(id: string) {
    const payload = { productID: id };
    await CartAPI.removeCartProduct(payload);
  }

  public async buyProducts() {
    if (this.available.length === 0) {
      alert('현재 구매가능한 물폼이 없습니다!');
      return;
    }

    const phone = prompt('핀매자와 연락할 수 있는 연락처를 남겨주세요!');
    if (phone) {
      // 장바구니 모든 상품들에 대해 구매 요청 전송
      const promises = this.picks.map((product) => {
        CartAPI.purchaseCartProduct({
          postID: product.postId,
          productID: product.id,
          phone: phone,
        });
      });

      await Promise.all(promises);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.list-title {
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 700;
}

.list-content-wrapper {
  list-style: none;
}

.cart-footer-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .price {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .payment-button {
    @include button();
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #69db7c;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
