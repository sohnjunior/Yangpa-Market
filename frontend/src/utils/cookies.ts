/**
 * 쿠키 사용관련 유틸리티 함수들을 정의합니다.
 */

// 쿠키에 email 정보 저장
function saveAuthEmailToCookie(email: string): void {
  document.cookie = `auth_email=${email}`;
}

// 쿠키에 JWT 토큰 저장
function saveAuthTokenToCookie(token: string): void {
  document.cookie = `auth_token=${token}`;
}

// 쿠키에 저장된 Email 정보 반환
function getAuthEmailFromCookie(): string {
  return document.cookie.replace(/(?:(?:^|.*;\s*)auth_email\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

// 쿠키에 저장된 JWT 토큰 반환
function getAuthTokenFromCookie(): string {
  return document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

// 쿠키에서 토큰 삭제
function deleteCookie(value: string): void {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthEmailToCookie,
  saveAuthTokenToCookie,
  getAuthEmailFromCookie,
  getAuthTokenFromCookie,
  deleteCookie,
};
