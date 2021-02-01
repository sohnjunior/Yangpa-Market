<template>
  <div>
    <BaseTable :headers="onSaleHeaders" :items="onSaleItems">
      <template v-slot:table-name>
        <h1 class="table-title">판매 중</h1>
      </template>
      <template v-slot:table-action="item">
        <Icon class="icon" filename="edit" width="18" height="18" @click="onEditItem(item)" />
        <Icon class="icon" filename="delete" width="18" height="18" @click="onDeleteItem(item)" />
      </template>
    </BaseTable>

    <BaseTable :headers="soldHeaders" :items="soldItems">
      <template v-slot:table-name>
        <h1 class="table-title">판매 완료</h1>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Icon from '@components/Common/Icon.vue';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI, ProductAPI } from '../../api';

const userModule = namespace('UserModule');

interface ISalesProductHistory {
  id: number;
  productName: string;
  price: number;
  hit: number;
  like: number;
}

function normalize({ id, product, hit }): ISalesProductHistory {
  return {
    id: id,
    productName: product.title,
    price: product.price,
    hit: hit,
    like: product.like,
  };
}

@Component({
  components: { Icon, BaseTable },
})
export default class UserSellingTable extends Vue {
  private onSaleItems: ISalesProductHistory[] = [];
  private soldItems: ISalesProductHistory[] = [];
  private orderHashMap = new Map<number, string>();
  private onSaleHeaders = ['상품번호', '상품명', '가격', '조회수', '좋아요', ''];
  private soldHeaders = ['상품번호', '상품명', '판매가격', '조회수', '좋아요'];

  async created() {
    const {
      data: { products },
    } = await OrderAPI.fetchSalesOrder();

    for (const product of products) {
      if (product.product.sold) {
        this.soldItems.push(normalize(product));
      } else {
        this.orderHashMap.set(product.id, product.title);
        this.onSaleItems.push(normalize(product));
      }
    }
  }

  public onEditItem({ item }: { item: ISalesProductHistory }) {
    const orderHash = this.orderHashMap.get(item.id);

    this.$router.push(`/product/edit/${orderHash}`);
  }

  public async onDeleteItem({ item }: { item: ISalesProductHistory }) {
    const allow = confirm('<' + item.productName + '> 판매글을 정말로 삭제하시겠습니까?');
    const orderHash = this.orderHashMap.get(item.id);

    if (!allow || !orderHash) return;

    try {
      await ProductAPI.deletePost(orderHash);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  font-size: 2rem;
  font-weight: 700;
}

.icon {
  cursor: pointer;
  &:first-child {
    margin-right: 15px;
  }
}
</style>
