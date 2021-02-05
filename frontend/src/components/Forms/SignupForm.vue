<template>
  <form class="form-container" @submit.prevent="submitForm">
    <h2 class="form-title">✍️ 회원 가입</h2>

    <fieldset class="form-fieldset">
      <input v-model="email" placeholder="이메일 주소" />

      <input v-model="password" type="password" placeholder="비밀번호" />
      <span class="password-help">8~15자, 적어도 하나의 특수문자와 숫자 포함</span>

      <input v-model="confirmpassword" type="password" placeholder="비밀번호 확인" />

      <input v-model="nickname" placeholder="별명" />

      <input v-model="phone" placeholder="연락처" />

      <select v-model="sex">
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
    </fieldset>

    <!-- <DatePicker @pick-date="onPickDate" /> -->

    <SubmitButton :isValid="isValid">가입하기</SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserAPI } from '../../api';
import { validateEmail, validatePassword, validatePhoneNum } from '../../utils/validators';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
// import DatePicker from '@components/Inputs/DatePicker.vue';

const rulesMap = {
  emailRules: [
    (v) => !!v || 'email을 입력하세요',
    (v) => validateEmail(v) || '올바른 email 형식이 아닙니다',
  ],
  passwordRules: [
    (v) => !!v || '비밀번호를 입력하세요',
    (v) => validatePassword(v) || '올바른 비밀번호 형식이 아닙니다',
  ],
  confirmPasswordRules: [
    (v) => !!v || '비밀번호가 일치하지 않습니다',
    // (v) => this.password === v || '비밀번호가 일치하지 않습니다.',
  ],
  phoneRules: [
    (v) => !!v || '전화번호를 입력하세요',
    (v) => validatePhoneNum(v) || '전화번호 형식을 확인해주세요',
  ],
};

@Component({
  components: { SubmitButton },
})
export default class SignupForm extends Vue {
  private email: string = '';
  private password: string = '';
  private confirmpassword: string = '';
  private nickname: string = '';
  private phone: string = '';
  private sex: string = 'male';
  private birthday: string = '';
  private isAdmin: boolean = false;
  private isValid: boolean = false;
  private rulesMap = rulesMap;

  public async submitForm() {
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
}
</script>

<style lang="scss">
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

    .password-help {
      font-size: 1rem;
    }

    input,
    select {
      width: 100%;
      margin: 5px 0px;
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
