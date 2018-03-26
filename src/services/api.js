import request from "../utils/request";
const basicMonit = "/api/basic/monitor";
const authority = "/api/authority";

/*-----------video-------------*/

export async function queryVerifyCode(params) {
  return request("/get_captcha", {
    method: 'GET',
  });
}

export async function userRegister(params) {
  return request("/register", {
    method: 'POST',
    body: params
  });
}

export async function userLogin(params) {
  return request("/login", {
    method: 'POST',
    body: params
  });
}

export async function userResendMail(params) {
  return request(`/resend_mail?email=${params.email}`, {
    method: 'GET',
  });
}

export async function isAuth() {
  return request("/is_auth", {
    method: 'GET',
  });
}

export async function uploadVideo(params) {
  return request("/upload", {
    method: 'POST',
    body: params,
    headers: {
      cache: false,
      processData: false,
      contentType: false,
    }
  });
}

export async function queryVideoList(params) {
  return request(`/video/get_my_videos?page_num=${params.page_num}&page_size=${params.page_size}`, {
    method: 'GET',
  });
}
export async function publishVideo(params) {
  return request("/video/publish_video", {
    method: 'POST',
    body: params
  });
}
export async function cancelPublishVideo(params) {
  return request("/video/un_publish_video", {
    method: 'POST',
    body: params
  });
}