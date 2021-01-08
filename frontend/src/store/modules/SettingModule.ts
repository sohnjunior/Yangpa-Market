import { VuexModule, Module } from 'vuex-module-decorators';

function detectDeviceType(): boolean {
  const regexp = /iphone|ipad|andriod/i;
  return regexp.test(navigator.userAgent);
}

@Module({ namespaced: true })
export default class SettingModule extends VuexModule {
  public isMobile: boolean = detectDeviceType();

  get isMobileBrowser() {
    return this.isMobile;
  }
}
