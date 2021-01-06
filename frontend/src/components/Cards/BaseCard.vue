<template>
  <div class="card-container" @click="onClickCard">
    <slot name="card-title" />
    <slot name="card-body" />
    <slot name="card-footer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseCard extends Vue {
  public onClickCard() {
    this.$emit('click');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.card-container {
  @include card-border();
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: fit-content;
  background-color: #ffffff;
  cursor: pointer;
}
</style>
