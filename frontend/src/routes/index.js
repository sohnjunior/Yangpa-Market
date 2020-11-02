import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/MainView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import PageNotAllowed from '../views/PageNotAllowed.vue';
import DashBoardView from '../views/DashBoardView.vue';
import ProductCreateView from '../views/ProductCreateView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ProductUpdateView from '../views/ProductUpdateView.vue';
import ReviewBoardView from '../views/ReviewBoardView.vue';
import SignupView from '../views/SignupView.vue';
import SearchView from '../views/SearchView.vue';
import AdminView from '../views/AdminView.vue';

// sub component for Dashboard
import DashBoard from '../components/DashBoard.vue';
import UserCart from '../components/UserCart.vue';
import UserSelling from '../components/UserSelling.vue';
import UserBuying from '../components/UserBuying.vue';
import UserAlarm from '../components/UserAlarm.vue';
import UserProfile from '../components/UserProfile.vue';

// import store for navigation gurad
import store from '../store/index';
import { UserAPI } from '../api';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      // 홈 화면
      path: '/',
      component: MainView,
    },
    {
      // 관리자 페이지
      path: '/admin',
      component: AdminView,
      beforeEnter: async (to, from, next) => {
        // 만약 관리자 권한을 가지고 있다면
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
      // 유저 대시보드
      path: '/dashboard',
      component: DashBoardView,
      children: [
        {
          // 대시보드 메인
          path: '',
          component: DashBoard,
        },
        {
          // 장바구니
          path: 'cart',
          component: UserCart,
        },
        {
          // 판매 관리
          path: 'selling',
          component: UserSelling,
        },
        {
          // 구매 목록
          path: 'buying',
          component: UserBuying,
        },
        {
          // 상품 구매요청 알림
          path: 'alarm',
          component: UserAlarm,
        },
        {
          // 프로필 관리
          path: 'profile',
          component: UserProfile,
        },
      ],
    },
    {
      // 회원가입
      path: '/signup',
      component: SignupView,
    },
    {
      // 상품 게시글 생성 페이지
      path: '/product/new',
      component: ProductCreateView,
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
      // 상품 상세 글 페이지
      path: '/product/:id',
      component: ProductDetailView,
    },
    {
      // 상품 게시글 수정 페이지
      path: '/product/update/:id',
      component: ProductUpdateView,
    },
    {
      // 검색 결과
      path: '/search/:keyword',
      component: SearchView,
    },
    {
      // 후기 게시판
      path: '/review',
      component: ReviewBoardView,
    },
    {
      // 403 페이지
      path: '/no-permission',
      component: PageNotAllowed,
    },
    {
      // 404 페이지
      path: '*',
      component: PageNotFound,
    },
  ],
});
