<template>
  <div class="dashboard-view">
    <DashBoardAsideMenu />
    <router-view class="dashboard-content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashBoardAsideMenu from '@components/Menu/DashBoardAsideMenu.vue';

@Component({
  components: { DashBoardAsideMenu },
})
export default class DashBoardView extends Vue {}
</script>

<style lang="scss">
.dashboard-view {
  display: flex;

  .dashboard-content {
    width: 100%;
    padding: 25px 100px;
  }
}
</style>
