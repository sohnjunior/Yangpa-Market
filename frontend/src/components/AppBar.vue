<template>
   <v-app-bar
      app
      color="white"
      class="elevation-3"
      height="100px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/onion.svg"
          transition="scale-transition"
          width="40"
        />

        <span class="title-text deep-orange--text text--lighten-3" text @click="comeBackHome">
          <h2 class="transition-swing app-name ml-2 mt-2">양파 마켓</h2>
        </span>
      </div>

      <v-spacer></v-spacer>

      <div>
        <v-text-field
          placeholder="상품명 검색"
          rounded
          outlined
          single-line
          append-icon="mdi-magnify"
          v-model="keyword"
          color="orange"
          class="mt-7 mr-7"
          style="width: 350px"
          @keyup.enter="search"
        ></v-text-field>
      </div>
      <v-btn class="mr-5 deep-orange--text text--lighten-3" text to="/review">
        <h3>상품 후기</h3>
      </v-btn>

      <v-btn class="mr-3 deep-orange--text text--lighten-3" text @click="loginClicked" v-if="!isLoggedIn">
        <h3>로그인</h3>
      </v-btn>
      <v-btn class="mr-3 deep-orange--text text--lighten-3" text to="/signup" v-if="!isLoggedIn">
        <h3>회원가입</h3>
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
              v-bind="attrs"
              v-on="on"
              class="mr-4 deep-orange--text text--lighten-3"
              text
            >
              <h3>회원정보</h3>
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
import EventBus from '../EventBus';
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
      EventBus.$emit('popUp', '로그아웃 되었습니다.');
      this.$router.go(0);
    },
    // 로그인하기 or 취소 버튼 클릭 시
    modalDestroy() {
      this.dialog = false;
    },
    // 검색
    search() {
      this.$router.push(`/search/${this.keyword}`);
      this.keyword = '';
      this.$router.go(0);
    },
    // 대시보드로 이동
    routeToDashboard() {
      this.$router.push('/dashboard/cart');
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
.search-bar {
  border: solid;
}

@font-face { 
  font-family: 'TmonMonsori'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/TmonMonsori.woff') format('woff'); 
  font-weight: normal; font-style: normal; 
}

.app-name {
  font-family: 'TmonMonsori'; 
}
</style>