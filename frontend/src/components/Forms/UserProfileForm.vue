<template>
  <form class="form-container">
    <h1 class="form-title">⚙️ 프로필 설정</h1>

    <fieldset>
      <legend>나의 프로필</legend>

      <label>
        <span class="label">이메일</span>
        <input type="email" v-model="email" placeholder="이메일 계정" />
      </label>
      <span class="error" v-show="!validation.email.isValid">
        {{ validation.email.message }}
      </span>

      <label>
        <span class="label">닉네임</span>
        <input type="text" v-model="nickname" placeholder="별명" />
      </label>
      <span class="error" v-show="!validation.nickname.isValid">
        {{ validation.nickname.message }}
      </span>

      <label>
        <span class="label">연락처</span>
        <input type="tel" v-model="phone" placeholder="전화번호" />
      </label>
      <span class="error" v-show="!validation.phone.isValid">
        {{ validation.phone.message }}
      </span>

      <button class="submit-btn" type="submit" @click="onEditProfile">변경하기</button>
    </fieldset>

    <fieldset>
      <legend>비밀번호 변경</legend>

      <input type="password" v-model="oldPassword" placeholder="현재 비밀번호" />
      <span class="error" v-show="!validation.oldPassword.isValid">
        {{ validation.oldPassword.message }}
      </span>

      <input type="password" v-model="newPassword" placeholder="새 비밀번호" />
      <span class="error" v-show="!validation.newPassword.isValid">
        {{ validation.newPassword.message }}
      </span>

      <input type="password" v-model="confirmPassword" placeholder="새 비밀번호 확인" />
      <span class="error" v-show="!validation.confirmPassword.isValid">
        {{ validation.confirmPassword.message }}
      </span>

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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserAPI } from '../../api';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validators';
// import DatePicker from '@components/Inputs/DatePicker.vue';

interface IValidation {
  isValid: boolean;
  message: string;
}

interface IProfileValidation {
  email: IValidation;
  oldPassword: IValidation;
  newPassword: IValidation;
  confirmPassword: IValidation;
  nickname: IValidation;
  phone: IValidation;
}

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

  private validation: IProfileValidation = {
    email: { isValid: false, message: '' },
    oldPassword: { isValid: false, message: '' },
    newPassword: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    phone: { isValid: false, message: '' },
  };

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

  @Watch('email')
  public onWatchEmail(value: string) {
    const isValid = validateEmail(value);

    this.validation.email.isValid = isValid;
    this.validation.email.message = isValid ? '' : '이메일 형식을 확인해주세요';
  }

  @Watch('nickname')
  public onWatchNickname(value: string) {
    const isValid = value !== '';

    this.validation.nickname.isValid = isValid;
    this.validation.nickname.message = isValid ? '' : '별명을 확인해주세요';
  }

  @Watch('phone')
  public onWatchPhone(value: string) {
    const isValid = validatePhone(value);

    this.validation.phone.isValid = isValid;
    this.validation.phone.message = isValid ? '' : '연락처 형식을 확인해주세요(- 포함)';
  }

  @Watch('oldPassword')
  public onWatchOldPassword(value: string) {
    const isValid = validatePassword(value);

    this.validation.oldPassword.isValid = isValid;
    this.validation.oldPassword.message = isValid
      ? ''
      : '비밀번호 형식을 확인해주세요(8~15자 적어도 하나의 특수문자 및 숫자 포함)';
  }

  @Watch('newPassword')
  public onWatchNewPassword(value: string) {
    const isValid = validatePassword(value);

    this.validation.oldPassword.isValid = isValid;
    this.validation.oldPassword.message = isValid
      ? ''
      : '비밀번호 형식을 확인해주세요(8~15자 적어도 하나의 특수문자 및 숫자 포함)';
  }

  @Watch('confirmPassword')
  public onWatchConrifmPassword(value: string) {
    const isValid = this.newPassword === value;

    this.validation.confirmPassword.isValid = isValid;
    this.validation.confirmPassword.message = isValid ? '' : '비밀번호가 일치하지 않아요';
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

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

    .error {
      @include error-message();
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
