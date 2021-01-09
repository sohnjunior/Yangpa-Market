<template>
  <header class="appbar-container">
    <router-link class="logo-wrapper" to="/">
      <Icon filename="onion" width="45" height="45" />
      <h1 class="logo-title">양파 마켓</h1>
    </router-link>

    <div class="control-wrapper">
      <SearchInput />
      <router-link class="review-link" to="/review">상품 후기</router-link>

      <DropdownMenu v-if="isLoggedIn" :title="'회원정보'" :items="dropdownItemMap" />
      <div v-else class="button-wrapper">
        <button @click="onOpenModal">로그인</button>
        <router-link class="signup-link" to="/signup">회원가입</router-link>
      </div>
    </div>
    <LoginModal :show="showModal" @close-modal="onCloseModal" />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Icon from '@components/Common/Icon.vue';
import LoginModal from '@components/Modals/LoginModal.vue';
import DropdownMenu from '@components/Menu/DropdownMenu.vue';
import SearchInput from '@components/Inputs/SearchInput.vue';
import ToastBus from '../../bus/ToastBus';
import { deleteCookie } from '../../utils/cookies';

const userModule = namespace('UserModule');

@Component({
  components: { Icon, LoginModal, DropdownMenu, SearchInput },
})
export default class AppBar extends Vue {
  private showModal = false;
  private dropdownItemMap = [
    { text: '대시보드', action: this.onRedirectDashboard },
    { text: '로그아웃', action: this.onLogout },
  ];

  @userModule.Getter
  public isLoggedIn!: boolean;

  public onOpenModal() {
    this.showModal = true;
  }

  public onCloseModal() {
    this.showModal = false;
  }

  public onLogout() {
    deleteCookie('auth_email');
    deleteCookie('auth_token');
    ToastBus.$emit('pop-up', '로그아웃 되었습니다.');
    this.$router.go(0);
  }

  public onRedirectDashboard() {
    this.$router.push('/dashboard/cart');
  }
}
</script>

<style lang="scss" scoped>
$logo-color: #ffab91;

.appbar-container {
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
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
      margin-left: 5px;
    }
  }

  .control-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    flex-basis: 50%;

    .review-link {
      color: #202020;
    }

    .button-wrapper {
      .signup-link {
        margin-left: 20px;
        color: #202020;
      }
    }
  }
}
</style>
