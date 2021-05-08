<template>
  <div class="selectbox-container">
    <button
      :class="[selectedOptions[idx].isSelected ? 'selected' : '', 'select-option']"
      v-for="(option, idx) in options"
      :key="idx"
      @click="onSelect(idx)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface ISelectedOption {
  isSelected: boolean;
  optionName: string;
}

@Component({})
export default class SelectBox extends Vue {
  private selectedOptions: ISelectedOption[] = [];
  private lastSelectedOptionIdx = -1;

  @Prop({ default: 'multi' }) readonly mode!: 'single' | 'multi';
  @Prop({ required: true }) readonly options!: string[];
  @Prop({ default: -1 }) readonly initSelectedOptionIdx!: number;

  public created() {
    this.selectedOptions = this.options.map((option: string) => ({
      isSelected: false,
      optionName: option,
    }));
    this.lastSelectedOptionIdx = this.initSelectedOptionIdx;

    this.initializeSelectOption();
  }

  public initializeSelectOption() {
    if (this.lastSelectedOptionIdx >= this.selectedOptions.length) {
      throw new Error('초기 선택옵션 인덱스 범위를 벗어났습니다.');
    }

    if (this.lastSelectedOptionIdx === -1) {
      return;
    }

    this.selectedOptions[this.lastSelectedOptionIdx].isSelected = true;
  }

  public onSelect(idx: number) {
    switch (this.mode) {
      case 'multi':
        this.selectedOptions[idx].isSelected = !this.selectedOptions[idx].isSelected;
        break;
      case 'single':
        if (this.lastSelectedOptionIdx !== -1) {
          this.selectedOptions[this.lastSelectedOptionIdx].isSelected = false;
        }
        this.selectedOptions[idx].isSelected = true;
        break;
      default:
        throw new Error('지원하지 않는 타입입니다.');
    }

    const selectedOptionNames = this.selectedOptions
      .filter((selectedOption: ISelectedOption) => selectedOption.isSelected)
      .map((selectedOption: ISelectedOption) => selectedOption.optionName);

    this.$emit('select', selectedOptionNames);
    this.lastSelectedOptionIdx = idx;
  }
}
</script>

<style lang="scss" scoped>
.selectbox-container {
  margin-bottom: 20px;

  .select-option {
    padding: 15px;
    border: 2px solid #eeeeee;
    border-radius: 10px;
    background-color: white;
    font-size: 1.1rem;
    font-weight: 500;
    color: #eeeeee;
    cursor: pointer;
  }

  .select-option + .select-option {
    margin-left: 20px;
  }

  .selected {
    border: 2px solid #ffab91;
    color: #ffab91;
  }
}
</style>
