<template>
  <div class="filter-container">
    <div :class="getStyle(item)" v-for="(item, index) in items" :key="index">
      <label>
        <input type="radio" name="filter" :value="item" v-model="checked" />
        {{ item }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch } from 'vue-property-decorator';

@Component({})
export default class FilterList extends Vue {
  @Model('change', { type: String }) value!: string;

  private items = ['등록일', '조회수', '가격'];
  private checked = '등록일';

  public getStyle(value: string) {
    const isChecked = value === this.checked;

    return isChecked ? 'filter checked' : 'filter';
  }

  @Watch('checked')
  public onWatchChecked() {
    this.$emit('change', this.checked);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.filter-container {
  display: flex;
  margin-bottom: 20px;

  .filter {
    width: 100px;
    margin-right: 20px;
    padding: 10px 15px;
    border: 2px solid #ffab91;
    border-radius: 20px;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffab91;

    input[type='radio'] {
      display: none;
    }

    @media screen and (max-width: $mobile-width) {
      & {
        padding: 5px 10px;
        font-size: 0.9rem;
      }
    }
  }

  .checked {
    background-color: #ffab91;
    color: white;
  }
}
</style>
