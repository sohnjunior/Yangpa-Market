<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <fieldset class="input-wrapper">
      <input type="text" name="email" placeholder="이메일 주소" v-model="email" />
      <span class="error" v-show="!validation.email.isValid">
        {{ validation.email.message }}
      </span>

      <input type="password" name="password" placeholder="비밀번호" v-model="password" />
      <span class="error" v-show="!validation.password.isValid">
        {{ validation.password.message }}
      </span>
    </fieldset>

    <SubmitButton :isValid="isFormValid"> 로그인하기 </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
import { validateEmail, validatePassword } from '../../utils/validators';

interface ILoginValidation {
  email: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
}

@Component({
  components: { SubmitButton },
})
export default class LoginForm extends Vue {
  private email = '';
  private password = '';

  private validation: ILoginValidation = {
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
  };

  get isFormValid() {
    return Object.values(this.validation).every((v) => v.isValid);
  }

  public onSubmit() {
    this.$emit('submit-form', { email: this.email, password: this.password });
  }

  @Watch('email')
  public onWatchEmail(value: string) {
    const isValid = validateEmail(value);

    this.validation.email.isValid = isValid;
    this.validation.email.message = isValid ? '' : '이메일 형식을 확인해주세요';
  }

  @Watch('password')
  public onWatchPassword(value: string) {
    const isValid = validatePassword(value);

    this.validation.password.isValid = isValid;
    this.validation.password.message = isValid ? '' : '비밀번호 형식을 확인해주세요';
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.login-form {
  margin: 30px 0px;
  width: 90%;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    input {
      margin-bottom: 10px;
      padding: 10px;
      border-bottom: 1px solid #898989;
      outline: none;

      &::placeholder {
        font-size: 1rem;
        font-weight: 500;
      }
    }

    .error {
      margin-bottom: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      color: $error-color;
    }
  }
}
</style>
