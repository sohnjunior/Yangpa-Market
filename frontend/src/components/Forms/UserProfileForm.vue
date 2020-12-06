<template>
  <form>
    <h1>프로필 설정</h1>

    <fieldset>
      <input type="email" placeholder="이메일 계정" v-model="email" />

      <input
        type="password"
        placeholder="변경할 비밀번호"
        v-model="password"
        :rules="passwordRules"
        required
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        v-model="confirmpassword"
        :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
        required
      />

      <input placeholder="별명" v-model="nickname" required />
      <input placeholder="전화번호" v-model="phone" />
    </fieldset>
    <fieldset>
      <label>
        남성
        <input type="radio" value="male" v-model="sex" />
      </label>
      <label>
        여성
        <input type="radio" value="female" v-model="sex" />
      </label>
    </fieldset>

    <DatePicker @pick-date="onPickDate" />
    <button type="submit" @click="submitForm">변경하기</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DatePicker from '@components/Menu/DatePicker.vue';
import { UserAPI } from '../../api';

@Component({
  components: { DatePicker },
})
export default class UserProfileForm extends Vue {
  private email: string = '';
  private password: string = '';
  private confirmpassword: string = '';
  private nickname: string = '';
  private phone: string = '';
  private sex: string = '';
  private birthday: string = '';
  private date: string = '';
  private menu: boolean = false;
  private passwordRules = [(v) => !!v || 'Password is required'];
  private confirmPasswordRules = [(v) => !!v || 'Confirm password'];

  get passwordConfirmationRule(): () => boolean | string {
    return () => this.password === this.confirmpassword || '비밀번호가 일치하지 않습니다';
  }

  async created() {
    const { data } = await UserAPI.fetchUser();
    this.email = data.result.email;
    this.password = data.result.password;
    this.confirmpassword = data.result.password;
    this.nickname = data.result.nickname;
    this.phone = data.result.phone;
    this.sex = data.result.sex;
    this.birthday = data.result.birthday.substr(0, 10);
  }

  public async submitForm(): Promise<void> {
    const userData = {
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      phone: this.phone,
      sex: this.sex,
      birthday: this.birthday,
    };

    try {
      const { data } = await UserAPI.updateUser(userData);
      this.$router.go(0);
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
