import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
  getAuthEmailFromCookie,
  getAuthTokenFromCookie,
  saveAuthTokenToCookie,
  saveAuthEmailToCookie,
} from '../../utils/cookies';
import { UserAPI } from '../../api';
import { User } from '../../types';

@Module({ namespaced: true, name: 'user' })
export default class UserModule extends VuexModule {
  public email: string = getAuthEmailFromCookie() || '';
  public token: string = getAuthTokenFromCookie() || '';

  get getEmail() {
    return this.email;
  }

  get getToken() {
    return this.token;
  }

  get isLoggedIn() {
    return this.token !== '';
  }

  @Mutation
  setEmail(email: string): void {
    this.email = email;
  }

  @Mutation
  setToken(token: string): void {
    this.token = token;
  }

  @Action
  async login({ commit }, userData: User): Promise<boolean> {
    try {
      const { data } = await UserAPI.signinUser(userData);
      commit('SET_EMAIL', data.email);
      commit('SET_TOKEN', data.token);
      saveAuthEmailToCookie(data.email);
      saveAuthTokenToCookie(data.token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
