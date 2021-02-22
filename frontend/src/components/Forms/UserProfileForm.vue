<template>
  <form class="form-container">
    <h1 class="form-title">⚙️ 프로필 설정</h1>

    <fieldset>
      <legend>나의 프로필</legend>

      <AvatarInput
        v-if="!isLoading"
        class="avatar"
        :src="avatar ? avatar : undefined"
        @change="onChangeAvatar"
      />

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
        <input type="tel" v-model="contact" placeholder="전화번호" />
      </label>
      <span class="error" v-show="!validation.contact.isValid">
        {{ validation.contact.message }}
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
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { UserAPI } from '../../api';
import { validateEmail, validatePassword, validateContact } from '../../utils/validators';
import AvatarInput from '@components/Inputs/AvatarInput.vue';

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
  contact: IValidation;
}

const UserModule = namespace('UserModule');

@Component({
  components: { AvatarInput },
})
export default class UserProfileForm extends Vue {
  private isLoading = false;
  private email = '';
  private oldPassword = '';
  private newPassword = '';
  private confirmPassword = '';
  private nickname = '';
  private contact = '';
  private avatar = '';

  private validation: IProfileValidation = {
    email: { isValid: false, message: '' },
    oldPassword: { isValid: false, message: '' },
    newPassword: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    contact: { isValid: false, message: '' },
  };

  @UserModule.Mutation
  public setAvatar!: (avatar?: string) => void;

  public async created() {
    try {
      this.isLoading = true;
      const {
        data: { user: userInfo },
      } = await UserAPI.fetchUser();

      this.email = userInfo.email;
      this.nickname = userInfo.nickname;
      this.contact = userInfo.contact;
      this.avatar = userInfo.avatar;
      this.isLoading = false;
    } catch (err) {
      console.error(err);
    }
  }

  public async onEditProfile() {
    try {
      const {
        data: { updatedInfo },
      } = await UserAPI.updateUserProfile({
        email: this.email,
        nickname: this.nickname,
        contact: this.contact,
      });

      this.email = updatedInfo.email;
      this.nickname = updatedInfo.nickname;
      this.contact = updatedInfo.contact;

      // TODO: 변경되었다고 팝업 띄우기
    } catch (err) {
      console.error(err);
    }
  }

  public async onChangeAvatar(file: File) {
    try {
      const formData = new FormData();
      formData.set('avatar', file);
      const {
        data: { updatedAvatar },
      } = await UserAPI.updateUserAvatar(formData);

      this.avatar = updatedAvatar;
      this.setAvatar(updatedAvatar);

      // TODO: 변경되었다고 팝업 띄우기
    } catch (err) {
      console.error(err);
    }
  }

  public async onEditPassword() {
    try {
      await UserAPI.updateUserPassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });

      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';

      // TODO: 변경되었다고 팝업 띄우기
    } catch (err) {
      console.error(err);
    }
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

  @Watch('contact')
  public onWatchContact(value: string) {
    const isValid = validateContact(value);

    this.validation.contact.isValid = isValid;
    this.validation.contact.message = isValid ? '' : '연락처 형식을 확인해주세요(- 포함)';
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

    this.validation.newPassword.isValid = isValid;
    this.validation.newPassword.message = isValid
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

    .avatar {
      display: flex;
      justify-content: center;
      margin: 25px 0px;
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
