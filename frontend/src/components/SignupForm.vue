<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card shaped title="회원 가입" class="px-5 py-3">
            <v-subheader class="display-1 mt-3">
              회원 가입
            </v-subheader>

            <v-form class="pt-1">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                class="mx-4"
                required
              />

              <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field
                label="Repeat Password"
                v-model="confirmpassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                type="password"
                class="mx-4"
                required
              />

              <v-text-field
                label="Nickname"
                v-model="nickname"
                class="mx-4"
                required
              />

              <v-text-field label="Phone" v-model="phone" class="mx-4" />

              <v-radio-group :row="true" class="mx-4">
                성별
                <v-spacer></v-spacer>
                <v-radio :label="'남'"></v-radio>
                <v-radio :label="'여'"></v-radio>
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
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="birthday" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-btn @click="submitForm" class="mx-4">가입하기</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { registerUser } from "../api/index";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmpassword: "",
      nickname: "",
      phone: "",
      sex: "",
      birthday: "",
      admin: "",
      emailRules: [(v) => !!v || "Email is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      confirmPasswordRules: [(v) => !!v || "Confirm password"],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
    };
  },
  methods: {
    async submitForm() {
      console.log("Hello");
      //비밀번호 확인, 이메일, 닉네임 필히 기재 알람 필요

      const userData = {
        email: this.email,
        password: this.password,
        nickname: this.nickname,
        phone: this.phone,
        sex: this.sex,
        birthday: this.birthday,
        admin: this.admin,
      };

      try {
        const { data } = await registerUser(userData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmpassword || "Password must match";
    },
  },
};
</script>

<style></style>
