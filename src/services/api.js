import request from "../utils/request";
// "use strict";
export async function login(params) {
  return request("/api/login", {
    method: 'POST',
    body: params
  });
}