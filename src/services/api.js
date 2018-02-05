import request from "../utils/request";

/*登录*/
export async function login(params) {
  return request("/api/login", {
    method: 'POST',
    body: params
  });
}
/*登出*/
export async function logout() {
  return request("/api/logout", {
    method: 'POST',
  });
}
/*获取用户基本信息*/
export async function queryUserInfo() {
  return request("/api/user/info", {
    method: 'GET',
  });
}
/*用户基本信息修改*/
export async function updateUserInfo(params) {
  return request("/api/user/update", {
    method: 'POST',
    body: params
  });
}
/*用户密码充值*/
export async function updateUserPwd(params) {
  return request("/api/user/pwupdate", {
    method: 'POST',
    body: params
  });
}