<template>
  <div class="card-container">
    <slot name="card-title"></slot>
    <slot name="card-body"></slot>
    <slot name="card-footer"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseCard extends Vue {}
</script>

<style lang="scss" scoped>
.card-container {
  width: 260px;
  max-height: 420px;
  border: 1px solid rgb(238, 238, 238);
  background-color: #ffffff;
}
</style>
