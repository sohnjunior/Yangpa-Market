<template>
  <BaseModal :isOpen="show">
    <template v-slot:modal-header>
      <div class="modal-header-wrapper">
        <h1 class="modal-title">로그인</h1>
        <Icon class="close-btn" filename="close" width="25" height="25" @click="closeModal" />
      </div>
    </template>
    <template v-slot:modal-content>
      <div class="modal-content-wrapper">
        <LoginForm @submit-form="onSubmit" />
        <div class="signup-guide-wrapper">
          <span> 아직 계정이 없으신가요? </span>
          <span class="signup-link" @click="onRedirect">회원가입하기</span>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ToastBus from '../../bus/ToastBus';
import LoginForm from '@components/Forms/LoginForm.vue';
import BaseModal from '@components/Modals/BaseModal.vue';
import Icon from '@components/Common/Icon.vue';

const UserModule = namespace('UserModule');

@Component({
  components: { LoginForm, BaseModal, Icon },
})
export default class LoginModal extends Vue {
  @Prop({ required: true, default: false }) readonly show!: boolean;

  @UserModule.Action
  public login!: (userData: { email: string; password: string }) => Promise<boolean>;

  public closeModal() {
    this.$emit('close-modal');
  }

  public onRedirect() {
    this.closeModal();
    this.$router.push('/signup');
  }

  public async onSubmit(userData: { email: string; password: string }) {
    const success = await this.login(userData);
    if (success) {
      ToastBus.$emit('pop-up', '로그인 되었습니다.');
      this.closeModal();
    } else {
      alert('이메일 혹은 비밀번호를 확인해주세요');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

.modal-header-wrapper {
  display: flex;
  width: 250px;
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

  .signup-guide-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;

    .signup-link {
      margin-top: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    .signup-link:hover {
      color: $logo-color;
    }
  }
}
</style>
