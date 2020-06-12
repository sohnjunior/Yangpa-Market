import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '../api/index';
import { getAuthTokenFromCookie, saveAuthTokenToCookie } from '../utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getAuthTokenFromCookie() || '',
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    isLoggedIn(state) {
      if(state.token === "") {
        return false;
      } else {
        return true;
      }
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('setToken', data.token);
      saveAuthTokenToCookie(data.token);
    }
  }
});