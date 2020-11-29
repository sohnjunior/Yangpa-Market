<template>
  <footer class="footer-container">
    <div class="button-wrapper">
      <button v-for="icon in icons" :key="icon">
        <v-icon>{{ icon }}</v-icon>
      </button>
    </div>

    <div class="footer-description">
      <strong>🧅 양파 마켓</strong>
      <span>2020학년도 1학기 소프트웨어공학 프로젝트</span>
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
  align-items: center;
  padding: 70px 0px;
  background-color: #ffab91;
  color: #ffffff;

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    button:nth-child(1) {
      margin-right: 15px;
    }
  }

  .footer-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
