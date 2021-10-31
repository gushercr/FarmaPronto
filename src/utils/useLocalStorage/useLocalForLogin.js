export function setToken(token, name) {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userName", name);
  // console.log(localStorage.getItem("userToken"));
}
export function getToken() {
  const userToken = localStorage.getItem("userToken");
  return userToken;
}
export function deleteToken() {
  localStorage.removeItem("userToken");
}
