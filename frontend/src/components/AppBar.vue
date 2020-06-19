<template>
   <v-app-bar
      app
      color="primary"
      dark
      height="100px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span class="title-text" text @click="comeBackHome">
          <h3 class="transition-swing">양파 마켓</h3>
        </span>
      </div>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div>
      <v-text-field
        placeholder="SEARCH"
        rounded
        filled
        append-icon="mdi-magnify"
        v-model="keyword"
        @keyup.enter="search"
      ></v-text-field>
      </div>
      <v-btn text to="/review">
        <span class="mr-2">상품 후기</span>
      </v-btn>

      <v-btn text @click="loginClicked" v-if="!isLoggedIn">
        <span class="mr-2">로그인</span>
      </v-btn>
      <v-btn text to="/signup" v-if="!isLoggedIn">
        <span class="mr-2">회원가입</span>
      </v-btn>
     
        <v-menu
          text
          bottom
          origin="center center"
          transition="scale-transition"
          v-if="isLoggedIn"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              회원정보
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="routeToDashboard">
              <v-list-item-title>대시보드</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutClicked">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      <LoginModal :dialog="dialog" @modalDestroy="modalDestroy"></LoginModal>
    </v-app-bar>
</template>

<script>
import LoginModal from './LoginModal.vue';
import { deleteCookie } from '../utils/cookies.js';

export default {
  data() {
    return {
      keyword: '',
      dialog: false,
    }
  },
  components: {
    LoginModal,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    // 로그인 모달 팝업
    loginClicked() {
      this.dialog = true;
    },
    // 로그아웃
    logoutClicked() {
      deleteCookie('auth_email');
      deleteCookie('auth_token');
      this.$router.push('/');
    },
    // 로그인하기 or 취소 버튼 클릭 시
    modalDestroy() {
      this.dialog = false;
    },
    // 검색
    search() {
      this.$router.push(`/search/${this.keyword}`);
      this.keyword = '';
    },
    // 대시보드로 이동
    routeToDashboard() {
      this.$router.push('/dashboard');
    },
    // 홈으로 이동
    comeBackHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.title-text:hover {
  cursor: pointer;
}
</style>