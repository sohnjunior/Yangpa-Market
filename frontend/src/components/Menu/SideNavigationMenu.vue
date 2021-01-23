<template>
  <div>
    <button @click="onOpenMenu">
      <slot name="trigger"></slot>
    </button>
    <div @click="onCloseMenu">
      <div class="navigation-overlay" v-if="showNavigation" @click="onCloseMenu" />
      <transition name="slide" appear>
        <div ref="navigationContainer" class="navigation-container" v-if="showNavigation">
          <section class="profile-section">
            <div class="control-wrapper">
              <Icon filename="close" width="25" height="25" @click="onCloseMenu" />
              <router-link to="/dashboard/alarm">
                <Icon filename="alarm" width="25" height="25" />
              </router-link>
            </div>
            <div class="profile-edit-wrapper">
              <div class="profile-wrapper">
                <Icon filename="user" width="25" height="25" />
                {{ currentEmail }}
              </div>
              <router-link class="profile-edit-btn" to="/dashboard/profile">
                프로필 수정
              </router-link>
            </div>
          </section>
          <section class="list-section">
            <ul>
              <li>
                <router-link to="/dashboard/cart">
                  <Icon class="icon" filename="cart" width="20" height="20" />장바구니
                </router-link>
              </li>
              <li>
                <router-link to="/dashboard/buying">
                  <Icon class="icon" filename="shopping-bag" width="20" height="20" />구매내역
                </router-link>
              </li>
              <li>
                <router-link to="/dashboard/selling">
                  <Icon class="icon" filename="dollar" width="20" height="20" />판매내역
                </router-link>
              </li>
              <li>
                <span @click="onLogout">
                  <Icon class="icon" filename="logout" width="20" height="20" />로그아웃
                </span>
              </li>
            </ul>
          </section>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Icon from '@components/Common/Icon.vue';
import ToastBus from '../../bus/ToastBus';

const UserModule = namespace('UserModule');

@Component({
  components: { Icon },
})
export default class SideNavigationMenu extends Vue {
  private showNavigation = false;

  @Ref() navigationContainer!: HTMLElement;

  @UserModule.Getter
  public currentEmail!: string;

  @UserModule.Action
  public logout!: () => Promise<boolean>;

  public onOpenMenu() {
    this.showNavigation = true;
  }

  public onCloseMenu() {
    this.showNavigation = false;
  }

  public onLogout() {
    this.logout();
    ToastBus.$emit('pop-up', '로그아웃 되었습니다.');
    this.$router.go(0);
  }
}
</script>

<style lang="scss">
.navigation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.navigation-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;

  .profile-section {
    padding: 15px;

    .control-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .profile-edit-wrapper {
      .profile-wrapper {
        display: flex;
        align-items: center;
      }

      .profile-edit-btn {
        display: inline-block;
        width: 100%;
        margin-top: 20px;
        padding: 8px 0px;
        border: 1px solid rgb(238, 238, 238);
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
        color: black;
      }
    }
  }

  .list-section {
    padding: 15px;
    font-size: 1rem;

    ul {
      padding: 0;
    }

    a,
    span {
      display: flex;
      align-items: center;
      padding: 8px 0px;
      color: black;

      .icon {
        margin-right: 10px;
      }
    }
  }
}

.slide-enter,
.slide-leave-to {
  transform: translateX(250px);
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0px);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
