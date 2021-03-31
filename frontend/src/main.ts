import Vue from 'vue';
import App from './App.vue';
import { router } from './routes';
import store from './store';

Vue.config.productionTip = false;

/**
 * https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 */
Vue.filter('commaSeparated', (price: string | number) => {
  const operand = typeof price === 'number' ? price.toString() : price;

  return operand.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
