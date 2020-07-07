<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="10">
          <v-card shaped title="프로필 관리" class="px-5 py-3">
            <v-subheader class="display-1 mt-3">
              프로필 설정
            </v-subheader>

            <v-form class="pt-1">
              <v-text-field
                label="Email"
                v-model="email"
                class="mx-4"
                disabled
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

              <v-radio-group :row="true" class="mx-4" v-model="sex">
                성별
                <v-spacer></v-spacer>
                <v-radio :label="'남'" value="male"></v-radio>
                <v-radio :label="'여'" value="female"></v-radio>
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
              <v-spacer></v-spacer>
              <v-btn large color="success" @click="submitForm" class="mx-4">변경하기</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { getUser, updateUser } from "../api/index";

export default {
  data(){
    return{
      email: '',
      password: '',
      confirmpassword: '',
      nickname: '',
      phone: '',
      sex: '',
      birthday: '',
      passwordRules: [(v) => !!v || "Password is required"],
      confirmPasswordRules: [(v) => !!v || "Confirm password"],
      date: this.birthday,
      menu: false,
    }
  },
  async created() {
    const userData = { email: this.$store.getters.getEmail };
    const { data } = await getUser(userData);
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
        const { data } = await updateUser(userData);
        console.log(data);
        this.$router.go(0);
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
}
</script>

<style>

</style>