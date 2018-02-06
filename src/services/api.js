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
/*修改用户基本信息*/
export async function updateUserInfo(params) {
  return request("/api/user/update", {
    method: 'POST',
    body: params
  });
}
/*修改用户密码*/
export async function updateUserPwd(params) {
  return request("/api/user/pwupdate", {
    method: 'POST',
    body: params
  });
}
/*获取用户列表*/
export async function queryUserList() {
  return request("/api/authority?action=GetUserList", {
    method: 'GET',
  });
}
/*创建用户*/
export async function createUser(params) {
  return request("/api/authority?action=CreateUser", {
    method: 'POST',
    body: params
  });
}
/*删除用户*/
export async function deleteUser(params) {
  return request("/api/authority?action=DeleteUser", {
    method: 'POST',
    body: params
  });
}
/*管理员重置用户密码*/
export async function resetUserPwd(params) {
  return request("/api/authority?action=ResetPassword", {
    method: 'POST',
    body: params
  });
}
/*管理员修改用户信息*/
export async function AdminUpdateUserInfo(params) {
  return request("/api/authority?action=UpdateUserInfo", {
    method: 'POST',
    body: params
  });
}