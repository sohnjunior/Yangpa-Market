import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * import store for navigation gurad
 */
import store from '../store';

Vue.use(VueRouter);

function loadView(viewName: string) {
  return function () {
    return import(/* webpackChunkName: "view-[request]" */ `@views/${viewName}.vue`);
  };
}

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: loadView('MainView'),
    },
    {
      path: '/dashboard',
      component: loadView('Dashboard/Index'),
      children: [
        {
          path: 'cart',
          component: loadView('Dashboard/UserCartView'),
        },
        {
          path: 'selling',
          component: loadView('Dashboard/UserSaleView'),
        },
        {
          path: 'buying',
          component: loadView('Dashboard/UserPurchaseView'),
        },
        {
          path: 'alarm',
          component: loadView('Dashboard/UserAlarmView'),
        },
        {
          path: 'profile',
          component: loadView('Dashboard/UserProfileView'),
        },
      ],
    },
    {
      path: '/signup',
      component: loadView('SignupView'),
    },
    {
      path: '/product/new',
      component: loadView('Product/ProductRegisterView'),
      beforeEnter: (to, from, next) => {
        /**
         * TODO: 비로그인시 접근 못하도록 변경하기
         */
        if (store.state.email !== '' && store.state.token !== '') {
          return next();
        }
        alert('로그인이 필요한 서비스입니다.');
        next('/signup');
      },
    },
    {
      path: '/product/:id',
      component: loadView('Product/ProductDetailView'),
    },
    {
      path: '/product/edit/:id',
      component: loadView('Product/ProductEditView'),
    },
    {
      path: '/search/:keyword?',
      component: loadView('SearchView'),
    },
    {
      path: '/no-permission',
      component: loadView('Fallback/PageNotAllowedView'),
    },
    {
      path: '*',
      component: loadView('Fallback/PageNotFoundView'),
    },
  ],
});
