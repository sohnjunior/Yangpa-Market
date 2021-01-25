/**
 * 스토리지 관련 유틸리티 함수 정의
 */

function saveToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

function readFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  return value;
}

function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

export { saveToLocalStorage, readFromLocalStorage, removeLocalStorageItem };
