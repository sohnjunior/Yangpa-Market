<template>
  <v-app>
    <AppBar />
    <main>
      <SnackModal />
      <transition name="fade">
        <router-view />
      </transition>
    </main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '@components/Common/AppBar';
import Footer from '@components/Common/Footer';
import SnackModal from '@components/Modals/SnackModal';

export default {
  name: 'App',

  components: {
    AppBar,
    Footer,
    SnackModal,
  },
};
</script>

<style lang="scss">
@import './assets/scss/reset';

main {
  min-height: 1500px;
  padding-top: 130px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f9f9f9;
}

/* @font-face {
  font-family: 'BMHANNAAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.header {
  font-family: 'BMHANNAAir';
}

@font-face {
  font-family: 'paybooc-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.sub-title {
  font-family: 'paybooc-Bold';
}

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.category {
  font-family: 'GmarketSansMedium';
}

@font-face {
  font-family: 'Handon3gyeopsal600g';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal600g.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

.price-tag {
  font-family: 'Handon3gyeopsal600g';
}

@font-face {
  font-family: 'HangeulNuri-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/HangeulNuri-Bold.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
