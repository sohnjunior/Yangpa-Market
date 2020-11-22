<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <input
        type="text"
        label="email"
        placeholder="이메일 주소"
        required
        autofocus
        v-model="email"
        :rules="emailRules"
      />
      <input
        type="password"
        label="password"
        placeholder="비밀번호"
        required
        v-model="password"
        :rules="passwordRules"
      />
    </fieldset>

    <SubmitButton :isValid="isValid"> 로그인하기 </SubmitButton>
  </form>
</template>

<script>
import { validateEmail } from '../../utils/validators';
import SubmitButton from '@components/Buttons/SubmitButton';

export default {
  components: { SubmitButton },

  data() {
    return {
      isValid: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'email을 입력하세요',
        (v) => validateEmail(v) || '올바른 email 형식이 아닙니다',
      ],
      passwordRules: [
        (v) => !!v || '비밀번호를 입력하세요',
        //v => validatePassword(v) || '올바른 비밀번호 형식이 아닙니다',
      ],
    };
  },

  methods: {
    onSubmit() {
      this.$emit('submit-form', { email: this.email, password: this.password });
    },
  },
};
</script>

<style></style>
