<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <h2 class="form-title">✍️ 회원 가입</h2>

    <fieldset class="form-fieldset">
      <AvatarInput class="profile-input" @change="onChangeAvatar" />

      <input type="email" v-model="formData.email" placeholder="이메일 주소" />
      <span class="error" v-show="!validation.email.isValid">
        {{ validation.email.message }}
      </span>

      <input type="password" v-model="formData.password" placeholder="비밀번호" />
      <span class="error" v-show="!validation.password.isValid">
        {{ validation.password.message }}
      </span>

      <input type="password" v-model="formData.confirmPassword" placeholder="비밀번호 확인" />
      <span class="error" v-show="!validation.confirmPassword.isValid">
        {{ validation.confirmPassword.message }}
      </span>

      <input type="text" v-model="formData.nickname" placeholder="별명" />
      <span class="error" v-show="!validation.nickname.isValid">
        {{ validation.nickname.message }}
      </span>

      <input type="tel" v-model="formData.contact" placeholder="연락처" />
      <span class="error" v-show="!validation.contact.isValid">
        {{ validation.contact.message }}
      </span>
    </fieldset>

    <DateInput />

    <SubmitButton :isValid="isFormValid">가입하기</SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { validateEmail, validatePassword, validateContact } from '../../utils/validators';
import AvatarInput from '@components/Inputs/AvatarInput.vue';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
import { IUserSignupForm } from '../../types';

interface IValidation {
  isValid: boolean;
  message: string;
}

interface ISigninValidation {
  email: IValidation;
  password: IValidation;
  confirmPassword: IValidation;
  nickname: IValidation;
  contact: IValidation;
}

@Component({
  components: { AvatarInput, SubmitButton },
})
export default class SignupForm extends Vue {
  private formData: IUserSignupForm = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    contact: '',
    avatar: null,
  };

  private validation: ISigninValidation = {
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    contact: { isValid: false, message: '' },
  };

  get isFormValid() {
    return Object.values(this.validation).every((v) => v.isValid);
  }

  public async onSubmit() {
    try {
      this.$emit('submit', this.formData);
    } catch (error) {
      console.log(error);
    }
  }

  public onChangeAvatar(file: File) {
    this.formData.avatar = file;
  }

  @Watch('formData.email')
  public onWatchEmail(value: string) {
    const isValid = validateEmail(value);

    this.validation.email.isValid = isValid;
    this.validation.email.message = isValid ? '' : '이메일 형식을 확인해주세요';
  }

  @Watch('formData.password')
  public onWatchPassword(value: string) {
    const isValid = validatePassword(value);

    this.validation.password.isValid = isValid;
    this.validation.password.message = isValid
      ? ''
      : '비밀번호 형식을 확인해주세요(8~15자 적어도 하나의 특수문자 및 숫자 포함)';
  }

  @Watch('formData.confirmPassword')
  public onWatchConfirmPassword(value: string) {
    const isValid = this.formData.password === value;

    this.validation.confirmPassword.isValid = isValid;
    this.validation.confirmPassword.message = isValid ? '' : '비밀번호가 일치하지 않아요';
  }

  @Watch('formData.nickname')
  public onWatchNickname(value: string) {
    const isValid = value !== '';

    this.validation.nickname.isValid = isValid;
    this.validation.nickname.message = isValid ? '' : '별명을 확인해주세요';
  }

  @Watch('formData.contact')
  public onWatchContact(value: string) {
    const isValid = validateContact(value);

    this.validation.contact.isValid = isValid;
    this.validation.contact.message = isValid ? '' : '연락처 형식을 확인해주세요(- 포함)';
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 0px 30px;

  .form-title {
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: 700;
  }

  .form-fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;

    .error {
      @include error-message();
    }

    .profile-input {
      margin: 15px 0px;
    }

    input,
    select {
      width: inherit;
      margin: 10px 0px;
      padding: 15px 20px;
      border: 1px solid #efefef;
      border-radius: 5px;
      background-color: white;
      font-size: 1rem;
      font-weight: 500;

      &::placeholder {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
}
</style>
