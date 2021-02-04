<template>
  <BaseSideNavigationMenu>
    <template v-slot:trigger>
      <slot name="trigger" />
    </template>
    <template v-slot:content>
      <div class="button-wrapper">
        <button class="signin-btn" @click="onSignIn">로그인</button>
        <router-link class="signup-btn" to="/signup">회원가입</router-link>
      </div>
    </template>
  </BaseSideNavigationMenu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseSideNavigationMenu from '@components/Menus/BaseSideNavigationMenu.vue';

@Component({
  components: { BaseSideNavigationMenu },
})
export default class AuthSideNavigationMenu extends Vue {
  public onSignIn() {
    this.$emit('sign-in');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;

  .signin-btn,
  .signup-btn {
    width: 80%;
    padding: 12px 20px;
    border: 1px solid $logo-color;
    border-radius: 3px;
    background-color: white;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    color: $logo-color;
  }

  .signup-btn {
    margin-top: 15px;
    background-color: $logo-color;
    color: white;
  }
}
</style>
