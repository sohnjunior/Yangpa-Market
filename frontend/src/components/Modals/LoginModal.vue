<template>
  <BaseModal :isOpen="show">
    <template v-slot:modal-header>
      <div class="modal-header-wrapper">
        <h1 class="modal-title">로그인</h1>
        <button class="close-btn" @click="closeModal">
          <v-icon>mdi-close-circle</v-icon>
        </button>
      </div>
    </template>
    <template v-slot:modal-content>
      <div class="modal-content-wrapper">
        <LoginForm @submit-form="onSubmit" />
        <span class="link" @click="moveToRegisterPage"> Not registerd? Create an account </span>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from '../../types';
import ToastBus from '../../bus/ToastBus';
import LoginForm from '@components/Forms/LoginForm.vue';
import BaseModal from '@components/Modals/BaseModal.vue';

const userModule = namespace('UserModule');

@Component({
  components: { LoginForm, BaseModal },
})
export default class LoginModal extends Vue {
  @Prop({ required: true, default: false }) readonly show!: boolean;

  public closeModal(): void {
    this.$emit('close-modal');
  }

  public moveToRegisterPage(): void {
    this.closeModal();
    this.$router.push('/signup');
  }

  public async onSubmit(userData: User): Promise<void> {
    const success = await this.login(userData);
    if (success) {
      ToastBus.$emit('pop-up', '로그인 되었습니다.');
      this.closeModal();
    } else {
      alert('이메일 혹은 비밀번호를 확인해주세요');
    }
  }

  @userModule.Action
  public login!: (userData: User) => Promise<boolean>;
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.modal-header-wrapper {
  display: flex;
  margin-bottom: 10px;

  .modal-title {
    @include modal-title();
  }

  .close-btn {
    @include modal-close-btn();
  }
}

.modal-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .link:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
