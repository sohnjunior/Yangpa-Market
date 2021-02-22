<template>
  <BaseModal :isOpen="isOpen">
    <template v-slot:modal-content>
      <div class="content-wrapper">
        <em class="caution-icon">⚠️</em>
        <p class="caution-message" v-html="refinedMessage" />
        <div class="button-wrapper">
          <button class="button" @click="onConfirm">확인</button>
          <button class="button" @click="onRedirect">취소</button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseModal from '@components/Modals/BaseModal.vue';
import AlertBus from '../../bus/AlertBus';

@Component({
  components: { BaseModal },
})
export default class AlertModal extends Vue {
  private isOpen = false;
  private message = '';
  private onConfirmCallback!: () => void;
  private onRejectCallback!: () => void;

  get refinedMessage() {
    return this.message.split('\n').join('<br />');
  }

  public created() {
    AlertBus.$on('alert-on', this.onAlertOn);
  }

  public onAlertOn(message: string, onConfirmCallback: () => void, onRejectCallback: () => void) {
    this.isOpen = true;
    this.message = message;
    this.onConfirmCallback = onConfirmCallback;
    this.onRejectCallback = onRejectCallback;
  }

  public onAlertOff() {
    this.isOpen = false;
  }

  public onConfirm() {
    this.onAlertOff();
    this.onConfirmCallback();
  }

  public onRedirect() {
    this.onAlertOff();
    this.onRejectCallback();
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .caution-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .caution-message {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 20px;
    line-height: 20px;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;

    .button {
      flex-basis: 50%;
      border: none;
      background-color: transparent;
      font-size: 1.1rem;
      font-weight: 600;
      color: black;
      cursor: pointer;
    }
  }
}
</style>
