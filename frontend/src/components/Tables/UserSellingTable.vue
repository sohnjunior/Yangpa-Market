<template>
  <div>
    <BaseTable :headers="onSaleHeaders" :items="onSaleItems">
      <template v-slot:table-name>
        <h1>판매 중</h1>
      </template>
      <template v-slot:table-action="item">
        <v-icon small @click="onUpdateItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="onDeleteItem(item)"> mdi-delete </v-icon>
      </template>
    </BaseTable>

    <BaseTable :headers="soldHeaders" :items="soldItems">
      <template v-slot:table-name>
        <h1>판매 완료</h1>
      </template>
    </BaseTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import BaseTable from '@components/Tables/BaseTable.vue';
import { OrderAPI, ProductAPI } from '../../api';

const userModule = namespace('UserModule');

interface ISalesProductHistory {
  productName: string;
  price: number;
  hit: number;
  like: number;
}

function normalize({ product, hit }: any): ISalesProductHistory {
  return {
    productName: product.title,
    price: product.price,
    hit: hit,
    like: product.like,
  };
}

@Component({
  components: { BaseTable },
})
export default class UserSellingTable extends Vue {
  private onSaleItems: ISalesProductHistory[] = [];
  private soldItems: ISalesProductHistory[] = [];

  private onSaleHeaders = ['상품명', '가격', '조회수', '좋아요', ''];
  private soldHeaders = ['상품명', '판매가격'];

  @userModule.Getter
  public getEmail!: string;

  async created() {
    const {
      data: { products },
    } = await OrderAPI.fetchSalesOrder();

    for (const product of products) {
      if (product.product.sold) {
        this.soldItems.push(normalize(product));
      } else {
        this.onSaleItems.push(normalize(product));
      }
    }
  }

  public onUpdateItem(item) {
    this.$router.push(`/product/update/${item.title}`);
  }

  public async onDeleteItem(item) {
    const allow = confirm('<' + item.product.title + '> 판매글을 정말로 삭제하시겠습니까?');
    if (allow) {
      await ProductAPI.deletePost(item.title);
    }
  }
}
</script>

<style></style>
