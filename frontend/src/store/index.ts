import Vue from 'vue';
import Vuex from 'vuex';
import UserModule from './modules/UserModule';
import SettingModule from './modules/SettingModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserModule,
    SettingModule,
  },
});
