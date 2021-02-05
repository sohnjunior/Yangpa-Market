/**
 * Form 검증을 위한 각종 유틸리티 함수
 */

/** 이메일 검증 */
function validateEmail(email: string) {
  const regexp = /\S+@\S+\.\S+/;
  return regexp.test(email);
}

/**
 * 비밀번호 검증
 * 8~15 의 길이를 가지며 적어도 하나의 특수문자와 숫자를 가져야합니다.
 */
function validatePassword(password: string) {
  const regexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  return regexp.test(password);
}

/**
 * 전화번호 검증
 */
function validatePhone(phone: string) {
  const regexp = /^[0-9]{2,3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
  return regexp.test(phone);
}

/**
 * 최소 글자수 검증
 */
function validateTextMinLength(text: string, len: number) {
  const isValid = text?.length >= len;
  return isValid;
}

/**
 * 숫자 검증
 */
function validatePrice(num: string) {
  const regexp = /^[1-9]\d+$/;
  return regexp.test(num);
}

export { validateEmail, validatePassword, validatePhone, validateTextMinLength, validatePrice };
