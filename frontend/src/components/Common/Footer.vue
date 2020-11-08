<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="deep-orange lighten-3 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0" style="width: 100%">
        광운대학교 소프트웨어공학 Term 프로젝트 - 🧅 양파 마켓
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>vue.js & express.js</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private icons: string[] = ['mdi-github', 'mdi-youtube'];
}
</script>

<style></style>
