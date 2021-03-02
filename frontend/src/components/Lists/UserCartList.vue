<template>
  <div>
    <h2 class="list-title">장바구니</h2>

    <label>
      <input type="checkbox" v-model="checkAllFlag" />
      <span>모두선택</span>
    </label>
    <ul class="list-content-wrapper">
      <li v-for="(product, idx) in onSaleItems" :key="product.id">
        <input type="checkbox" v-model="checkFlags[idx]" />
        <CartProductCard
          :id="product.id"
          :name="product.name"
          :price="product.price"
          :image="product.photos[0].path"
          :status="product.isSold"
          @delete-product="removeFromCart"
          @click="onRedirect(product.id)"
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
import ToastBus from '../../bus/ToastBus';

const UserModule = namespace('UserModule');

@Component({
  components: { CartProductCard },
})
export default class UserCart extends Vue {
  /** 내가 장바구니에 담은 상품 */
  private wishItems: IProduct[] = [];
  /** 내가 장바구니에 담은 상품들 중에서 현재 판매중인 상품들 */
  private onSaleItems: IProduct[] = [];
  /** 각 상품 별 체크박스 선택 유무 */
  private checkFlags: boolean[] = [];

  @UserModule.Getter
  public userEmail!: string;

  get totalPrice() {
    return this.orderTargetItem.reduce((acc: number, item: IProduct) => acc + item.price, 0);
  }

  get checkAllFlag() {
    return this.checkFlags.every((flag: boolean) => flag);
  }

  set checkAllFlag(value: boolean) {
    this.checkFlags = this.checkFlags.map((_) => value);
  }

  get orderTargetItem() {
    return this.onSaleItems.filter((item: IProduct, idx: number) => this.checkFlags[idx]);
  }

  public async created() {
    try {
      const {
        data: { products },
      } = await CartAPI.fetchAllCartProducts();

      this.wishItems = products;
      this.checkFlags = Array.from(Array(products.length).fill(false));
      this.onSaleItems = this.wishItems.filter((item) => !item.isSold);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeFromCart(id: string) {
    try {
      const payload = { productID: id };
      await CartAPI.removeCartProduct(payload);
      ToastBus.$emit('pop-up', '장바구니에서 삭제되었습니다.');
    } catch (err) {
      console.error(err);
    }
  }

  public async buyProducts() {
    const isPickExist = this.onSaleItems.length === 0;

    if (isPickExist) {
      ToastBus.$emit('pop-up', '현재 구매가능한 상품이 없습니다!');
      return;
    }

    try {
      const orderTargetItemIds = this.orderTargetItem.map((item: IProduct) => item.id);

      await OrderAPI.createOrder({
        requestIds: orderTargetItemIds,
        buyerEmail: this.userEmail,
      });
    } catch (err) {
      console.error(err);
    }
  }

  public onRedirect(productId: number) {
    console.log(productId);
    this.$router.push(`/product/${productId}`);
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
