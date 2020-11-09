<template>
  <v-container>
    <v-data-table :headers="onSaleHeaders" :items="onSaleList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'"> 판매 중 </v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small color="success" class="mr-2" @click="updateItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="error" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-spacer class="mt-7" />

    <v-data-table :headers="headers" :items="soldList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title style="font-family: 'paybooc-Bold'">판매 완료</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { OrderAPI, ProductAPI } from '../../api';

const userModule = namespace('UserModule');

const onSaleHeaders = [
  {
    text: '상품명',
    align: 'start',
    value: 'product.title',
    sortable: false,
    class: 'header',
  },
  {
    text: '가격',
    align: 'start',
    value: 'product.price',
    sortable: false,
    class: 'header',
  },
  {
    text: '조회수',
    align: 'start',
    value: 'hit',
    sortable: false,
    class: 'header',
  },
  {
    text: '좋아요',
    align: 'start',
    value: 'product.like',
    sortable: false,
    class: 'header',
  },
  { align: 'middle', value: 'actions', sortable: false },
];

const headers = [
  {
    text: '상품명',
    align: 'start',
    value: 'product.title',
    sortable: false,
    class: 'header',
  },
  {
    text: '판매가격',
    align: 'start',
    value: 'product.price',
    sortable: false,
    class: 'header',
  },
];

@Component
export default class UserSellingTable extends Vue {
  private dialog: boolean = false;
  private show: boolean = false;

  private onSaleList: any[] = [];
  private soldList: any[] = [];

  private onSaleHeaders = onSaleHeaders;
  private headers = headers;

  @userModule.Getter
  public getEmail!: string;

  async created() {
    const { data } = await OrderAPI.fetchSalesOrder();

    for (const p of data.products) {
      if (p.product.sold) {
        this.soldList.push(p);
      } else {
        this.onSaleList.push(p);
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
