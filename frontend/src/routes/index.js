import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '../views/MainView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import DashBoardView from '../views/DashBoardView.vue';
import ProductCreateView from '../views/ProductCreateView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ReviewBoardView from '../views/ReviewBoardView.vue';
import SignupView from '../views/SignupView.vue';
import SearchView from '../views/SearchView.vue';
import AdminView from '../views/AdminView.vue';

// sub component for Dashboard
import DashBoard from '../components/DashBoard.vue';
import UserWishList from '../components/WishList.vue';
import UserCart from '../components/Cart.vue';
import UserOrder from '../components/Order.vue';
import UserProfile from '../components/Profile.vue';

Vue.use(VueRouter);


export const router = new VueRouter({
         routes: [
           {
             // 홈 화면
             path: "/",
             component: MainView,
           },
           {
             // 관리자 페이지
             path: "/admin",
             component: AdminView,
           },
           {
             // 유저 대시보드
             path: "/dashboard",
             component: DashBoardView,
             children: [
               {
                 // 대시보드 메인
                 path: "",
                 component: DashBoard,
               },
               {
                 // 위시 리스트
                 path: "wishlist",
                 component: UserWishList,
               },
               {
                 // 장바구니
                 path: "cart",
                 component: UserCart,
               },
               {
                 // 판매 및 구매내역
                 path: "order",
                 component: UserOrder,
               },
               {
                 // 프로필 관리
                 path: "profile",
                 component: UserProfile,
               },
             ],
           },
           {
             // 회원가입
             path: "/signup",
             component: SignupView,
           },
           {
             // 상품 게시글 생성 페이지
             path: "/product/new",
             component: ProductCreateView,
           },
           {
             // 상품 상세 글 페이지
             path: "/product/:id",
             component: ProductDetailView,
           },
           {
             // 검색 결과
             path: "/search/:keyword",
             component: SearchView,
           },
           {
             // 후기 게시판
             path: "/review",
             component: ReviewBoardView,
           },
           {
             // 404 페이지
             path: "*",
             component: PageNotFound,
           },
         ],
       });