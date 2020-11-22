<template>
  <form @submit.prevent="submitForm">
    <h2>회원 가입</h2>

    <fieldset>
      <label>
        이메일 계정
        <input v-model="email" :rules="rulesMap.emailRules" required />
      </label>

      <label>
        비밀번호 (8~15자, 적어도 하나의 특수문자와 숫자 포함)
        <input v-model="password" :rules="rulesMap.passwordRules" type="password" required />
      </label>

      <label>
        비밀번호 확인
        <input
          v-model="confirmpassword"
          :rules="rulesMap.confirmPasswordRules"
          type="password"
          required
        />
      </label>

      <label>
        별명
        <input v-model="nickname" required />
      </label>

      <label>
        전화번호
        <input v-model="phone" :rules="rulesMap.phoneRules" />
      </label>
    </fieldset>

    <fieldset>
      <legend>성별</legend>
      <input type="radio" label="남" value="male" v-model="sex" />
      <input type="radio" label="여" value="female" v-model="sex" />
    </fieldset>

    <fieldset>
      <legend>관리자 계정</legend>
      <input type="radio" label="예" :value="true" v-model="isAdmin" />
      <input type="radio" label="아니오" :value="false" v-model="isAdmin" />
    </fieldset>

    <DatePicker @pick-date="onPickDate" />

    <SubmitButton :isValid="isValid">가입하기</SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserAPI } from '../../api';
import { validateEmail, validatePassword, validatePhoneNum } from '../../utils/validators';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
import DatePicker from '@components/Menu/DatePicker.vue';

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
  components: { SubmitButton, DatePicker },
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

  public async submitForm(): Promise<void> {
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

  public onPickDate(date): void {
    this.birthday = date;
  }
}
</script>

<style></style>
