<template>
  <v-app>
    <AppBar></AppBar>
    <v-content>
      <SnackBar></SnackBar>
      <router-view></router-view>
    </v-content>
    <Footer class="mt-10"></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import SnackBar from './components/SnackBar';

export default {
  name: 'App',

  components: {
    AppBar, Footer, SnackBar,
  },
};
</script>
