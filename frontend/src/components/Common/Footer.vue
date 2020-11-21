<template>
  <footer class="footer-container">
    <div class="button-wrapper">
      <button v-for="icon in icons" :key="icon">
        <v-icon size="24px">{{ icon }}</v-icon>
      </button>
    </div>

    <div class="footer-description">광운대학교 소프트웨어공학 Term 프로젝트 - 🧅 양파 마켓</div>

    <div class="footer-description">
      <strong>vue.js & express.js</strong>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private icons: string[] = ['mdi-github', 'mdi-youtube'];
}
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  background-color: #ffab91;
  color: #ffffff;

  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  .footer-description {
    display: flex;
    justify-content: center;
  }
}
</style>
