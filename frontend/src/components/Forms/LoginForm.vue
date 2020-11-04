<template>
  <v-form v-model="isValid" @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <v-text-field
          class="login-form"
          label="email"
          placeholder="E-mail Address"
          required
          rounded
          solo
          autofocus
          v-model="email"
          :rules="emailRules"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          class="login-form"
          label="password"
          type="password"
          placeholder="Password"
          required
          rounded
          solo
          v-model="password"
          :rules="passwordRules"
        />
      </v-col>
    </v-row>
    <SubmitButton :isValid="isValid"> 로그인하기 </SubmitButton>
  </v-form>
</template>

<script>
import { validateEmail } from '@utils/validators';
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
