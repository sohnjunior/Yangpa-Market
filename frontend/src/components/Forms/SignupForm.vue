<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <h2 class="form-title">✍️ 회원 가입</h2>

    <fieldset class="form-fieldset">
      <input type="email" v-model="email" placeholder="이메일 주소" />
      <span class="error" v-show="!validation.email.isValid">
        {{ validation.email.message }}
      </span>

      <input type="password" v-model="password" placeholder="비밀번호" />
      <span class="error" v-show="!validation.password.isValid">
        {{ validation.password.message }}
      </span>

      <input type="password" v-model="confirmPassword" placeholder="비밀번호 확인" />
      <span class="error" v-show="!validation.confirmPassword.isValid">
        {{ validation.confirmPassword.message }}
      </span>

      <input type="text" v-model="nickname" placeholder="별명" />
      <span class="error" v-show="!validation.nickname.isValid">
        {{ validation.nickname.message }}
      </span>

      <input type="tel" v-model="phone" placeholder="연락처" />
      <span class="error" v-show="!validation.phone.isValid">
        {{ validation.phone.message }}
      </span>

      <select v-model="sex">
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
    </fieldset>

    <!-- <DatePicker @pick-date="onPickDate" /> -->

    <SubmitButton :isValid="isFormValid">가입하기</SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserAPI } from '../../api';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validators';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
// import DatePicker from '@components/Inputs/DatePicker.vue';

interface IValidation {
  isValid: boolean;
  message: string;
}

interface ISigninValidation {
  email: IValidation;
  password: IValidation;
  confirmPassword: IValidation;
  nickname: IValidation;
  phone: IValidation;
}

@Component({
  components: { SubmitButton },
})
export default class SignupForm extends Vue {
  private email = '';
  private password = '';
  private confirmPassword = '';
  private nickname = '';
  private phone = '';
  private sex = 'male';
  private birthday = ''; // TODO: DatePicker 컴포넌트 구현 후 적용
  private isAdmin = false; // TODO: 회원가입 api 에서 isAdmin 제거

  private validation: ISigninValidation = {
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    phone: { isValid: false, message: '' },
  };

  get isFormValid() {
    return Object.values(this.validation).every((v) => v.isValid);
  }

  public async onSubmit() {
    const userData = {
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      phone: this.phone,
      sex: this.sex,
      birthday: this.birthday,
      admin: this.isAdmin,
    };

    try {
      await UserAPI.registerUser(userData);
      this.$router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  public onPickDate(date) {
    this.birthday = date;
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
    this.validation.password.message = isValid
      ? ''
      : '비밀번호 형식을 확인해주세요(8~15자 적어도 하나의 특수문자 및 숫자 포함)';
  }

  @Watch('confirmPassword')
  public onWatchConfirmPassword(value: string) {
    const isValid = this.password === value;

    this.validation.confirmPassword.isValid = isValid;
    this.validation.confirmPassword.message = isValid ? '' : '비밀번호가 일치하지 않아요';
  }

  @Watch('nickname')
  public onWatchNickname(value: string) {
    const isValid = value !== '';

    this.validation.nickname.isValid = isValid;
    this.validation.nickname.message = isValid ? '' : '별명을 확인해주세요';
  }

  @Watch('phone')
  public onWatchPhone(value: string) {
    const isValid = validatePhone(value);

    this.validation.phone.isValid = isValid;
    this.validation.phone.message = isValid ? '' : '연락처 형식을 확인해주세요(- 포함)';
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
    margin-bottom: 30px;

    .error {
      @include error-message();
    }

    input,
    select {
      width: 100%;
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
