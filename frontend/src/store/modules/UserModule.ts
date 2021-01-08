import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
  getAuthEmailFromCookie,
  getAuthTokenFromCookie,
  saveAuthTokenToCookie,
  saveAuthEmailToCookie,
} from '../../utils/cookies';
import { UserAPI } from '../../api';
import { User } from '../../types';

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  public email: string = getAuthEmailFromCookie() || '';
  public token: string = getAuthTokenFromCookie() || '';

  get currentEmail(): string {
    return this.email;
  }

  get currentToken(): string {
    return this.token;
  }

  get isLoggedIn(): boolean {
    return this.token !== '';
  }

  @Mutation
  public setEmail(email: string): void {
    this.email = email;
  }

  @Mutation
  public setToken(token: string): void {
    this.token = token;
  }

  @Action
  public async login(userData: User): Promise<boolean> {
    try {
      const { data } = await UserAPI.signinUser(userData);
      this.context.commit('setEmail', data.email);
      this.context.commit('setToken', data.token);
      saveAuthEmailToCookie(data.email);
      saveAuthTokenToCookie(data.token);
      return true;
    } catch (err) {
      return false;
    }
  }
}
