<template>
  <div class="dashboard-view">
    <DashBoardAsideMenu v-if="!isMobileBrowser" />
    <router-view class="dashboard-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import DashBoardAsideMenu from '@components/Menu/DashBoardAsideMenu.vue';

const SettingModule = namespace('SettingModule');

@Component({
  components: { DashBoardAsideMenu },
})
export default class DashBoardView extends Vue {
  @SettingModule.Getter
  public isMobileBrowser!: boolean;
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.dashboard-view {
  display: flex;

  .dashboard-content {
    width: 100%;
    padding: 25px 100px;
  }

  @media screen and (max-width: $mobile-width) {
    .dashboard-content {
      padding: 0px;
    }
  }
}
</style>
