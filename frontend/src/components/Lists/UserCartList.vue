<template>
  <div>
    <h2 class="list-title">장바구니</h2>

    <ul class="list-content-wrapper">
      <li v-for="product in onSaleItems" :key="product.id">
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

// TODO: 핸드폰 번호 입력창 UX/UI 보완하기 (정해진 형식에 맞게 입력하기 쉽도록)
// TODO: 장바구니 비어있을 시 예외처리 Toast 팝업으로 변경
// TODO: 장바구니 상품 클릭 시 해당 상품 디테일 화면으로 이동

interface ICartProduct {
  id: number;
  CartProduct: { cardId: number; productId: number; createdAt: Date; updatedAt: Date };
  categoryId: number;
  postId: number;
  image: string;
  like: number;
  price: number;
  sold: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Component({
  components: { CartProductCard },
})
export default class UserCart extends Vue {
  private wishItems: ICartProduct[] = [];
  private onSaleItems: ICartProduct[] = []; // 내가 찜한 상품중 현재 판매중인것들

  get totalPrice() {
    return this.onSaleItems.reduce((acc, pick) => acc + pick.price, 0);
  }

  public async created() {
    try {
      const {
        data: { result },
      } = await CartAPI.fetchAllCartProducts();

      this.wishItems = result;
      this.onSaleItems = this.wishItems.filter((pick) => !pick.sold);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeFromCart(id: string) {
    try {
      const payload = { productID: id };
      await CartAPI.removeCartProduct(payload);
    } catch (err) {
      console.error(err);
    }
  }

  public async buyProducts() {
    const isPickExist = this.onSaleItems.length === 0;

    if (isPickExist) {
      alert('현재 구매가능한 물폼이 없습니다!');
      return;
    }

    const phone = prompt('핀매자와 연락할 수 있는 연락처를 남겨주세요!');

    if (phone) {
      /** 장바구니 모든 상품들에 대해 구매 요청 전송 */
      const promises = this.onSaleItems.map((product) => {
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
