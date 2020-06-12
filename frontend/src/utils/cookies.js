/*
    유틸리티 함수들을 정의합니다.
*/

// 쿠키에 JWT 토큰 저장
function saveAuthTokenToCookie(token) {
  document.cookie = `auth_token=${token}`;
}

// 쿠키에 저장된 JWT 토큰 반환
function getAuthTokenFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
}

// 쿠키에서 토큰 삭제
function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export { saveAuthTokenToCookie, getAuthTokenFromCookie, deleteCookie }