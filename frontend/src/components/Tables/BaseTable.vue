<template>
  <div class="table-container">
    <slot name="table-name" />
    <table class="table-wrapper">
      <thead>
        <tr class="table-header-row">
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-content-row" v-for="(item, index) in items" :key="index">
          <td v-for="(cell, index) in item" :key="index">{{ cell }}</td>
          <td><slot name="table-action" :item="item" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseTable extends Vue {
  @Prop({ required: true }) readonly headers!: string[];
  @Prop({ required: true }) readonly items!: any[];
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-bottom: 80px;

  .table-wrapper {
    width: 100%;
    margin-top: 20px;

    .table-header-row {
      font-size: 0.8rem;
      border-bottom: 1px solid #e4e7e8;

      th {
        padding: 15px 0px;
      }
    }

    .table-content-row {
      font-size: 1.1rem;
      font-weight: 500;

      td {
        flex-basis: 10%;
        padding: 15px 0px;
        text-align: center;
      }
    }
  }
}
</style>
