/*get cookie*/
export const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

/*set cookie*/
export const setCookie = (name, value) => {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/*ws连接*/
export const getWs = () => {
  if (window.WebSocket != undefined) {
    var connection = new WebSocket('ws://192.168.1.61:10101/wsapi/msg');
    return connection
  }
}