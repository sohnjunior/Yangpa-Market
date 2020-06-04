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
      ></v-text-field>

      <v-btn text @click="loginClicked">
        <span class="mr-2">로그인</span>
      </v-btn>
      <LoginModal :dialog="dialog" @modalDestroy="modalDestroy"></LoginModal>
    </v-app-bar>
</template>

<script>
import LoginModal from './LoginModal.vue';

export default {
  data() {
    return {
       dialog: false,
    }
  },
  components: {
    LoginModal,
  },
  methods: {
    // 로그인 버튼 클릭 시
    loginClicked() {
      this.dialog = true;
    },
    // 로그인하기 or 취소 버튼 클릭 시
    modalDestroy() {
      this.dialog = false;
    }
  }
}
</script>

<style>
</style>