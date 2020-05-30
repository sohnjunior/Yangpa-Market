<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          양파 마켓
        </h1>
      </v-col>

      <button @click="buttonClicked">token 요청</button>
      <v-btn to="/product/new">상품 등록하기</v-btn>

    </v-row>
  </v-container>
</template>

<script>
import { testJWT, testJWTVerify } from '../api/index.js';

export default {
  methods: {
    async buttonClicked() {
      try {
        const { data } = await testJWT();
        console.log(data.token);

        this.$store.commit('setToken', data.token);

      } catch(err) {
        console.log(err);
      }

      try {
        const result = await testJWTVerify();
        console.log(result);
      } catch(err) {
        console.log(err);
      }

    },
  }
}
</script>

<style>
</style>