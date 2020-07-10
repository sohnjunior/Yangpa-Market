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
<style>
@font-face { 
  font-family: 'BMHANNAAir'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff'); 
  font-weight: normal; 
  font-style: normal; 
}

.header {
  font-family: "BMHANNAAir";
}

@font-face { 
  font-family: 'paybooc-Bold'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff') format('woff'); 
  font-weight: normal; font-style: normal; 
}

.sub-title {
  font-family: 'paybooc-Bold'; 
}

@font-face { 
  font-family: 'GmarketSansMedium'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff'); 
  font-weight: normal; font-style: normal; 
}

.category {
  font-family: 'GmarketSansMedium'; 
}

@font-face { 
  font-family: 'Handon3gyeopsal600g'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal600g.woff') format('woff'); 
  font-weight: normal; font-style: normal;
}

.price-tag {
  font-family: 'Handon3gyeopsal600g'; 
}

@font-face { 
  font-family: 'HangeulNuri-Bold'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/HangeulNuri-Bold.woff') format('woff'); 
  font-weight: normal; font-style: normal; 
}

</style>