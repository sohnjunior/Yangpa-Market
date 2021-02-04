<template>
  <aside class="aside-container">
    <nav>
      <h2 class="subtitle">내 결제</h2>
      <ul class="link-wrapper">
        <li class="link" v-for="item in orders" :key="item.title">
          <router-link :to="`/dashboard/${item.to}`">
            {{ item.title }}
          </router-link>
        </li>
      </ul>

      <h2 class="subtitle">설정</h2>
      <ul class="link-wrapper">
        <li class="link" v-for="item in profiles" :key="item.title">
          <router-link :to="`/dashboard/${item.to}`">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DashBoardAsideMenuItem } from '../../types';

@Component
export default class DashBoardAsideMenu extends Vue {
  private orders: DashBoardAsideMenuItem[] = [
    {
      title: '장바구니',
      to: 'cart',
    },
    {
      title: '판매 관리',
      to: 'selling',
    },
    {
      title: '구매 관리',
      to: 'buying',
    },
    {
      title: '알림',
      to: 'alarm',
    },
  ];
  private profiles: DashBoardAsideMenuItem[] = [
    {
      title: '프로필 설정',
      to: 'profile',
    },
  ];
}
</script>

<style lang="scss" scoped>
.aside-container {
  min-width: 280px;
  padding: 30px 0px 0px 50px;
  border-right: 1px solid #e4e7e8;

  .subtitle {
    margin-bottom: 15px;
    font-size: 0.8rem;
    font-weight: 400;
    color: #808080;
  }

  .link-wrapper {
    margin-bottom: 40px;

    .link {
      margin-bottom: 10px;
      font-size: 1.2rem;
      font-weight: 500;
      color: #202020;

      a {
        color: inherit;
      }
    }
  }
}
</style>
