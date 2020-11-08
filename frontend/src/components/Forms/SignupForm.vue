<template>
  <v-container style="width: 50%">
    <v-form v-model="isValid" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12">
          <v-card shaped title="회원 가입" class="px-5 py-3">
            <v-subheader class="display-1 mt-3"> 회원 가입 </v-subheader>

            <v-form class="pt-1">
              <v-text-field
                label="이메일 계정"
                v-model="email"
                :rules="rules.emailRules"
                class="mx-4"
                required
                hint="예시: yangpa@gmail.com"
                persistent-hint
              />

              <v-text-field
                label="비밀번호 (8~15자, 적어도 하나의 특수문자와 숫자 포함)"
                v-model="password"
                :rules="rules.passwordRules"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field
                label="비밀번호 확인"
                v-model="confirmpassword"
                :rules="rules.confirmPasswordRules"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field
                label="별명"
                v-model="nickname"
                class="mx-4"
                hint="예시: yangpa"
                persistent-hint
                required
              />

              <v-text-field
                label="전화번호"
                v-model="phone"
                :rules="rules.phoneRules"
                class="mx-4"
                hint="예시: 010-1234-5678"
                persistent-hint
              />

              <v-radio-group :row="true" class="mx-4" v-model="sex">
                성별
                <v-spacer />
                <v-radio label="남" value="male" />
                <v-radio label="여" value="female" />
              </v-radio-group>

              <v-radio-group :row="true" class="mx-4" v-model="isAdmin">
                관리자 계정
                <v-spacer />
                <v-radio label="예" :value="true" />
                <v-radio label="아니오" :value="false" />
              </v-radio-group>

              <v-col cols="mx-4">
                <DatePicker @pick-date="onPickDate" />
              </v-col>
              <SubmitButton :isValid="isValid">가입하기</SubmitButton>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
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
