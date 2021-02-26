<template>
  <nav class="pagination-container">
    <button class="arrow-btn" @click="onPrev">
      <span class="arrow">&lt;</span>
    </button>
    <button
      :class="[isSelected(pageNumber) ? 'selected' : '', 'pagination-item']"
      v-for="pageNumber in paginationItems"
      :key="pageNumber"
      @click="onSelect(pageNumber)"
    >
      <span class="page-number">{{ pageNumber }}</span>
    </button>
    <button class="arrow-btn" @click="onNext">
      <span class="arrow">&gt;</span>
    </button>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class Pagination extends Vue {
  @Prop({ required: true }) maxPage!: number;
  @Prop({ default: 5 }) boundaryCount!: number;
  @Prop({ default: 1 }) defaultPage!: number;

  private currentPage = this.defaultPage;

  get paginationItems() {
    const startPageNumber =
      ~~((this.currentPage - 1) / this.boundaryCount) * this.boundaryCount + 1;
    const endPageNumber = Math.min(this.maxPage, startPageNumber + this.boundaryCount - 1);

    const pages = [];
    for (let i = startPageNumber; i <= endPageNumber; i++) {
      pages.push(i);
    }

    return pages;
  }

  public isSelected(pageNumber: number) {
    return pageNumber === this.currentPage;
  }

  public onPrev() {
    this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
  }

  public onNext() {
    this.currentPage = this.currentPage < this.maxPage ? this.currentPage + 1 : this.currentPage;
  }

  public onSelect(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  @Watch('currentPage')
  public onWatchCurrentPage() {
    this.$emit('paginate', this.currentPage);
  }
}
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .pagination-item {
    margin: 0px 5px;
    padding: 10px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    outline: none;

    .page-number {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    &:hover {
      background-color: rgba(255, 171, 145, 0.2);
    }
  }

  .selected {
    background-color: rgba(255, 171, 145, 0.2);
  }

  .arrow-btn {
    padding: 10px;
    border: 1px solid #eeeeee;
    background-color: white;
    cursor: pointer;

    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      font-size: 1rem;
      font-weight: 500;
    }

    &:hover {
      background-color: rgba(255, 171, 145, 0.2);
    }
  }
}
</style>
