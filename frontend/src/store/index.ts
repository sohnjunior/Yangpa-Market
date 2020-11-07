import Vue from 'vue';
import Vuex from 'vuex';
import { UserAPI } from '../api';
import {
  getAuthEmailFromCookie,
  getAuthTokenFromCookie,
  saveAuthTokenToCookie,
  saveAuthEmailToCookie,
} from '../utils/cookies';
import { SET_EMAIL, SET_TOKEN } from './mutation-types';

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
      return state.token !== '';
    },
  },

  mutations: {
    [SET_EMAIL](state, email) {
      state.email = email;
    },
    [SET_TOKEN](state, token) {
      state.token = token;
    },
  },

  actions: {
    async login({ commit }, userData) {
      try {
        const { data } = await UserAPI.signinUser(userData);
        commit(SET_EMAIL, data.email);
        commit(SET_TOKEN, data.token);
        saveAuthEmailToCookie(data.email);
        saveAuthTokenToCookie(data.token);
        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
