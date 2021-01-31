import { instance } from './common';

/**
 * @purpose 토큰 인증 관련 api
 */

interface ITokenRefreshPayload {
  refreshToken: string;
}

function fetchPermission() {
  return instance.get('/auth/permission');
}

function fetchRefreshedAccessToken(payload: ITokenRefreshPayload) {
  return instance.post('/auth/refresh-token', payload);
}

export default { fetchPermission, fetchRefreshedAccessToken };
