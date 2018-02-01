import request from "../utils/request";

export async function login(params) {
  return request("/api/login", {
    method: 'POST',
    body: params
  });
}

export async function logout() {
  return request("/api/logout", {
    method: 'POST',
  });
}

export async function queryUserInfo() {
  return request("/api/user/info", {
    method: 'GET',
  });
}