<template>
  <button type="submit" class="submit-btn" :disabled="!isValid">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SubmitButton extends Vue {
  @Prop({ required: true, default: true }) readonly isValid!: boolean;
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

$submit-btn-color: #69db7c;

.submit-btn {
  @include button();
  width: 100%;
  height: 50px;
  background-color: $submit-btn-color;
  color: white;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #efefef;
  }
}
</style>
