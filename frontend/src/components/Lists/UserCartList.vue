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
import { namespace } from 'vuex-class';
import CartProductCard from '@components/Cards/CartProductCard.vue';
import { CartAPI, OrderAPI } from '../../api';
import { IProduct } from '../../types';

// TODO: 핸드폰 번호 입력창 UX/UI 보완하기 (정해진 형식에 맞게 입력하기 쉽도록)
// TODO: 장바구니 비어있을 시 예외처리 Toast 팝업으로 변경
// TODO: 장바구니 상품 클릭 시 해당 상품 디테일 화면으로 이동

const UserModule = namespace('UserModule');

@Component({
  components: { CartProductCard },
})
export default class UserCart extends Vue {
  private wishItems: IProduct[] = [];
  private onSaleItems: IProduct[] = []; // 내가 찜한 상품중 현재 판매중인것들
  private orderTargetItemIds: number[] = []; // TODO: 내가 선택한 주문할 상품 목록을 토글 형식으로 (computed 속성으로 변경 예정)

  @UserModule.Getter
  public currentEmail!: string;

  get totalPrice() {
    return this.onSaleItems.reduce((acc, item) => acc + item.price, 0);
  }

  public async created() {
    try {
      const {
        data: { products },
      } = await CartAPI.fetchAllCartProducts();

      this.wishItems = products;
      this.onSaleItems = this.wishItems.filter((item) => !item.isSold);
      this.orderTargetItemIds = this.onSaleItems.map((item) => item.id);
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

    // TODO: 상품 구매 API 연동

    // if (phone) {
    //   /** 장바구니 모든 상품들에 대해 구매 요청 전송 */
    //   const promises = this.onSaleItems.map((product) => {
    //     CartAPI.purchaseCartProduct({
    //       postID: product.postId,
    //       productID: product.id,
    //       phone: phone,
    //     });
    //   });

    //   await Promise.all(promises);
    // }
    try {
      await OrderAPI.createOrder({
        requestIds: this.orderTargetItemIds,
        buyerEmail: this.currentEmail,
      });
    } catch (err) {
      console.error(err);
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

  li + li {
    margin-top: 20px;
  }
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
    padding: 12px 0px;
    max-width: 700px;
    background-color: #8ce99a;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>
