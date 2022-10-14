export function getAcessToken() {
  var token;
  if (sessionStorage.getItem("access_token")) {
    token = sessionStorage.getItem("access_token");
  } else {
    token = localStorage.getItem("access_token");
  }
  if (!token) {
    token = "";
  }
  return token;
}
