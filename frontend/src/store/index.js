import Vue from 'vue';
import Vuex from 'vuex';
import { signinUser } from '../api/index';
import {
  getAuthEmailFromCookie,
  getAuthTokenFromCookie,
  saveAuthTokenToCookie,
  saveAuthEmailToCookie,
} from '../utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: getAuthEmailFromCookie() || '',
    token: getAuthTokenFromCookie() || '',
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
    getToken(state) {
      return state.token;
    },
    isLoggedIn(state) {
      if (state.token === '') {
        return false;
      } else {
        return true;
      }
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setToken(state, token) {
      state.token = token;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      try {
        const { data } = await signinUser(userData);
        commit('setEmail', data.email);
        commit('setToken', data.token);
        saveAuthEmailToCookie(data.email);
        saveAuthTokenToCookie(data.token);
        return true;
      } catch (err) {
        // 이메일 혹은 비밀번호 오류
        return false;
      }
    },
  },
});
