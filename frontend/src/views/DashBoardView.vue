<template>
  <div class="dashboard-view">
    <DashBoardAsideMenu />
    <router-view />
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
}
</style>
