import store from '../../store';
import AuthAPI from '../auth';

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
        /** 토큰 만료 시 */
        try {
          const refreshToken = store.state.UserModule.refreshToken;
          const {
            data: { accessToken },
          } = await AuthAPI.fetchRefreshedAccessToken({ refreshToken });

          store.commit('UserModule/setAccessToken', accessToken);
          originalRequestConfig.headers.Authorization = getBearerAccessToken();
          return instance.request(originalRequestConfig);
        } catch (err) {
          // TODO: 로그인 페이지로 리다이렉션
          console.log('refresh 토큰 만료', err);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
