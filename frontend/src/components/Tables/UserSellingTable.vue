<template>
  <div>
    <BaseTable :headers="onSaleHeaders" :items="onSaleList">
      <template v-slot:table-name>
        <h1>판매 중</h1>
      </template>
      <template v-slot:table-action="item">
        <v-icon small @click="updateItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </BaseTable>

    <BaseTable :headers="soldHeaders" :items="soldList">
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

const onSaleHeaders = ['상품명', '가격', '조회수', '좋아요', ''];
const soldHeaders = ['상품명', '판매가격'];

@Component({
  components: { BaseTable },
})
export default class UserSellingTable extends Vue {
  private dialog: boolean = false;
  private show: boolean = false;

  private onSaleList: any[] = [];
  private soldList: any[] = [];

  private onSaleHeaders = onSaleHeaders;
  private soldHeaders = soldHeaders;

  @userModule.Getter
  public getEmail!: string;

  async created() {
    const {
      data: { products },
    } = await OrderAPI.fetchSalesOrder();

    for (const product of products) {
      if (product.product.sold) {
        this.soldList.push(product);
      } else {
        this.onSaleList.push(product);
      }
    }
  }

  public showReviewModal(): void {
    this.show = true;
  }

  public closeDialog(): void {
    this.show = false;
  }

  public updateItem(item): void {
    this.$router.push(`/product/update/${item.title}`);
  }

  public async deleteItem(item): Promise<void> {
    const allow = confirm('<' + item.product.title + '> 판매글을 정말로 삭제하시겠습니까?');
    if (allow) {
      await ProductAPI.deletePost(item.title);
    }
  }
}
</script>

<style></style>
