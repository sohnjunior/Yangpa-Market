<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">로그인</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  label="email" 
                  required 
                  v-model="email"
                  :rules="emailRules"
                  />
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  label="password" 
                  type="password" 
                  required 
                  v-model="password"
                  :rules="passwordRules"
                  />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="Login" :disabled="!valid">로그인하기</v-btn>
        <v-btn color="blue darken-1" text @click="modalDestroy">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validateEmail } from '../utils/validators';

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'email을 입력하세요',
        v => validateEmail(v) || '올바른 email 형식이 아닙니다',
      ],
      passwordRules: [
        v => !!v || '비밀번호를 입력하세요',
        //v => validatePassword(v) || '올바른 비밀번호 형식이 아닙니다',
      ]
    }
  },
  props: ['dialog'],
  methods: {
    // 로그인하기 or 취소 버튼 클릭 시 부모 컴포넌트에 이벤트 전달
    modalDestroy() {
      this.$emit('modalDestroy');
    },

    async Login() {
      const userData = {
        email : this.email,
        password : this.password,
      };
      
      const success =  await this.$store.dispatch('LOGIN', userData);
      if (success) {
        // 토스트 메시지 출력 후 모달 종료
        
        this.modalDestroy();
      } else {
        alert('이메일 혹은 비밀번호를 확인해주세요');
      }
    }
  }
}
</script>

<style>
</style>