import store from '../../store';
import AuthAPI from '../auth';
import AlertBus from '../../bus/AlertBus';

function getBearerAccessToken() {
  return `Bearer ${store.state.UserModule.accessToken}`;
}

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = getBearerAccessToken();
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      const originalRequestConfig = error.config;

      if (status === 419) {
        /** access 토큰 만료 시 */
        try {
          const refreshToken = store.state.UserModule.refreshToken;
          const {
            data: { accessToken },
          } = await AuthAPI.fetchRefreshedAccessToken({ refreshToken });

          store.commit('UserModule/setAccessToken', accessToken);
          originalRequestConfig.headers.Authorization = getBearerAccessToken();
          return instance.request(originalRequestConfig);
        } catch (err) {
          if (err.response.status == 418) {
            /** refresh 토큰 만료 시 */
            const message = '세션이 만료되었습니다.\n 다시 로그인하시겠습니까?';
            AlertBus.$emit(
              'alert-on',
              message,
              () => AlertBus.$emit('login-request'),
              () => store.dispatch('UserModule/logout')
            );
          }
        }
      } else if (status === 401) {
        /** 승인되지 않은 페이지 접근 시 */
        const message = '로그인이 필요한 서비스입니다.\n 로그인 하시겠습니까?';
        AlertBus.$emit(
          'alert-on',
          message,
          () => AlertBus.$emit('login-request'),
          () => store.dispatch('UserModule/logout')
        );
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
