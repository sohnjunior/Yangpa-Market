<template>
  <v-dialog v-model="dialog" persistent width="450px">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col class="ml-5">
            <h2 class="font-weight-medium">Login</h2>
          </v-col>
          <v-col cols="2">
            <v-btn icon color="grey" @click="closeModal">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <LoginForm @submit-form="onSubmit" />
        </v-container>
        <v-row justify="center">
          <span class="link" @click="moveToRegisterPage">Not registerd? Create an account</span>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@utils/bus';
import { mapActions } from 'vuex';
import LoginForm from '@components/Forms/LoginForm';

export default {
  components: { LoginForm },
  props: ['dialog'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },

    moveToRegisterPage() {
      this.closeModal();
      this.$router.push('/signup');
    },

    async onSubmit(userData) {
      const success = await this.login(userData);
      if (success) {
        EventBus.$emit('pop-up', '로그인 되었습니다.');
        this.closeModal();
      } else {
        alert('이메일 혹은 비밀번호를 확인해주세요');
      }
    },
    ...mapActions(['login']),
  },
};
</script>

<style scoped>
.link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
