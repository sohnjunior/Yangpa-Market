<template>
  <table>
    <slot name="table-name"></slot>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(cell, index) in item" :key="index">{{ cell }}</td>
        <td><slot name="table-action" :item="item"></slot></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseTable extends Vue {
  @Prop({ required: true }) readonly headers!: string[];
  @Prop({ required: true }) readonly items!: any[];
}
</script>

<style></style>
