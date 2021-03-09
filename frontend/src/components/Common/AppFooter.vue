<template>
  <footer class="footer-container">
    <div class="button-wrapper">
      <Icon :filename="icon" width="20" height="20" v-for="icon in icons" :key="icon" />
    </div>

    <div class="footer-description">
      <strong>🧅 양파 마켓</strong>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class AppFooter extends Vue {
  private icons: string[] = ['github', 'youtube'];
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
    justify-content: space-between;
    width: 50px;
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
