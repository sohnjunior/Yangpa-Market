<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="10">
          <v-card shaped title="프로필 관리" class="px-5 py-3">
            <v-subheader class="display-1 mt-3"> 프로필 설정 </v-subheader>

            <v-form class="pt-1">
              <v-text-field label="이메일 계정" v-model="email" class="mx-4" disabled />

              <v-text-field
                label="변경할 비밀번호"
                v-model="password"
                :rules="passwordRules"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field
                label="비밀번호 확인"
                v-model="confirmpassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field label="별명" v-model="nickname" class="mx-4" required />

              <v-text-field label="전화번호" v-model="phone" class="mx-4" />

              <v-radio-group :row="true" class="mx-4" v-model="sex">
                <v-radio :label="'남성'" value="male" />
                <v-radio :label="'여성'" value="female" />
              </v-radio-group>

              <v-col cols="mx-4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="birthday"
                      label="생년월일"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="birthday" no-title scrollable>
                    <v-spacer />
                    <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer />
              <v-btn large color="success" @click="submitForm" class="mx-4"> 변경하기 </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { UserAPI } from '@api';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmpassword: '',
      nickname: '',
      phone: '',
      sex: '',
      birthday: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      confirmPasswordRules: [(v) => !!v || 'Confirm password'],
      date: this.birthday,
      menu: false,
    };
  },

  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.confirmpassword || 'Password must match';
    },
  },

  async created() {
    const { data } = await UserAPI.fetchUser();
    this.email = data.result.email;
    this.password = data.result.password;
    this.confirmpassword = data.result.password;
    this.nickname = data.result.nickname;
    this.phone = data.result.phone;
    this.sex = data.result.sex;
    this.birthday = data.result.birthday.substr(0, 10);
  },

  methods: {
    async submitForm() {
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
        console.log(data);
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
