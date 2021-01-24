import Vue from 'vue';
import VueRouter from 'vue-router';

// import store for navigation gurad
import store from '../store';
import { UserAPI } from '../api';

Vue.use(VueRouter);

const loadView = (viewName: string) => () =>
  import(/* webpackChunkName: "view-[request]" */ `@views/${viewName}.vue`);
const UserCartList = () =>
  import(/* webpackChunkName: "UserCartList" */ '@components/Lists/UserCartList.vue');
const UserSellingTable = () =>
  import(/* webpackChunkName: "UserSellingTable" */ '@components/Tables/UserSellingTable.vue');
const UserBuyingTable = () =>
  import(/* webpackChunkName: "UserBuyingTable" */ '@components/Tables/UserBuyingTable.vue');
const UserAlarmTable = () =>
  import(/* webpackChunkName: "UserAlarmTable" */ '@components/Tables/UserAlarmTable.vue');
const UserProfileForm = () =>
  import(/* webpackChunkName: "UserProfileForm" */ '@components/Forms/UserProfileForm.vue');

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: loadView('MainView'),
    },
    {
      path: '/admin',
      component: loadView('AdminView'),
      beforeEnter: async (to, from, next) => {
        const {
          data: { isAdmin },
        } = await UserAPI.isAdminUser();
        if (isAdmin) {
          return next();
        }

        next('/no-permission');
      },
    },
    {
      path: '/dashboard',
      component: loadView('DashBoardView'),
      children: [
        {
          path: 'cart',
          component: UserCartList,
        },
        {
          path: 'selling',
          component: UserSellingTable,
        },
        {
          path: 'buying',
          component: UserBuyingTable,
        },
        {
          path: 'alarm',
          component: UserAlarmTable,
        },
        {
          path: 'profile',
          component: UserProfileForm,
        },
      ],
    },
    {
      path: '/signup',
      component: loadView('SignupView'),
    },
    {
      path: '/product/new',
      component: loadView('ProductRegisterView'),
      beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        if (store.state.email !== '' && store.state.token !== '') {
          return next();
        }
        alert('로그인이 필요한 서비스입니다.');
        next('/signup');
      },
    },
    {
      path: '/product/:id',
      component: loadView('ProductDetailView'),
    },
    {
      path: '/product/update/:id',
      component: loadView('ProductUpdateView'),
    },
    {
      path: '/search/:keyword?',
      component: loadView('SearchView'),
    },
    {
      path: '/review',
      component: loadView('ReviewBoardView'),
    },
    {
      path: '/no-permission',
      component: loadView('PageNotAllowedView'),
    },
    {
      path: '*',
      component: loadView('PageNotFoundView'),
    },
  ],
});
