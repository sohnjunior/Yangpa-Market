<template>
  <form class="form-container">
    <h1 class="form-title">프로필 설정</h1>

    <fieldset>
      <legend>나의 프로필</legend>

      <label>
        <span class="label">이메일</span>
        <input type="email" placeholder="이메일 계정" v-model="email" />
      </label>
      <label>
        <span class="label">닉네임</span>
        <input placeholder="별명" v-model="nickname" required />
      </label>
      <label>
        <span class="label">연락처</span>
        <input placeholder="전화번호" v-model="phone" />
      </label>

      <button class="submit-btn" type="submit" @click="onEditProfile">변경하기</button>
    </fieldset>

    <fieldset>
      <legend>비밀번호 변경</legend>

      <input type="password" placeholder="현재 비밀번호" v-model="oldPassword" />
      <input type="password" placeholder="새 비밀번호" v-model="newPassword" />
      <input type="password" placeholder="새 비밀번호 확인" v-model="confirmPassword" />

      <button class="submit-btn" type="submit" @click="onEditPassword">변경하기</button>
    </fieldset>

    <fieldset>
      <legend>성별</legend>

      <label>
        남성
        <input type="radio" value="male" v-model="sex" />
      </label>
      <label>
        여성
        <input type="radio" value="female" v-model="sex" />
      </label>

      <button class="submit-btn" type="submit" @click="onEditSex">변경하기</button>
    </fieldset>

    <!-- TODO: DatePicker 컴포넌트 구현 후 적용 -->
    <!-- <DatePicker @pick-date="onPickDate" /> -->
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import DatePicker from '@components/Inputs/DatePicker.vue';
import { UserAPI } from '../../api';

function parseBirthday(date: string) {
  return date.substr(0, 10);
}

@Component({})
export default class UserProfileForm extends Vue {
  private email = '';
  private oldPassword = '';
  private newPassword = '';
  private confirmPassword = '';
  private nickname = '';
  private phone = '';
  private sex = '';
  private birthday = '';

  private passwordRules = [(v) => !!v || 'Password is required'];
  private confirmPasswordRules = [(v) => !!v || 'Confirm password'];

  get passwordConfirmationRule(): () => boolean | string {
    return () => this.newPassword === this.confirmPassword || '비밀번호가 일치하지 않습니다';
  }

  public async created() {
    const {
      data: { result: userInfo },
    } = await UserAPI.fetchUser();

    this.email = userInfo.email;
    this.nickname = userInfo.nickname;
    this.phone = userInfo.phone;
    this.sex = userInfo.sex;
    this.birthday = parseBirthday(userInfo.birthday);
  }

  // public async onSubmitForm() {
  //   const userData = {
  //     email: this.email,
  //     password: this.password,
  //     nickname: this.nickname,
  //     phone: this.phone,
  //     sex: this.sex,
  //     birthday: this.birthday,
  //   };

  //   try {
  //     const { data } = await UserAPI.updateUser(userData);
  //     this.$router.go(0);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  public onEditProfile() {
    // TODO: 프로필 수정 api 구현
  }

  public onEditPassword() {
    // TODO: 비밀번호 수정 api 구현
  }

  public onEditSex() {
    // TODO: 성별 수정 api 구현
  }

  public onPickDate(date) {
    this.birthday = date;
  }
}
</script>

<style lang="scss">
.form-container {
  display: flex;
  flex-direction: column;

  .form-title {
    margin-bottom: 20px;
    font-size: 1.7rem;
    font-weight: 600;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    padding: 20px;
    border: 1px solid #efefef;
    border-radius: 5px;

    legend {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .label {
      margin-right: 20px;
      font-weight: 500;
    }

    input {
      margin: 5px 0px;
      padding: 15px 20px;
      background-color: #f5f5f5;
      font-size: 1rem;
      font-weight: 500;

      &::placeholder {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  .submit-btn {
    margin-top: 30px;
    padding: 12px 0px;
    border: none;
    border-radius: 10px;
    background-color: #8ce99a;
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
