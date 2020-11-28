<template>
  <div v-show="isOpen" class="modal-container">
    <div class="modal-overlay"></div>
    <div class="modal">
      <slot name="modal-header"></slot>
      <slot name="modal-content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseModal extends Vue {
  @Prop({ required: true, default: false }) readonly isOpen!: boolean;
}
</script>

<style lang="scss" scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(33, 33, 33, 0.46);
  }

  .modal {
    padding: 40px;
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 99;
  }
}
</style>
