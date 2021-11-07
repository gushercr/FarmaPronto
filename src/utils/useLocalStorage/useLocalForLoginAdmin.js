export function setToken(token, name) {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("nameAdmin", name);
  // console.log(localStorage.getItem("userToken"));
}
export function getToken() {
  const userToken = localStorage.getItem("adminToken");
  return userToken;
}
export function deleteToken() {
  localStorage.removeItem("adminToken");
}
