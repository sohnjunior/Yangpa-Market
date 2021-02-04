<template>
  <header class="appbar-container">
    <router-link class="logo-wrapper" to="/">
      <Icon filename="onion" width="40" height="40" />
      <h1 class="logo-title">양파 마켓</h1>
    </router-link>

    <div class="control-wrapper">
      <router-link v-if="isMobileBrowser" to="/search">
        <Icon class="search-icon" filename="search" width="25" height="25" />
      </router-link>
      <SearchInput v-else />

      <HistorySideNavigationMenu class="user-menu" v-if="isLoggedIn">
        <template v-slot:trigger>
          <Icon filename="user" width="25" height="25" />
        </template>
      </HistorySideNavigationMenu>
      <div v-else>
        <div v-if="isMobileBrowser">
          <AuthSideNavigationMenu @sign-in="onOpenSignInModal">
            <template v-slot:trigger>
              <Icon filename="hamburger" width="25" height="25" />
            </template>
          </AuthSideNavigationMenu>
        </div>
        <div v-else class="button-wrapper">
          <button class="signin-btn" @click="onOpenSignInModal">로그인</button>
          <router-link class="signup-btn" to="/signup">회원가입</router-link>
        </div>
      </div>
    </div>
    <LoginModal :show="showModal" @close-modal="onCloseSignInModal" />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Icon from '@components/Common/Icon.vue';
import LoginModal from '@components/Modals/LoginModal.vue';
import HistorySideNavigationMenu from '@components/Menus/HistorySideNavigationMenu.vue';
import AuthSideNavigationMenu from '@components/Menus/AuthSideNavigationMenu.vue';
import DropdownMenu from '@components/Menus/DropdownMenu.vue';
import SearchInput from '@components/Inputs/SearchInput.vue';
import ToastBus from '../../bus/ToastBus';

const UserModule = namespace('UserModule');
const SettingModule = namespace('SettingModule');

@Component({
  components: {
    Icon,
    LoginModal,
    HistorySideNavigationMenu,
    AuthSideNavigationMenu,
    DropdownMenu,
    SearchInput,
  },
})
export default class AppBar extends Vue {
  private showModal = false;
  private dropdownItemMap = [
    { text: '대시보드', action: this.onRedirectDashboard },
    { text: '로그아웃', action: this.onLogout },
  ];

  @UserModule.Getter
  public isLoggedIn!: boolean;

  @SettingModule.Getter
  public isMobileBrowser!: boolean;

  @UserModule.Action
  public logout!: () => Promise<boolean>;

  public onOpenSignInModal() {
    this.showModal = true;
  }

  public onCloseSignInModal() {
    this.showModal = false;
  }

  public onLogout() {
    this.logout();
    ToastBus.$emit('pop-up', '로그아웃 되었습니다.');
    this.$router.go(0);
  }

  public onRedirectDashboard() {
    this.$router.push('/dashboard/cart');
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.appbar-container {
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 80px;
  padding: 0px 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 90;

  .logo-wrapper {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    color: $logo-color;
    cursor: pointer;

    .logo-title {
      margin-left: 7px;
    }

    @media screen and (max-width: $mobile-width) {
      .logo-title {
        font-size: 1.4rem;
      }
    }
  }

  .control-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;

    .search-icon {
      margin-right: 10px;
    }

    .user-menu {
      margin-right: 10px;
    }

    .button-wrapper {
      display: flex;
      align-items: center;
      margin-left: 50px;

      .signin-btn,
      .signup-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 35px;
        border: 1px solid #ffab91;
        border-radius: 3px;
        font-size: 0.9rem;
        font-weight: 700;
        color: #ffab91;
      }

      .signup-btn {
        margin-left: 20px;
      }
    }
  }
}
</style>
