import axios from 'axios';
import { setInterceptors } from './interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3000",
  });
  
  return setInterceptors(instance);
}

const instance = createInstance();

function testJWT() {
  return instance.post("/token");
}

function testJWTVerify() {
  return instance.get("/token/test");
}

export { testJWT, testJWTVerify }