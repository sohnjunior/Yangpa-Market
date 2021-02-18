<template>
  <div class="form-view">
    <SignupForm @submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserAPI } from '../api';
import SignupForm from '@components/Forms/SignupForm.vue';
import { IUserSignupForm } from '../types';

function createFormDataWithObject(payload: IUserSignupForm) {
  const formData = new FormData();

  for (const key in payload) {
    formData.set(key, payload[key]);
  }

  return formData;
}

@Component({
  components: { SignupForm },
})
export default class SignupView extends Vue {
  public async onSubmit(payload: IUserSignupForm) {
    try {
      const formData = createFormDataWithObject(payload);
      console.log(payload, formData);

      await UserAPI.registerUser(formData);
      this.$router.push('/');
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss">
.form-view {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
