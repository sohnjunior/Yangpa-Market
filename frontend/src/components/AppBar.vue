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

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-text-field
        placeholder="SEARCH"
        rounded
        filled
        append-icon="mdi-magnify"
        v-model="keyword"
        @keyup.enter="search"
      ></v-text-field>

      <v-btn text to="/review">
        <span class="mr-2">상품 후기</span>
      </v-btn>

      <v-btn text @click="loginClicked">
        <span class="mr-2">로그인</span>
      </v-btn>
      <v-btn text to="/signup">
        <span class="mr-2">회원가입</span>
      </v-btn>
      <LoginModal :dialog="dialog" @modalDestroy="modalDestroy"></LoginModal>
    </v-app-bar>
</template>

<script>
import { searchProduct } from '../api/index';
import LoginModal from './LoginModal.vue';

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
  methods: {
    // 로그인 이동
    loginClicked() {
      this.dialog = true;
    },
    // 로그인하기 or 취소 버튼 클릭 시
    modalDestroy() {
      this.dialog = false;
    },
    // 검색
    async search() {
      const { data } = await searchProduct(this.keyword);
      console.log(data);
      this.keyword = '';
    }
  }
}
</script>

<style>
</style>