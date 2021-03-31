<template functional>
  <div class="table-container">
    <slot name="table-name" />
    <table class="table-wrapper">
      <thead>
        <tr class="table-header-row">
          <th v-for="(header, index) in props.headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody v-if="props.items.length !== 0">
        <tr class="table-content-row" v-for="(item, index) in props.items" :key="index">
          <td v-for="(cell, index) in item" :key="index">{{ cell }}</td>
          <td><slot name="table-action" :item="item" /></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="fallback-row">
          <component :is="$options.components.Fallback" />
          <span>목록이 없습니다</span>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Fallback from '@components/Common/Fallback.vue';

@Component({
  components: { Fallback },
})
export default class BaseTable extends Vue {
  @Prop({ required: true }) readonly headers!: string[];
  @Prop({ required: true }) readonly items!: any[];
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

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

      @media screen and (max-width: $mobile-width) {
        font-size: 0.9rem;
      }
    }

    .fallback-row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
}
</style>
