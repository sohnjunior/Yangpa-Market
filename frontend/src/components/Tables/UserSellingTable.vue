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
import Icon from '@components/Common/Icon.vue';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI, ProductAPI } from '../../api';
import { IProduct } from '../../types';

interface ISalesProductHistory {
  id: number;
  productName: string;
  price: number;
  views: number;
  likes: number;
}

function normalize(product: IProduct): ISalesProductHistory {
  return {
    id: product.id,
    productName: product.name,
    price: product.price,
    views: product.views,
    likes: product.likes,
  };
}

@Component({
  components: { Icon, BaseTable },
})
export default class UserSellingTable extends Vue {
  private onSaleItems: ISalesProductHistory[] = [];
  private soldItems: ISalesProductHistory[] = [];
  private onSaleHeaders = ['상품번호', '상품명', '가격', '조회수', '좋아요', ''];
  private soldHeaders = ['상품번호', '상품명', '판매가격', '조회수', '좋아요'];

  async created() {
    const {
      data: { infos },
    } = await OrderAPI.fetchSalesOrder();

    for (const product of infos) {
      if (product.isSold) {
        this.soldItems.push(normalize(product));
      } else {
        this.onSaleItems.push(normalize(product));
      }
    }
  }

  public onEditItem({ item }: { item: ISalesProductHistory }) {
    const productID = `${item.id}`;

    this.$router.push(`/product/edit/${productID}`);
  }

  public async onDeleteItem({ item }: { item: ISalesProductHistory }) {
    const allow = confirm('<' + item.productName + '> 판매글을 정말로 삭제하시겠습니까?');
    const productID = `${item.id}`;

    if (!allow || !productID) return;

    try {
      await ProductAPI.deletePost(productID);
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
