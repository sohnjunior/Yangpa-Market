<template>
  <div>
    <button @click="onOpenMenu">
      <slot name="trigger" />
    </button>
    <div @click="onCloseMenu">
      <div class="navigation-overlay" v-if="showNavigation" @click="onCloseMenu" />
      <transition name="slide" appear>
        <div class="navigation-container" v-if="showNavigation">
          <slot name="content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BaseSideNavigationMenu extends Vue {
  private showNavigation = false;

  public onOpenMenu() {
    this.showNavigation = true;
  }

  public onCloseMenu() {
    this.showNavigation = false;
  }
}
</script>

<style lang="scss">
.navigation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.navigation-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(250px);
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0px);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
