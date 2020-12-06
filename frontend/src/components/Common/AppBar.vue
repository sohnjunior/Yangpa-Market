<template>
  <header class="appbar-container">
    <div class="logo-wrapper">
      <img class="logo-image" alt="양파마켓 로고이미지" src="/onion.svg" />
      <router-link class="logo-link" to="/">양파 마켓</router-link>
    </div>

    <div class="control-wrapper">
      <SearchInput />
      <router-link to="/review">상품 후기</router-link>

      <DropdownMenu v-if="isLoggedIn" :items="dropdownItemMap">
        <template v-slot:trigger>
          <button>회원정보</button>
        </template>
      </DropdownMenu>

      <div v-else class="button-wrapper">
        <button @click="openModal">로그인</button>
        <router-link class="signup-link" to="/signup">회원가입</router-link>
      </div>
    </div>
    <LoginModal :show="dialog" @close-modal="closeModal" />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import LoginModal from '@components/Modals/LoginModal.vue';
import DropdownMenu from '@components/Menu/DropdownMenu.vue';
import SearchInput from '@components/Inputs/SearchInput.vue';
import EventBus from '../../utils/bus';
import { deleteCookie } from '../../utils/cookies';

const userModule = namespace('UserModule');

@Component({
  components: { LoginModal, DropdownMenu, SearchInput },
})
export default class AppBar extends Vue {
  private dialog: boolean = false;
  private dropdownItemMap = [
    { text: '대시보드', action: this.routeToDashboard },
    { text: '로그아웃', action: this.logoutClicked },
  ];

  @userModule.Getter
  public isLoggedIn!: boolean;

  public logoutClicked(): void {
    deleteCookie('auth_email');
    deleteCookie('auth_token');
    EventBus.$emit('pop-up', '로그아웃 되었습니다.');
    this.$router.go(0);
  }
  public openModal(): void {
    this.dialog = true;
  }
  public closeModal(): void {
    this.dialog = false;
  }
  public routeToDashboard(): void {
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

    .logo-image {
      width: 50px;
      height: 50px;
    }

    .logo-link {
      margin-left: 10px;
      font-size: 2rem;
      font-weight: 700;
      color: $logo-color;
    }
  }

  .control-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    flex-basis: 50%;

    .button-wrapper {
      .signup-link {
        margin-left: 20px;
      }
    }
  }
}
</style>
