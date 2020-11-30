<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <fieldset class="input-wrapper">
      <input type="text" name="email" placeholder="이메일 주소" required v-model="email" />
      <input type="password" name="password" placeholder="비밀번호" required v-model="password" />
    </fieldset>

    <SubmitButton :isValid="isValid"> 로그인하기 </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { validateEmail } from '../../utils/validators';
import SubmitButton from '@components/Buttons/SubmitButton.vue';

@Component({
  components: { SubmitButton },
})
export default class LoginForm extends Vue {
  private isValid = true; // FIXME: 입력 값에 따라 valid 유무 판단 로직 추가
  private email = '';
  private password = '';
  private emailRules = [
    (v) => !!v || 'email을 입력하세요',
    (v) => validateEmail(v) || '올바른 email 형식이 아닙니다',
  ];
  private passwordRules = [
    (v) => !!v || '비밀번호를 입력하세요',
    //v => validatePassword(v) || '올바른 비밀번호 형식이 아닙니다',
  ];

  public click() {
    console.log('ah');
  }

  public onSubmit() {
    this.$emit('submit-form', { email: this.email, password: this.password });
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin: 30px 0px;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    input {
      margin-bottom: 30px;
      padding: 10px;
      border-bottom: 1px solid #898989;
      outline: none;

      &::placeholder {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }
  }
}
</style>
