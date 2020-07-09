
/* 
    로그인시 이메일 및 비밀번호를 검증하기 위한 모듈을 정의합니다.
*/

// 이메일을 검사합니다.
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// 비밀번호를 검증합니다.
// 8~15 의 길이를 가지며 적어도 하나의 특수문자와 숫자를 가져야합니다.
function validatePassword(password) {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  return re.test(password);
}

// 전화번호를 검증합니다.
function validatePhoneNum(phone) {
  const re = /^[0-9]{2,3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
  return re.test(phone);
}

export { validateEmail, validatePassword, validatePhoneNum }