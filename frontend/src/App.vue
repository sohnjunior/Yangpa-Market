<template>
  <v-app>
    <AppBar />
    <main>
      <ToastModal />
      <transition name="fade">
        <router-view :key="$route.fullPath" />
      </transition>
    </main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from '@components/Common/AppBar';
import AppFooter from '@components/Common/AppFooter';
import ToastModal from '@components/Modals/ToastModal';

export default {
  name: 'App',

  components: {
    AppBar,
    AppFooter,
    ToastModal,
  },
};
</script>

<style lang="scss">
@import './assets/scss/reset';

main {
  min-height: 800px;
  padding-top: 130px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f9f9f9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
</style>
