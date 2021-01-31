<template>
  <transition name="toast" appear>
    <div class="toast-container" v-if="isOpen">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToastBus from '../../bus/ToastBus';

@Component
export default class ToastModal extends Vue {
  private isOpen = false;
  private message = '';
  private timeout = 2000;

  public created() {
    ToastBus.$on('pop-up', this.onPopupMessage);
  }

  public onPopupMessage(message: string) {
    this.isOpen = true;
    this.message = message;
    setTimeout(this.onPopdownMessage, this.timeout);
  }

  public onPopdownMessage() {
    this.isOpen = false;
    this.message = '';
  }
}
</script>

<style lang="scss">
.toast-container {
  position: fixed;
  top: 130px;
  right: calc(50% - 150px);
  width: 300px;
  padding: 10px 25px;
  border: none;
  border-radius: 10px;
  background-color: #adb5bd;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-align: center;
  z-index: 99;
}

.toast-enter,
.toast-leave-to {
  transform: scale(0);
}

.toast-enter-to,
.toast-leave {
  transform: scale(1);
}

.toast-enter-active,
.toast-leave-active {
  transition: transform 0.3s ease;
}
</style>
