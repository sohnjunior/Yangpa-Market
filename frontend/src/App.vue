<template>
  <v-app>
    <AppBar></AppBar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer class="mt-10"></Footer>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    AppBar, Footer,
  },
};
</script>
