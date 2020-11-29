<template>
  <div class="card-container">
    <div class="card-title">
      <slot name="card-title"></slot>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
    <div class="card-footer">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseCard extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.card-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 10px;
  background-color: #ffffff;
  width: fit-content;

  .card-title {
    @include text-shorthand();
    flex-basis: 20%;
  }

  .card-body {
    @include text-shorthand();
    flex-basis: 60%;
  }

  .card-footer {
    flex-basis: 20%;
  }
}
</style>
