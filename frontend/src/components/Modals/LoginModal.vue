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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from '../../types';
import EventBus from '../../utils/bus';
import LoginForm from '@components/Forms/LoginForm.vue';

const userModule = namespace('UserModule');

@Component({
  components: { LoginForm },
})
export default class LoginModal extends Vue {
  @Prop({ required: true, default: false }) readonly dialog!: boolean;

  public closeModal(): void {
    this.$emit('close-modal');
  }

  public moveToRegisterPage(): void {
    this.closeModal();
    this.$router.push('/signup');
  }

  public async onSubmit(userData: User): Promise<void> {
    const success = await this.login(userData);
    if (success) {
      EventBus.$emit('pop-up', '로그인 되었습니다.');
      this.closeModal();
    } else {
      alert('이메일 혹은 비밀번호를 확인해주세요');
    }
  }

  @userModule.Action
  public login!: (userData: User) => Promise<boolean>;
}
</script>

<style scoped>
.link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
