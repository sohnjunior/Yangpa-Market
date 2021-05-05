<template>
  <div>
    <button v-for="(option, idx) in options" :key="idx" @click="onSelect(idx)">
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
  private lastSelectedOptionIdx: number;

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

<style lang="scss" scoped></style>
