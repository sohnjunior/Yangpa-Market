import { instance } from './common';

/**
 * @purpose 회원 API
 */
function fetchAllUser() {
  return instance.get('/users');
}

function fetchUser() {
  return instance.get('/users/self');
}

function registerUser(payload: FormData) {
  return instance.post('/users', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

function signinUser(payload: { email: string; password: string }) {
  return instance.post('/users/signin', payload);
}

function updateUserProfile(payload: { email: string; nickname: string; contact: string }) {
  return instance.put('/users/self/profile', payload);
}

function updateUserAvatar(payload: FormData) {
  return instance.put('/users/self/profile/avatar', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

function updateUserPassword(payload: { oldPassword: string; newPassword: string }) {
  return instance.put('/users/self/password', payload);
}

function deleteUser() {
  return instance.delete('/users/self');
}

export default {
  fetchAllUser,
  fetchUser,
  registerUser,
  signinUser,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  deleteUser,
};
