<template>
  <v-dialog v-model="dialog" persistent width="450px">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col class="ml-5">
            <h2 class="font-weight-medium">Login</h2>
          </v-col>
          <v-col cols="2">
            <v-btn icon color="grey" @click="modalDestroy">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
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
          </v-form>
          <v-row justify="center">
            <v-btn
              x-large
              width="375"
              rounded
              color="orange"
              class="white--text"
              @click="Login"
              :disabled="!valid"
              >로그인하기</v-btn
            >
          </v-row>
        </v-container>
        <v-row justify="center">
          <span class="link" @click="moveRegister"
            >Not registerd? Create an account</span
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '../../utils/bus';
import { validateEmail } from '../../utils/validators';

export default {
  data() {
    return {
      valid: false,
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
  props: ['dialog'],
  methods: {
    // 로그인하기 or 취소 버튼 클릭 시 부모 컴포넌트에 이벤트 전달
    modalDestroy() {
      this.$emit('modalDestroy');
    },

    moveRegister() {
      this.modalDestroy();
      this.$router.push('/signup');
    },

    async Login() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      const success = await this.$store.dispatch('LOGIN', userData);
      if (success) {
        EventBus.$emit('popUp', '로그인 되었습니다.');
        this.modalDestroy();
      } else {
        alert('이메일 혹은 비밀번호를 확인해주세요');
      }
    },
  },
};
</script>

<style scoped>
.link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>