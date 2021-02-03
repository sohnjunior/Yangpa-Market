<template>
  <BaseSideNavigationMenu>
    <template v-slot:trigger>
      <slot name="trigger" />
    </template>
    <template v-slot:content>
      <div class="content-wrapper">
        <section class="profile-section">
          <div class="control-wrapper">
            <router-link class="alarm" to="/dashboard/alarm">
              <Icon filename="alarm" width="25" height="25" />
            </router-link>
          </div>
          <div class="profile-edit-wrapper">
            <div class="profile-wrapper">
              <Icon class="profile-icon" filename="user" width="25" height="25" />
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
    </template>
  </BaseSideNavigationMenu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Icon from '@components/Common/Icon.vue';
import BaseSideNavigationMenu from '@components/Menus/BaseSideNavigationMenu.vue';
import ToastBus from '../../bus/ToastBus';

const UserModule = namespace('UserModule');

@Component({
  components: { Icon, BaseSideNavigationMenu },
})
export default class HistorySideNavigationMenu extends Vue {
  @UserModule.Getter
  public currentEmail!: string;

  @UserModule.Action
  public logout!: () => Promise<boolean>;

  public onLogout() {
    this.logout();
    ToastBus.$emit('pop-up', '로그아웃 되었습니다.');
    this.$router.go(0);
  }
}
</script>

<style lang="scss">
.content-wrapper {
  .profile-section {
    padding: 15px;

    .control-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .alarm {
        margin-left: auto;
      }
    }

    .profile-edit-wrapper {
      .profile-wrapper {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        font-weight: 500;

        .profile-icon {
          margin-right: 15px;
        }
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
</style>
