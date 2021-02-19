import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {
  saveToLocalStorage,
  readFromLocalStorage,
  removeLocalStorageItem,
} from '../../utils/storages';
import { UserAPI } from '../../api';

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  public email: string = readFromLocalStorage('email') || '';
  public accessToken: string = readFromLocalStorage('accessToken') || '';
  public refreshToken: string = readFromLocalStorage('refreshToken') || '';

  get currentEmail(): string {
    return this.email;
  }

  get currentToken(): string {
    return this.accessToken;
  }

  get isLoggedIn(): boolean {
    return this.accessToken !== '';
  }

  @Mutation
  public setEmail(email?: string) {
    if (email === undefined) {
      this.email = '';
      removeLocalStorageItem('email');
    } else {
      this.email = email;
      saveToLocalStorage('email', email);
    }
  }

  @Mutation
  public setAccessToken(token?: string) {
    if (token === undefined) {
      this.accessToken = '';
      removeLocalStorageItem('accessToken');
    } else {
      this.accessToken = token;
      saveToLocalStorage('accessToken', token);
    }
  }

  @Mutation
  public setRefreshToken(token?: string) {
    if (token === undefined) {
      this.refreshToken = '';
      removeLocalStorageItem('refreshToken');
    } else {
      this.refreshToken = token;
      saveToLocalStorage('refreshToken', token);
    }
  }

  @Action
  public async login(userData: { email: string; password: string }) {
    try {
      const {
        data: { email, accessToken, refreshToken },
      } = await UserAPI.signinUser(userData);

      this.context.commit('setEmail', email);
      this.context.commit('setAccessToken', accessToken);
      this.context.commit('setRefreshToken', refreshToken);
      return true;
    } catch (err) {
      return false;
    }
  }

  @Action
  public logout() {
    return new Promise((resolve) => {
      this.context.commit('setEmail');
      this.context.commit('setAccessToken');
      this.context.commit('setRefreshToken');
      resolve(true);
    });
  }
}
